import express from 'express';
const router = express.Router();

import { registerUser, LoginUser, logout, GetUser, updateLimit } from '../controllers/user/index';

import auth from '../middleware/auth';

router.get('/', auth, GetUser);
router.post('/', registerUser);

router.post('/login', LoginUser);
router.post('/logout', logout);

router.post('/limit', auth, updateLimit);
// router.post('/numbers', auth, updateNumbers);

export default router;
