import React, { useState, useContext, createContext, useEffect } from "react";
import ReactDOM from "react-dom";
export const MealsContext = createContext();

export const MealsProvider = ({ children, limit }) => {
  const fetch_url = "http://localhost:5000/api/meals";

  const [meals, setMeals] = useState([]);
  

  const getMeals = async () => {
    try {
      const response = await fetch(fetch_url);

      const data = await response.json();
      setMeals((prev) => [...prev, ...data]);
      // Fetch reviews for each meal and associate them
      const mealsWithReviews = await Promise.all(
        data.map(async (meal) => {
          const fetchReviewsUrl = `http://localhost:5000/api/reviews/${meal.id}/reviews`;
          const reviewsResponse = await fetch(fetchReviewsUrl);
          const reviewsData = await reviewsResponse.json();
          return { ...meal, reviews: reviewsData };
        })
      );
      setMeals(mealsWithReviews);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMeals();
  }, []);
  const limitedMeals = meals.slice(0, limit);
  return (
    <MealsContext.Provider value={meals}>{children}</MealsContext.Provider>
  );
};