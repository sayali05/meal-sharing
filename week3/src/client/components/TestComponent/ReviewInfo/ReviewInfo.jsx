import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./ReviewInfo.css";

const ReviewInfo = () => {
    const { id } = useParams();
console.log(id);
    const [meal, setMeal] = useState("");
    const [reviews, setReviews] = useState([]);     
    const [error, setError] = useState(null);

    const getReviews = async (id) => { 
        try {
            const API = `/api/reviews/${id}/meal-reviews`;
            const data = await fetch(API);
            const result = await data.json();
            console.log(result)
            setMeal(result.meal);
            setReviews(result.reviews);
            setError(result.error);
        } catch (error) {
            console.error();
        }
    }

    useEffect(() => {
        getReviews(id);
    }, [])

    return (
        <div className="meal-reviews-layout">
            { error ?
            <div className="error">{error}</div>
            : <div className="content"> <h3> {meal} </h3>
            {reviews ? 
            reviews.length > 0 && 
            reviews.map(review => 
                <div key={review.posted} className="review-card">
                    <div className="review-title">{review.title}</div>
                    <div>{review.description}</div>
                    <div>Stars: {review.stars} / 5</div>
                </div>
            )
             : "Meal has no reviews"}
            </div>
            }
        </div>
    );
};

export default ReviewInfo;