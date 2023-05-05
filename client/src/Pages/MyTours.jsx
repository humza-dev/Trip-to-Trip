// My Tours component
import React from "react";

const MyTours = ({ tours }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* <h2 className="text-3xl font-semibold mb-4">My Tours</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tours.map((tour) => (
          <div
            key={tour.id}
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between"
          >
            <h3 className="text-lg font-semibold mb-2">{tour.name}</h3>
            <p className="text-gray-600 text-sm mb-4">{tour.description}</p>
            <p className="text-gray-800 font-semibold text-lg">{tour.price}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default MyTours;
