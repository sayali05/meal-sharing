import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MealsContext } from "../../contexts/MealsContext";
import "./ReviewPage.css";

function ReviewPage() {
  const navigate = useNavigate();
  const meals = useContext(MealsContext);
  const [review, setReview] = useState({
    title: "",
    description: "",
    meal_id: "",
    created_date: "",
    stars: 5,
  });

  const createReview = async (reviewData) => {
    try {
      const response = await fetch("http://localhost:3000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });
      if (response.ok) {
        setReview({
          title: "",
          description: "",
          meal_id: "",
          created_date: "",
          stars: 5,
        });
        navigate("/meal");
      }
    } catch (error) {
      throw new Error(error);
    }
  };
  const handleReview = (e) => {
    e.preventDefault();
    const { title, description } = review;

    if (!title.trim() || !description.trim()) {
      console.log("fill up the form");
    } else {
      createReview(review);
    }
  };

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "meal_id") {
      const selectedMeal = meals.find((meal) => meal.id === parseInt(value));
      if (selectedMeal) {
        setReview((prev) => ({
          ...prev,
          meal_id: selectedMeal.id,
          title: selectedMeal.title,
          created_date: new Date().toLocaleDateString("en-CA"),
        }));
      }
    } else {
      setReview((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }


  return (
    <div className="review-container">
      <h2>
        Share your reviews and help foodies to choose!
        <br />
      </h2>
      <form onSubmit={handleReview}>
        <section className="review-form">
          <select
            className="select-style"
            value={review.meal_id}
            name="meal_id"
            onChange={handleChange}
          >
            <option value="">select a Meal</option>
            {meals.map((meal) => (
              <option value={meal.id} key={meal.id}>
                {meal.title}
              </option>
            ))}
          </select>

          <textarea
            cols={50}
            rows={12}
            name="description"
            value={review.description}
            onChange={handleChange}
            placeholder="Description about the meal"
          ></textarea>
          <label>Enter your rating(0-5)</label>
          <input
            type="number"
            name="stars"
            min={0}
            max={5}
            value={review.stars}
            onChange={handleChange}
          />
        </section>
        <div className="btn-style">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default ReviewPage;