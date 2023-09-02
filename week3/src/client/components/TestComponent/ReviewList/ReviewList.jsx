import React from "react";
import { useEffect, useState } from "react";
import { Mealcontext } from "../../../contexts/MealsContext";
import Review from "../ReviewListInfo";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    async function fetchReviews() {
      const res = await fetch("http://localhost:3000/api/reviews");
      const reviews = await res.json();
      setReviews(reviews);
    }

    fetchReviews().catch(console.error);
  }, []);


  return (
    <ul>
      {reviews.map((review) => (
        <Review key={review.id} review={review} />
        
      ))}
    </ul>
  );
};

export default ReviewList;
