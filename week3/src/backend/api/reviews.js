const express = require("express");
const router = express.Router();
const knex = require("../database");
const reviewController = require("../controllers/reviewController");

// routes
router.get("/", reviewController.getReview);
router.get("/:id", reviewController.getReviewById);
router.post("/", reviewController.createReview);
router.get("/:meal_id/reviews", reviewController.getReviewsForMeal);
router.put("/:id", reviewController.updateReview);
router.delete("/:id", reviewController.deleteReview);

module.exports = router;
