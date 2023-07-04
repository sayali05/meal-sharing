const express = require("express");
const router = express.Router();
const knex = require("../database");
const reservationController = require("../controllers/reservationController");
//routes
router.get("/", reservationController.getReservation);
router.post("/", reservationController.createReservation);
router.get("/:id", reservationController.getReservationById);
router.put("/:id", reservationController.updateReservation);
router.delete("/:id", reservationController.deleteReservation);

module.exports = router;
