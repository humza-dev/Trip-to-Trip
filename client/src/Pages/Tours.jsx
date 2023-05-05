import React from "react";
import { useLocation } from "react-router-dom";
const Tours = (props) => {
  const { state } = useLocation();

  if (!state) {
    // check if state is defined
    return <div>No tours found.</div>;
  }
  const location = state.tours[0].location; // get the location from the first tour


  return (
    <div className="">
      <div className=" py-9 text-center  text-5xl  font-mono font-medium">
      <h3>Guides In {location}</h3>

      </div>

      <div class="grid grid-cols-3 gap-4  ">
        {state.tours.map((tour) => (
          <div key={tour._id} class="bg-gray-300 from-slate-200 to-slate-700 rounded-lg shadow-lg p-4">
            <div class="flex justify-center">
              <p class="rounded-full w-24 h-24 object-cover">
                <img src={`${tour.guide.avatar}`} alt="avatar" />
              </p>
            </div>
            <div class="mt-4 ">
              <p class="font-bold text-xl">{tour.guide.firstname}</p>
              <p class="font-bold text-xl">{tour.title}</p>
              <p class="text-gray-500">{tour.summary}</p>
              <p class="font-bold text-lg mt-4">${tour.price}</p>
              <button class="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">
                 Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tours;
