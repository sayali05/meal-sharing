import React, { useContext, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ReviewForm from "../ReviewForm/ReviewForm";
import { MealsContext } from "../../../contexts/MealsContext";
import "./review.css";


function Review() {
  const data = useContext(MealsContext);
  const meals = data.meals;
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  

  useEffect(() => {
    if (meals.length > 0) {
      setIsLoading(false); // Update loading state once data is available
    }
  }, [meals]);


  const RenderMeal = meals.map((meal, index) => {
    return (
      <option key={index} value={meal.id}>
        {meal.title}
      </option>
    );
  });

  function handleSelect(e) {
    setSelectedId(e.target.value);
  }

  return (
    <>

      <select onChange={handleSelect}>
        <option value="">Select a meal to add Review</option>
        {RenderMeal}
      </select>
      {isLoading ? (
        <p>Loading meals...</p>
      ) : selectedId ? (
        <ReviewForm id={selectedId} />
      ) : null}
     
    </>
  );
}
export default Review;