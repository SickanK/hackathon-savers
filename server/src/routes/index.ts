import express from 'express';
import UserController from './user.js';

const MainRouter = express.Router();

MainRouter.use('/user', UserController);

export default MainRouter;
