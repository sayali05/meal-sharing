import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Meal from '../Meal/Meal';
import FormReservation from '../FormReservation/FormReservation';
import "./MealInfo.css";

const MealInfo = () => {
    const { id } = useParams();

    const [meal, setMeal] = useState([]);
    const [meals, setMeals] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
   

    const fetchMealById = async (id) => {
        try {
            setIsLoading(true)
            const API = `/api/meals/${id}`;
            const data = await fetch(API);
            const result = await data.json();
            
            setMeals(result);
            
            if (data.status === 200) {               
                setMeal(...result);
            } else if (data.status === 404) {
                setError(result.error);
            }
           
            setIsLoading(false);
        } catch (error) {
            console.error();
            setIsLoading(false);
        }
    };
   
    useEffect(() => {
       
        fetchMealById(id);
    }, [id]);

    return (

        <div className="meal-info">

            {isLoading ? (
               <p>.....isLoding</p>
            ) : error ? (
                <div>{error}</div>
            ) : (
                <>
                    <div className="meal-add-review">
                         <div className='meal-info'>
                            <p>{meals.title}</p>
                            <p>{meals.description}</p>
                            <p>Price: {meals.price} dkk</p>
                            <p>Max reservations: {meals.max_reservations}</p>
                        </div>
                        
                        <Link to={`/review`}>
                            <button className="review-meal">Add Review to meal</button>
                        </Link>
                        <FormReservation/>
                    </div>


                </>
            )
            }
        </div>
    );

};

export default MealInfo;