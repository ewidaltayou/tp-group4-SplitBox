import express from "express";

import {
  createExpense,
  getExpenses
} from "../controllers/expenseController.js";

const router = express.Router();

router.post("/:id/expenses", createExpense);

router.get("/:id/expenses", getExpenses);

export default router;