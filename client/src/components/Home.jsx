import React from "react";
import banner from "../assets/tracel.jpg";
import Search from "./SearchLocation";

const Home = () => {
  return (
    <div className="justify-center content-center w-auto ">
      <div className="">
        <img src={banner} alt="banner" className="w-full max-w-sm sm:max-w-full"/>
      </div>
      <div>
        <Search />
      </div>
      <div className="align-middle  text-center text-7xl italic">
        Our Services
      </div>
      <div className=" border-stone-950">


      </div>

    </div>
  );
};

export default Home;
