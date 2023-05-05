import React from "react";
import { useLocation } from "react-router-dom";

const TourDetails = () => {
  const { state } = useLocation();

  if (!state) {
    // check if state is defined
    return <div>No tour details found.</div>;
  }

  const { tour } = state;

  return (
    <div>
      <img src={tour.coverimage} alt={tour.title} />
      <h2>{tour.title}</h2>
      <p>{tour.description}</p>
      <p>Price: ${tour.price}</p>
    </div>
  );
};

export default TourDetails;
