
import express from 'express';
import authMiddleware from '../Middlewares/authMiddleware.js';
import {
    getTransactionsStats, 
    transactionList, 
    downloadTransactionInvoice
} from '../Controllers/transactionController.js';

const router = express.Router();

router.get('/transaction-stats', authMiddleware(['vendor']), getTransactionsStats);
router.get('/transaction-list', authMiddleware(['vendor']), transactionList);
router.get('/download-transaction-invoice/:transaction_id', authMiddleware(['vendor']), downloadTransactionInvoice);

export default router;