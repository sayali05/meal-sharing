const express = require("express");
const router = express.Router();
const knex = require("../database");
const { response } = require("../app");

// /api/meals	GET	Returns all meals
router.get("/", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const titles = await knex("meal").select("title");
    response.status(201).json(titles);
  } catch (error) {
    response.status(500).json({ error: "error in select query" });
  }
});

// /api/meals	POST	Adds a new meal to the database
router.post("/", async (request, response) => {
  try {
    const { title, description, location, when, max_reservations, price } =
      request.body;

    await knex("meal").insert({
      title,
      description,
      location,
      when,
      max_reservations,
      price,
      created_date: new Date(),
    });
    response.status(201).json({ success: "inserted successfully" });
  } catch (error) {
    response.status(500).json({ error: "error occurred" });
  }
});

///api/meals/:id	GET	Returns the meal by id
router.get("/:id", async (request, response) => {
  try {
    const mealId = request.params.id;
    const meal = await knex("meal").where("id", mealId).first();
    if (meal) {
      response.json(meal);
    } else {
      response.status(404).json({ error: "meal not found" });
    }
  } catch (error) {
    response.status(500).json({ error: "failed to fetch meal" });
  }
});

///api/meals/:id	PUT	Updates the meal by id
router.put("/:id", async (request, response) => {
  try {
    const mealId = request.params.id;
    const updatedMeal = request.body;
    const meal = await knex("meal").where({ id: mealId }).update(updatedMeal);
    if (!meal) {
      return response.status(404).json({ error: "Meal not found" });
    }
    response.status(200).json({ message: "Meal updated successfully" });
  } catch (error) {
    response.status(500).json({ error: "Failed to update meal" });
  }
});

///api/meals/:id	DELETE	Deletes the meal by id
router.delete("/:id", async (request, response) => {
  try {
    const mealId = request.params.id;
    const deleteMeal = await knex("meal").where({ id: mealId }).del();
    if (!deleteMeal) {
      return response.status(404).json({ error: "Meal not found" });
    }
    response.status(200).json({ message: "Meal deleted successfully" });
  } catch (error) {
    response.status(500).json({ error: "Failed to delete meal" });
  }
});

module.exports = router;
