"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeterTree = void 0;
/* eslint-disable no-case-declarations */
const prisma_1 = __importDefault(require("../../database/prisma"));
const types_1 = require("./types");
const getMeterTree = (objectType, objectId) => __awaiter(void 0, void 0, void 0, function* () {
    const tree = {
        1: [],
        2: [],
        3: [],
    };
    switch (objectType) {
        case types_1.ObjectType.Property:
            const property = yield prisma_1.default.property.findUnique({
                where: { id: objectId },
                include: { buildings: { select: { meters: true, spaces: { select: { meters: true } } } }, meters: true },
            });
            console.log(property);
            if (property && property.meters.length > -1) {
                tree[1].push(...property.meters);
            }
            if (property === null || property === void 0 ? void 0 : property.buildings) {
                property.buildings.forEach((building) => {
                    tree[2].push(...building.meters);
                    building.spaces.forEach((space) => {
                        tree[3].push(...space.meters);
                    });
                });
            }
            return tree;
        case types_1.ObjectType.Building:
            const building = yield prisma_1.default.building.findUnique({
                where: { id: objectId },
                include: { meters: true, spaces: { select: { meters: true } } },
            });
            if (building && building.meters.length > -1) {
                tree[1].push(...building.meters);
            }
            if (building) {
                building.spaces.forEach((space) => {
                    tree[2].push(...space.meters);
                });
            }
            return tree;
        case types_1.ObjectType.Space:
            const space = yield prisma_1.default.space.findUnique({ where: { id: objectId }, select: { meters: true } });
            if (space && space.meters.length > -1) {
                tree[1].push(...space.meters);
            }
            return tree;
    }
});
exports.getMeterTree = getMeterTree;
//# sourceMappingURL=getMeterTree.js.map