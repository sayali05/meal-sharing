import React, { useState } from "react";
import Modal from "../Modal/Modal";
import "./ReservationForm.css";
function ReservationForm({ id }) {
  const [isOpen, setIsOpen] = useState(false);
  const [reservation, setReservation] = useState({
    number_of_guests: 1,
    meal_id: id,
    created_date: "",
    contact_phonenumber: "",
    contact_name: "",
    contact_email: "",
  });
  const createReservation = async (res) => {
    try {
      const response = await fetch("http://localhost:3000/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(res),
      });
      console.log(res);
      if (response.ok) {
        setIsOpen(true);
        setReservation({
          number_of_guests: 1,
          meal_id: id,
          created_date: "",
          contact_phonenumber: "",
          contact_name: "",
          contact_email: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  function handleSubmit(e) {
    e.preventDefault();
    const {
      number_of_guests,
      contact_phonenumber,
      contact_name,
      contact_email,
    } = reservation;
    if (
      number_of_guests <= 0 ||
      !contact_phonenumber.trim() ||
      !contact_name.trim() ||
      !contact_email
    ) {
      console.log("fill up form");
    } else {
      createReservation(reservation);
    }
  }
  function handleChange(e) {
    const { name, value } = e.target;
    setReservation((prev) => ({
      ...prev,
      [name]: value,
      created_date: new Date().toLocaleDateString("en-CA"),
    }));
  }
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <form className="form-group" onSubmit={handleSubmit}>
      
      <h5>Please fill up all fields to complete reservation!</h5>
      <div className="input-group">
        <label>No.of guests</label>
        <input
          className="input-style"
          type="number"
          name="number_of_guests"
          value={reservation.number_of_guests}
          onChange={handleChange}
        />
      </div>
      <div className="input-group">
        <label>Name</label>
        <input
          className="input-style"
          type="text"
          name="contact_name"
          value={reservation.contact_name}
          onChange={handleChange}
          placeholder="Name"
        />
      </div>
      <div className="input-group">
        <label>Email</label>
        <input
          className="input-style"
          type="email"
          name="contact_email"
          value={reservation.contact_email}
          onChange={handleChange}
          placeholder="email"
        />
      </div>
      <div className="input-group">
        <label>Phone</label>
        <input
          className="input-style"
          type="tel"
          name="contact_phonenumber"
          value={reservation.contact_phonenumber}
          onChange={handleChange}
          placeholder="phone number"
        />
      </div>
      <div>
        
        <button className="btn" type="submit">
          Submit
        </button>
      </div>
     
      <Modal isOpen={isOpen} closeModal={closeModal} />
    </form>
  );
}
export default ReservationForm;