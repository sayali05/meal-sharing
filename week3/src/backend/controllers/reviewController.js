const knex = require("../database");
const {
  validateMeal,
  validateReservation,
  validateReview,
} = require("../validation");

// week3 hw /api/reviews	GET	Returns all reviews.
const getReview = async (req, res) => {
  try {
    const reviews = await knex("review").select();
    res.json(reviews);
  } catch (error) {
    throw error;
  }
};
// /api/meals/:meal_id/reviews	GET	Returns all reviews for a specific meal
const getReviewById = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const review = await knex("review").where("id", reviewId).first();

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.json(review);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
// /api/reviews	POST Adds a new review to the database.
const createReview = async (req, res) => {
  const { error, value } = validateReview(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    // Extract review data from the request body
    const { title, description, meal_id, stars } = req.body;
    // Insert the new review into the database
    const [reviewId] = await knex("review").insert({
      title,
      description,
      meal_id,
      stars,
      created_date: new Date().toISOString().split("T")[0], // Set the current date as the created_date
    });

    // Fetch the newly created review from the database
    const review = await knex("review").where("id", reviewId).first();
    // Send the response with the newly created review
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
//  /api/meals/:meal_id/reviews POST api/reviews/1/reviews
const getReviewsForMeal = async (req, res) => {
  try {
    const mealId = req.params.meal_id;
    const reviews = await knex("review").where("meal_id", mealId).select();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// /api/reviews/:id	PUT	Updates the review by id.
const updateReview = async (req, res) => {
  const reviewId = req.params.id;
  const { title, description, stars, created_date } = req.body;

  const { error, value } = validateReview(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const updatedRows = await knex("review").where("id", reviewId).update({
      title,
      description,
      stars,
      created_date,
    });

    if (updatedRows === 0) {
      return res.status(404).json({ error: "Review not found" });
    }

    // Fetch the updated review from the database
    const updatedReview = await knex("review").where("id", reviewId).first();

    res.json(updatedReview);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
// /api/reviews/:id	DELETE	Deletes the review by id.
const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;

    // Delete the review from the database
    const deletedRows = await knex("review").where("id", reviewId).del();

    if (deletedRows === 0) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getReview,
  createReview,
  getReviewById,
  getReviewsForMeal,
  updateReview,
  deleteReview,
};
