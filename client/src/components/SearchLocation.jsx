import React, { useState, useEffect } from "react";

const SearchLocation = () => {
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // perform search using the form inputs
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between mb-4">
        <label htmlFor="location" className="mr-2 font-bold">
          Location:
        </label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
          className="px-4 py-2 border border-gray-400 rounded-lg w-1/2"
        />
      </div>
      <div className="flex items-center justify-between mb-4">
        <label htmlFor="check-in" className="mr-2 font-bold">
          Check-in:
        </label>
        <input
          type="date"
          id="check-in"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          placeholder="Enter check-in date"
          className="px-4 py-2 border border-gray-400 rounded-lg w-1/3"
        />
        <label htmlFor="check-out" className="mr-2 font-bold">
          Check-out:
        </label>
        <input
          type="date"
          id="check-out"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          placeholder="Enter check-out date"
          className="px-4 py-2 border border-gray-400 rounded-lg w-1/3"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
      >
        Search
      </button>
    </form>
  );
};

export default SearchLocation;
