import React from "react";
import {useLocation} from 'react-router-dom'


const Tours = (props) => {
    const { state } = useLocation();
  
    if(!state) { // check if state is defined
      return <div>No tours found.</div>; 
    }
  
    return (
      <div>
        {state.tours.map((tour) => (
          <div key={tour._id}>
            <p>Guide: {tour.guide.firstname}</p>
            <p>Title : {tour.title}</p>
            <p>Summary: {tour.summary} </p>
            <p>Description : {tour.description}</p>
            <p>Price : {tour.price}</p>
          </div>
        ))}
      </div>
    );
  };
  

export default Tours;
