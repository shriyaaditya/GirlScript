import express from "express";
import { createGenBook, getBookReviews, addReview } from "../Controllers/genbook.controller.js";
import authenticateToken from "../Middlewares/auth.js";

const router = express.Router();

router.post("/api/v1/genbook/create", authenticateToken, createGenBook);
router.get("/api/v1/genbook/:id/reviews", authenticateToken, getBookReviews);
router.post("/api/v1/genbook/:id/review/add", authenticateToken, addReview);

export default router;
