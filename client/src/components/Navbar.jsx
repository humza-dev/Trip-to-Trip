import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 py-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 px-1">
            <Link to="/" className="text-white font-bold text-lg">
             Trip to trip
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 ">
            <Link
                to="/login"
                className="text-gray-300 hover:bg-gray-700 hover:text-white text-md px-3 py-2 rounded-md  font-medium"
              >
                Log in
              </Link>
            <Link
                to="/AboutUs"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium"
              >
                About
              </Link>
              <Link
                to="/ContactUs"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium"
              >
                Contact Us
              </Link>
              
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
