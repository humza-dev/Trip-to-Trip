import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar);
    formData.append("guidelicense", guidelicense);
     formData.append("cnic", cnic);
    formData.append("location", location);
    formData.append("address", address);
    formData.append("role",role)

    try {
      const response = await  axios.post(
        "http://localhost:5001/api/guide_join",
        formData,
        { headers: { "Content-Type": 'multipart/form-data' } }
      );
    
      // navigate to the login page after a successful signup
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="  bg-white-100 px-8 py-4  ">
        <div className="container grid grid-cols-3 gap-10 px-4">
          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="firstName"
              name="firstName"
              type="text"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lastName"
              name="lastName"
              type="text"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            {" "}
            <label
              htmlFor="address"
              className="block text-gray-700 font-bold mb-2"
            >
              Address:
            </label>
            <input
              id="address"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="location"
              className="block text-gray-700 font-bold mb-2"
            >
              Location:
            </label>
            <input
              id="location"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-gray-700 font-bold mb-2"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your phone number"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="avatar"
              className="block text-gray-700 font-bold mb-2"
            >
              Avatar:
            </label>
            <input
              id="avatar"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="file"
              accept="image/*"
              onChange={(event) => setAvatar(event.target.files[0])}
              required
            />
          </div>

          <div className="mb-6">
            {" "}
            <label
              htmlFor="idCard"
              className="block text-gray-700 font-bold mb-2"
            >
              ID Card (13 digits):
            </label>
            <input
              id="idCard"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={cnic}
              onChange={(event) => setCnic(event.target.value)}
              pattern="[0-9]{13}"
              maxLength={13}
              minLength={13}
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="guidelicense"
              className="block text-gray-700 font-bold mb-2"
            >
              Guide License:
            </label>
            <input
              id="guidelicense"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="file"
              accept="application/pdf"
              onChange={(event) => setGuideLicense(event.target.files[0])}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default GuideSignup;
