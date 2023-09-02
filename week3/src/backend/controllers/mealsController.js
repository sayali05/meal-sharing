const knex = require("../database");
const {
  validateMeal,
  validateReservation,
  validateReview,
} = require("../validation");

//GET api/meals
const getMeal = async (request, response) => {
  try {
    console.log("IN");
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const titles = await knex("meal").select("title");
    console.log(titles);
    response.json(titles);
  } catch (error) {
    throw error;
  }
};
// HW part  qstn : /api/meals
const createMeal = async (request, response) => {
  const { error, value } = validateMeal(request.body);
  if (error) {
    return response.status(400).json({ error: error.details[0].message });
  }
  try {
    const { title, description, location, when, max_reservations, price } =
      request.body;
    //insert to database
    await knex("meal").insert({
      title,
      description,
      location,
      when,
      max_reservations,
      price,
      created_date: new Date(),
    });
    response.status(201).json({ success: true });
  } catch (error) {
    response.status(500).json({ error: "An error occurred" });
  }
};
// get meal by id
const getMealById = async (request, response) => {
  try {
    const mealId = request.params.id;
    const meal = await knex("meal").where("id", mealId).first();
    if (!meal) {
      return response.status(404).json({ error: "meal not found" });
    }
    response.json(meal);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
// /api/meals/:id PUT	Updates the meal by id
const updateMeal = async (req, res) => {
  const mealId = req.params.id;
  const { title, description, location, when, max_reservations, price } =
    req.body;
  const { error, value } = validateMeal(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    // Update the meal in the database using Knex
    await knex("meal").where("id", mealId).update({
      title,
      description,
      location,
      when,
      max_reservations,
      price,
    });

    res.sendStatus(204); // Successful update, no content
  } catch (error) {
    res.sendStatus(500); // Internal server error
  }
};
// /api/meals/:id	DELETE	Deletes the meal by id
const deleteMeal = async (req, res) => {
  const mealId = req.params.id;
  try {
    // checking whether mealis exits
    const mealExists = await knex("meal").where("id", mealId).first();
    if (!mealExists) {
      return res.status(404).send("Meal not found.Please provide a valid id");
    }
    // delete the meal in the database using Knex
    await knex("meal").where("id", mealId).del();
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500); // Internal server error
  }
};
// HW-Week3  GET api/meals route to add query parameters

const getMealsByQuery = async (req, res) => {
  try {
    // extract query parameters from the request
    const {
      maxPrice,
      availableReservations,
      title,
      dateAfter,
      dateBefore,
      limit,
      sortKey,
      sortDir,
    } = req.query;
    //initial query using knex
    let query = knex("meal");
    if (maxPrice) {
      query = query.where("price", "<=", parseFloat(maxPrice));
    }
    if (availableReservations === "true") {
      const subquery = knex("reservation")
        .select("meal_id")
        .count("id AS reservation_count")
        .groupBy("meal_id");

      query = query
        .leftJoin(
          subquery.as("reservations"),
          "meal.id",
          "reservations.meal_id",
        )
        .where(
          "meal.max_reservations",
          ">",
          knex.raw("reservations.reservation_count"),
        )
        .groupBy("meal.id");

      // query = query.where(
      //   "max_reservations",
      //   ">",
      //   knex.raw("COUNT(reservation.id)"),
      // );
      // query = query.leftJoin("reservation", "meal.id", "reservation.meal_id");
      // query = query.groupBy("meal.id");
    }
    if (title) {
      query = query.where("title", "like", "%${title}");
    }
    if (dateAfter) {
      query = query.where("when", ">", dateAfter);
    }
    if (dateBefore) {
      query = query.where("when", "<", dateBefore);
    }
    if (limit) {
      query = query.limit(parseInt(limit));
    }
    if (sortKey) {
      const allowedSortKeys = ["when", "max_reservations", "price"];
      if (allowedSortKeys.includes(sortKey)) {
        const direction = sortDir === "desc" ? "desc" : "asc";
        query = query.orderBy(sortKey, direction);
      }
    }

    // Execute the query
    const meals = await query.select();
    // Send the response
    res.json(meals);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createMeal,
  getMeal,
  getMealById,
  updateMeal,
  deleteMeal,
  getMealsByQuery,
};
