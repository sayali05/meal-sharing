import React, { useContext, useState } from "react";
import { Links, useParams } from "react-router-dom";
import { MealsContext } from "../../contexts/MealsContext";
import Meal from "../../components/TestComponent/Meal/Meal";
import ReservationForm from "../../components/TestComponent/ReservationForm/ReservationForm";

import "./Reservation.css";

function Reservation() {
  const { mealId } = useParams();

  const [isAvaillable, setAvaillable] = useState(true);

  const meals = useContext(MealsContext);

  const meal = meals.find((meal) => meal.id.toString() === mealId);
  if (!meal) {
    return <p>Meal not found</p>;
  }

  if (meal.max_reservations === 0) {
    setAvaillable(false);
  }

  return (
    <div className="reservation-container">
      <h1>Reservation for {meal.title}</h1>
      <div className="reserve-card">
        <Meal meal={meal} />
      </div>
      <div>
        {isAvaillable ? (
          <ReservationForm id={meal.id} />
        ) : (
          <p>no reservation available</p>
        )}
      </div>
    </div>
  );
}

export default Reservation;