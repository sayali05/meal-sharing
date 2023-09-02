import React, { useState, useEffect } from "react";
import "./Search.css";
import useFilter  from "./useFilter";


function Search( { setSearchQuery, query }) {

   return (
    <div className="search-form-container">
     
      <div className="search-input">
        <input
        className="search-title"
          type="text"
          placeholder="Search for Meal"
          value={query.title}
          onChange={(e) => {
          setSearchQuery({title: e.target.value}); // Call setSearchQuery with the input value
          }}
        />
        <select className="sort-style" onChange={(e) =>  setSearchQuery({sortKey: e.target.value})}>
          <option value="">Sort by</option>
          <option value="when">Date</option>
          <option value="max_reservations">Max. reservations</option>
          <option value="price">Price</option>
        </select>

        <select className="sort-style" onChange={(e) =>  setSearchQuery({sortDir: e.target.value})}>
          <option value="">Sort Direction </option>
          <option value="asc">ASC </option>
          <option value="desc">DESC</option>
        </select>
      </div>
    </div>
  );
}
export default Search;