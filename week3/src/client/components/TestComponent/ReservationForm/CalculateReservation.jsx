import React, { useEffect, useState, useContext } from "react";
import { MealsContext } from "../../../contexts/MealsContext";

function CalculateReservation() {
  const meals = useContext(MealsContext);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    // Fetch reservations data from your API
    fetch("http://localhost:5000/api/reservations")
      .then((response) => response.json())
      .then((data) => setReservations(data))
      .catch((error) => console.error("Error fetching reservations:", error));
  }, []);

 const calculateRemainingSpots = (meal) => {
    const now = new Date();

    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    
    const formattedDate = `${year}-${month}-${day}`;
  //  console.log(formattedDate); // Output: 2023-08-31

    const futureReservations = reservations.filter((reservation) => {
      return (
        reservation.meal_id === meal.id &&
        new Date(reservation.created_date) >= formattedDate
      );
      
    });
  
    const remainingSpots = meal.max_reservations - futureReservations.length;
      return remainingSpots;

  };

  return {calculateRemainingSpots};
}

export default CalculateReservation;