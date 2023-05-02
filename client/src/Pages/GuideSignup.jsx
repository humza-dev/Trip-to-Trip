import React, { useState, useEffect } from "react";
import axios from "axios";

const GuideSignup = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [guidelicense, setGuideLicense] = useState(null);
  const [cnic, setCnic] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [role, setRole] = useState("guide");
  const [isAvaliable, setIsAvalaible] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();



  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="first name"> First Name:</label>
      <input
        id="firstname"
        type="text"
        value={firstname}
        onChange={(event) => setFirstName(event.target.value)}
        required
      />
      <label htmlFor="last name">Last Name:</label>
      <input
        id="lastname"
        type="text"
        value={lastname}
        onChange={(event) => setLastName(event.target.value)}
        required
      />

      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />

      <label htmlFor="password">Password:</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />

      <label htmlFor="avatar">Avatar:</label>
      <input
        id="avatar"
        type="file"
        accept="image/*"
        onChange={(event) => setAvatar(event.target.files[0])}
        required
      />

      <label htmlFor="guidelicense">Guide License:</label>
      <input
        id="guidelicense"
        type="file"
        accept="application/pdf"
        onChange={(event) => setGuideLicense(event.target.files[0])}
        required
      />

      <label htmlFor="idCard">ID Card (13 digits):</label>
      <input
        id="idCard"
        type="text"
        value={cnic}
        onChange={(event) => setCnic(event.target.value)}
        pattern="[0-9]{13}"
        maxLength={13}
        minLength={13}
        required
      />
      <label htmlFor="address">Address:</label>
      <input
        id="address"
        type="text"
        value={address}
        onChange={(event) => setAddress(event.target.value)}
        required
      />
       <label htmlFor="location">Location:</label>
      <input
        id="location"
        type="text"
        value={location}
        onChange={(event) => setLocation(event.target.value)}
        required
      />

      <button type="submit">Sign up</button>
    </form>
  );
};

export default GuideSignup;
