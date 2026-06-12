import express from "express";
import cors from "cors";

import groupRoutes from "./routes/groupRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import balanceRoutes from "./routes/balanceRoutes.js";


const app = express();
app.use("/api/groups", balanceRoutes);
app.use(cors());

app.use(express.json());

app.use("/api/groups", groupRoutes);
app.use("/api/groups", expenseRoutes);

export default app;