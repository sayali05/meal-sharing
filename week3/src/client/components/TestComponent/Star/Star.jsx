import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import "./Star.css";

function Star({ filled }) {
  if (filled === undefined) {
    return <FaStarHalfAlt className="star-empty" />;
  } else if (filled) {
    return <FaStar className="star-filled" />;
  } else {
    return <FaStarHalfAlt className="star-filled" />;
  }
}

export default Star;