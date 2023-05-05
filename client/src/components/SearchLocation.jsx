import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { MdNavigateBefore } from "react-icons/md";

const SearchLocation = () => {
  const [city, setCity] = useState("");
  const [tours, setTours] = useState([]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch(`http://localhost:5001/api/tours?location=${city}`);
      const data = await res.json();
  
      if(Array.isArray(data)) { // check if data is an array
        navigate("/tours", { state: { tours: data } });
        setTours(data);
        console.log(data);
      } else {
        console.log("Error: data is not an array");
      }
    } catch (err) {
      console.log(err);
    }
  }
  
  return (
    <div>
      <form onSubmit={handleSearch} className="py-4">
        <div className="align-middle  text-center text-5xl italic  mt-5 ">
          Search your destination
        </div>

        <div className="flex items-center flex-col gap-6 mb-10">
          <div className="flex items-center justify-center gap-4 mb-4 mt-9">
            <label htmlFor="location" className="mr-2 font-bold">
              Location:
            </label>{" "}
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter location"
              className="px-4 py-2 border border-gray-400 rounded-lg w-50"
            />
            <label htmlFor="check-in" className="mr-2 font-bold">
              Check-in:
            </label>
            <input
              type="date"
              id="check-in"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              placeholder="Enter check-in date"
              className="px-4 py-2 border border-gray-400 rounded-lg w-60"
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
              className="px-4 py-2 border border-gray-400 rounded-lg w-60"
            />
          </div>
          <button
            type="submit"
            className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchLocation;

// {tours.map((tour) => (
//   <div key={tour._id}>

//     <p>Guide: {tour.guide.firstname}</p>
//     <p>Title : {tour.title}</p>
//     <p>Summary: {tour.summary} </p>
//     <p>Description : {tour.description}</p>
//     <p>Price : {tour.price}</p>
//   </div>
// ))}
