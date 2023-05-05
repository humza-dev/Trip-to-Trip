import React from "react";
import {useLocation} from 'react-router-dom'


const Tours = (props) => {
    const { state } = useLocation();
  
    if(!state) { // check if state is defined
      return <div>No tours found.</div>; 
    }
  
    return (
        <div class="grid grid-cols-3 gap-4">
        {state.tours.map((tour) => (
          <div key={tour._id} class="bg-white rounded-lg shadow-lg p-4">
            <div class="flex justify-center">
              <img src={tour.guide.avatar} alt={tour.guide.firstname} class="rounded-full w-24 h-24 object-cover" />
            </div>
            <div class="mt-4">
                <p class="font-bold text-xl">{tour.guide.firstname}</p>
              <p class="font-bold text-xl">{tour.title}</p>
              <p class="text-gray-500">{tour.summary}</p>
              <p class="font-bold text-lg mt-4">${tour.price}</p>
             <button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
  Description
</button>

            </div>
          </div>
        ))}
      </div>
      
    );
  };
  

export default Tours;
