import React from "react";
import { useState, useEffect } from "react";

function useFilter() {
  const API = "/api/meals";

  const [newMeals, setNewMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState({
    title: "",
    sortKey: "",
    sortDir: "asc",
  });
  const setSearchQuery = (newQuery) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      ...newQuery,
    }));
  };

  const fetchMeals = async () => {
    try {
      const params = new URLSearchParams();
      if (query?.title) params.append("title", query?.title);
      if (query.sortKey) params.append("sortKey", query.sortKey);
      if (query.sortDir) params.append("sortDir", query.sortDir);

      const searchURL = `${API}?${params.toString()}`;

      const response = await fetch(searchURL);
      const data = await response.json();
     
      // Fetch reviews for each meal and associate them
      const mealsWithReviews = await Promise.all(
        data.map(async (meal) => {
          const fetchReviewsUrl = `http://localhost:5000/api/reviews/${meal.id}/reviews`;
          const reviewsResponse = await fetch(fetchReviewsUrl);
          const reviewsData = await reviewsResponse.json();
          return { ...meal, reviews: reviewsData };
        })
      );
      //console.log("Response from API:", response);
      setNewMeals(mealsWithReviews);
    } catch (error) {
      throw new Error(error);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchMeals();
  }, [query]);
  
  return {
    newMeals,
    setSearchQuery,
    query,
  };
}
export default useFilter;