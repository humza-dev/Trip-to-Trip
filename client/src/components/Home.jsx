import React from "react";
import banner from "../assets/banner.jpg";
import Search from "./SearchLocation";
import guide from '../assets/guide.jpg'
import security from '../assets/security.jpg'



const Home = () => {
  return (
    <div className="justify-center content-center w-auto  bg-white-100">
      <div className="">
        <img
          src={banner}
          alt="banner"
          className="w-full max-w-sm sm:max-w-full"
        />
      </div>
      <div>
        <Search />
      </div>
      <div className="align-middle  text-center text-7xl italic">
        Our Services
      </div>

      <div className="flex items-center py-4">
        <img src={guide} alt="banner" className="w-1/4 my-14 mx-60 " />
        <div className="justify-center ">
        <h1 className="text-5xl font-bold ">Hire Guide</h1> <br />
        <p className="text-5x ">
          {" "}
          Trip to Trip provides you with direct contact with the local guide of
          your favourite destination and hire them{" "}
        </p>
        </div>
      </div>
      <div className="flex items-center ">
        <div className="justify-center px-3">
        <h1 className="text-5xl my-8 mx-60 font-bold justify-center ">Hire Security</h1> <br />
        <p className="text-10x ">
          {" "}
          Trip to Trip provides you to hire security for your trips{" "}
        </p>
        </div>

        <img src={security} alt="banner" className="w-1/4 " />
      </div>
    </div>
  );
};

export default Home;
