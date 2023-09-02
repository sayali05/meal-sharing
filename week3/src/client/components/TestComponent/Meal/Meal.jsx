import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Meal.css";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import Star from "../Star/Star";

function Meal({ meal ,availableSpots}) {
  const { id, title, description, price, max_reservations } = meal;
  const reviews = meal.reviews || [];

  // Calculate the average rating
  const totalStars = reviews.reduce((total, review) => total + review.stars, 0);
  const averageRating = reviews.length === 0 ? 0 : totalStars / reviews.length;

  // Convert the average rating to a star representation
  const roundedRating =
    reviews.length === 0 ? 0 : Math.round(averageRating * 2) / 2;
  const starRating = [...Array(5)].map((_, index) => {
    if (index + 0.5 <= roundedRating) {
      return <Star key={index} filled />;
    } else if (index < roundedRating) {
      return <Star key={index} />;
    } else {
      return <Star key={index} filled={false} />;
    }
  });

  return (
    <div className="card">
      <Link to={`/meals/${id}`}>
        <h4>{meal.title}</h4>
      </Link>
      <p>{meal.description}</p>
      <p>Remaining Reservations: {availableSpots}</p>
      <div className="star-container">{starRating}</div>
      <p>{meal.price}£</p>
    </div>
  );
}

export default Meal;