const express = require("express");
const router = express.Router();
const knex = require("../database");

///api/reservations	GET	Returns all reservations
router.get("/", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const titles = await knex("reservation").select("*");
    response.status(201).json(titles);
  } catch (error) {
    response.status(500).json({ error: "error in select query" });
  }
});

// /api/reservations	POST	Adds a new reservation to the database
router.post("/", async (request, response) => {
  try {
    const { number_of_guests, meal_id, created_date, phone, name, email } =
      request.body;

    const addReservation = await knex("reservation").insert({
      number_of_guests,
      meal_id,
      created_date: new Date(),
      phone,
      name,
      email,
    });
    response.status(201).json({ success: "Inserted successfully" });
  } catch (error) {
    response.status(500).json({ error: "error occurred" });
  }
});

///api/reservations/:id	GET	Returns a reservation by id
router.get("/:id", async (request, response) => {
  try {
    const reservationId = request.params.id;
    const reservation = await knex("reservation")
      .where("id", reservationId)
      .first();
    if (reservation) {
      response.json(reservation);
    } else {
      response.status(404).json({ error: "reservation not found" });
    }
  } catch (error) {
    response.status(500).json({ error: "failed to fetch reservation" });
  }
});

// /api/reservations/:id	PUT	Updates the reservation by id
router.put("/:id", async (request, response) => {
  console.log("hello");
  try {
    const reservationId = request.params.id;

    const updatedReservation = request.body;
    const reservation = await knex("reservation")
      .where({ id: reservationId })
      .update(updatedReservation);
    console.log(reservation);
    if (!reservation) {
      return response.status(404).json({ error: "Reservation not found" });
    }
    response.status(200).json({ message: "Reservation updated successfully" });
  } catch (error) {
    response.status(500).json({ error: "Failed to update Reservation" });
  }
});

// /api/reservations/:id	DELETE	Deletes the reservation by id
router.delete("/:id", async (request, response) => {
  try {
    const reservationId = request.params.id;
    const deleteReservation = await knex("reservation")
      .where({ id: reservationId })
      .del();
    if (!deleteReservation) {
      return response.status(404).json({ error: "reservation not found" });
    }
    response.status(200).json({ message: "reservation deleted successfully" });
  } catch (error) {
    response.status(500).json({ error: "Failed to delete reservation" });
  }
});

module.exports = router;
