const express = require("express");
const router = express.Router();
const knex = require("../database");
const mealsController = require("../controllers/mealsController");

// routes
router.get("/", mealsController.getMealsByQuery);
router.post("/meals", mealsController.createMeal);
router.get("/:id", mealsController.getMealById);
router.put("/:id", mealsController.updateMeal);
router.delete("/:id", mealsController.deleteMeal);
//router.get("/")

module.exports = router;
