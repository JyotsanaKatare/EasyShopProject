
import express from 'express';
import authMiddleware from '../Middlewares/authMiddleware.js';
import {getWithdrawList, getWithdrawStats, createWithdrawRequest} from '../Controllers/withdrawController.js';

const router = express.Router();

router.get('/withdraw-stats', authMiddleware(['vendor']), getWithdrawStats);
router.get('/withdraw-list', authMiddleware(['vendor']), getWithdrawList);
router.post('/create-withdraw-request', authMiddleware(['vendor']), createWithdrawRequest);

export default router;