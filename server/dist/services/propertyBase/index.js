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
exports.propertyTreeToBase = exports.GetPropertyTree = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const prisma_1 = __importDefault(require("../../database/prisma"));
const GetPropertyTree = (companyId) => __awaiter(void 0, void 0, void 0, function* () {
    const properties = yield prisma_1.default.property.findMany({
        where: { companyId },
        select: {
            type: true,
            name: true,
            id: true,
            buildings: { select: { name: true, id: true, spaces: { select: { name: true, id: true } } } },
        },
    });
    const ManagementUnits = yield prisma_1.default.managementUnit.findMany({
        where: { companyId },
        select: {
            type: true,
            name: true,
            id: true,
            buildings: { select: { name: true, id: true, spaces: { select: { name: true, id: true } } } },
        },
    });
    return { properties, ManagementUnits };
});
exports.GetPropertyTree = GetPropertyTree;
const propertyTreeToBase = (propertyTree) => {
    const base = propertyTree.map((propertyTreeItem) => {
        const treeItem = {};
        treeItem.title = propertyTreeItem.name;
        treeItem.id = propertyTreeItem.id;
        treeItem.level = 0;
        treeItem.type = propertyTreeItem.type;
        treeItem.children = propertyTreeItem.buildings.map((building) => {
            return {
                title: building.name,
                id: building.id,
                level: 1,
                type: 'building',
                children: building.spaces.map((space) => {
                    return {
                        title: space.name,
                        id: space.id,
                        level: 2,
                        type: 'space',
                    };
                }),
            };
        });
        return treeItem;
    });
    return base;
};
exports.propertyTreeToBase = propertyTreeToBase;
//# sourceMappingURL=index.js.map