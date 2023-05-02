import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./Pages/Login";
import SignupPage from "./Pages/Signup";
import GuideSignup from "./Pages/GuideSignup";
function App() {
  return (
    <div>
      <Navbar />

      <Routes>
      <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/guidesignup" element={<GuideSignup />} />
        
      </Routes>
    </div>
  );
}

export default App;
