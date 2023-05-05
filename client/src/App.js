import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./Pages/Login";
import SignupPage from "./Pages/Signup";
import GuideSignup from "./Pages/GuideSignup";
import Tour from "./Pages/Tour";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import MyTours from "./Pages/MyTours";
import Tours from "./Pages/Tours";
import SecurityAgencySignup from "./Pages/SecurityAgencySignup";
function App() {
  return (
    <div>
      <Navbar />

      <Routes>
      <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/AboutUs" element={<About />} />
        <Route path="/ContactUs" element={<Contact />} />

        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/guidesignup" element={<GuideSignup />} />
        <Route path="/createtour" element={<Tour />} />
        <Route path="/mytours" element={<MyTours />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/agencysignup" element={<SecurityAgencySignup />} />
        
        
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
