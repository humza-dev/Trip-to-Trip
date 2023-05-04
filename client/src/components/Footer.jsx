import React from 'react';
import {AiFillFacebook , AiFillTwitterCircle , AiFillInstagram} from "react-icons/ai"
import { MdFlightTakeoff } from 'react-icons/md';


const Footer = () => {
  return (
    <footer className="bg-gray-800 mt-14">
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
      <div className="flex items-center">
        <MdFlightTakeoff className="h-8 w-8 text-white mr-2" />
        <h1 className="text-white font-bold text-xl">Trip to Trip</h1>
      </div>
      <div className="flex justify-around gap-5">
        <a href="#" className="text-gray-400 hover:text-gray-300">
          <span className="sr-only">Facebook</span>
          <AiFillFacebook className="h-6 w-6" />
        </a>
        <a href="#" className="text-gray-400 hover:text-gray-300">
          <span className="sr-only">Twitter</span>
          <AiFillTwitterCircle className="h-6 w-6" />
        </a>
        <a href="#" className="text-gray-400 hover:text-gray-300">
          <span className="sr-only">Instagram</span>
          <AiFillInstagram className="h-6 w-6" />
        </a>
      </div>
    </div>
  </footer>

  )
}

export default Footer