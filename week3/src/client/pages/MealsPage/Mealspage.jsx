import React from "react";
import Search from "../../components/TestComponent/Search/Search";
import useFilter from "../../components/TestComponent/Search/useFilter";
import MealsList from "../../components/TestComponent/MealList";

function Mealspage() {
  const { setSearchQuery, query ,newMeals } = useFilter();
  return (
    <div>
      
       <Search setSearchQuery={setSearchQuery} query={query}/>
      <MealsList  newMeals= {newMeals} limit={10} query={query}/>
    </div>
  );
}

export default Mealspage;