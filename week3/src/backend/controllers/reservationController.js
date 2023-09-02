const knex = require("../database");
const { validateMeal, validateReservation } = require("../validation");

// /api/reservations	GET	Returns all reservations
const getReservation = async (req, res) => {
  try {
    const reservation = await knex("reservation");
    if (!reservation) {
      return res.status(404).json({ error: "no reserbvatoions yet" });
    }
    res.json(reservation);
  } catch (error) {
    res.sendStatus(500);
  }
};
const createReservation = async (req, res) => {
  const { error, value } = validateReservation(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const {
    number_of_guests,
    meal_id,
    created_date,
    contact_phonenumber,
    contact_name,
    contact_email,
  } = req.body;
  try {
    const newReservation = await knex("reservation").insert({
      number_of_guests,
      meal_id,
      created_date: new Date(),
      contact_phonenumber,
      contact_name,
      contact_email,
    });
    res.status(201).json(newReservation);
  } catch (error) {
    res.sendStatus(500); // Internal server error
  }
};
const getReservationById = async (req, res) => {
  const reservationId = req.params.id;
  try {
    const reservation = await knex("reservation").where("id", reservationId);
    if (!reservation) {
      return response.status(404).json({ error: "Reservation not found" });
    }
    res.json(reservation);
  } catch (error) {
    res.sendStatus(500);
  }
};

const updateReservation = async (req, res) => {
  const reservationId = req.params.id;
  const {
    number_of_guests,
    meal_id,
    contact_phonenumber,
    contact_name,
    contact_email,
  } = req.body;
  const { error, value } = validateReservation(req.body);
  // Check for validation errors
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const reservationExists = await knex("reservation")
      .where("id", reservationId)
      .first();
    if (!reservationExists) {
      return res
        .status(404)
        .send("Reservation not found.Please provide a valid id");
    }
    await knex("reservation").where("id", reservationId).update({
      number_of_guests,
      meal_id,
      contact_phonenumber,
      contact_name,
      contact_email,
    });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
};
const deleteReservation = async (req, res) => {
  const reservationId = req.params.id;
  try {
    // checking whether mealis exits
    const reservationExists = await knex("meal")
      .where("id", reservationId)
      .first();
    if (!reservationExists) {
      return res
        .status(404)
        .send("Reservation not found.Please provide a valid id");
    }
    // delete the meal in the database using Knex
    await knex("reservation").where("id", reservationId).del();
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500); // Internal server error
  }
};
module.exports = {
  createReservation,
  getReservation,
  getReservationById,
  updateReservation,
  deleteReservation,
};
