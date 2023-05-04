import React from "react";
import banner from "../assets/tracel.jpg";
import Search from "./SearchLocation";

const Home = () => {
  return (
    <div className="justify-center content-center w-auto  bg-white-100">
      <div className="">
        <img src={banner} alt="banner" className="w-full max-w-sm sm:max-w-full"/>
      </div>
      <div>
        <Search />
      </div>
      <div className="align-middle  text-center text-7xl italic">
        Our Services
      </div>
      <div className="flex items-center py-4">
      <img src={""} alt="banner" className="w-1/4 my-14 mx-60 "/>
      <h1 className="text-5xl font-bold ">Hire Guide</h1> <br />
      <p className="text-5x "> Trip to Trip provides you with direct contact with the local guide of your favourite destination and hire them </p>
      </div>
      <div className="flex items-center">
      <h1 className="text-5xl my-14 mx-60 font-bold">Hire Security</h1>
      <p className="text-5x "> Trip to Trip provides you to hire security for your trips </p>

      <img src={""} alt="banner" className="w-1/4 "/>
      </div>

    </div>
  );
};

export default Home;
