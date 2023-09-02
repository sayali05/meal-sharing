import React from "react";

const Review = ({ review }) => {
  return (
    <li class="gallery">
      <h4>{review.title}</h4>
      <p>
        {review.description} | Stars : {review.stars}
      </p>
    </li>
  );
};

export default Review;
