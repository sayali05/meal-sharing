import React, { useState, useEffect, useContext } from "react";
import Meal from "./Meal/Meal";
import { MealsContext } from "../../contexts/MealsContext";
import CalculateReservation from "./ReservationForm/CalculateReservation";
import "./MealList.css";

export default function MealList({ newMeals, limit, query }) {
  const meals = useContext(MealsContext);
  const { calculateRemainingSpots } = CalculateReservation();

  const availableMeals = newMeals || meals;
  const limitedMeals = availableMeals.slice(0, limit);

  const filteredMeals = limitedMeals.filter((meal) => {
    if (!query?.title || !meal.title) {
      return true; // Show all meals when no title query or meal title is provided
    }

    return meal.title.toLowerCase().includes(query.title.toLowerCase());
  });

  return (
    <section className="meal-list">
      <div className="meal-card">
        {filteredMeals.map((meal) => {
          const remainingSpots = calculateRemainingSpots(meal);
          return (
            <Meal key={meal.id} meal={meal} availableSpots={remainingSpots} />
          );
        })}
      </div>
    </section>
  );
}
