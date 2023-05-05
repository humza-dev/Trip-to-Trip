import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SecurityAgencySignup = () => {
  const navigate = useNavigate();
  const [companyname, setCompanyname] = useState("");
  const [companylicense, setCompanyLicense] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [role, setRole] = useState("securityagency");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("companyname", companyname);
    formData.append("address", address);
    formData.append("role", role);
    formData.append("phonenumber", phonenumber);

    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar);
    formData.append("companylicense", companylicense);


    try {
        const response = await axios.post(
          "http://localhost:5001/api/company_join",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
  
        // navigate to the login page after a successful signup
        navigate("/login");
      } catch (e) {
        console.log(e);
      }
  };

  return (
    
      <div class="bg-gray-800 py-10">
        <div class="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-lg">
          <div class="md:flex">
            <div class="w-full px-6 py-8 md:flex-1 md:p-10">
              <h2 class="text-2xl font-bold text-gray-800 mb-8">
                Sign up for our Security Agency
              </h2>
              <form onSubmit={handleSubmit}>
                <div class="mb-6">
                  <label
                    htmlFor="companyname"
                    class="block text-gray-800 font-bold mb-2"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyname"
                    name="companyname"
                    value={companyname}
                    placeholder="Enter your company name"
                    class="w-full p-3 border border-gray-300 rounded"
                    onChange={(e) => setCompanyname(e.target.value)}
                  />
                </div>
                <div class="mb-6">
                  <label htmlFor="email" class="block text-gray-800 font-bold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    placeholder="Enter your email"
                    class="w-full p-3 border border-gray-300 rounded"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div class="mb-6">
                  <label
                    htmlFor="password"
                    class="block text-gray-800 font-bold mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    placeholder="Enter your password"
                    class="w-full p-3 border border-gray-300 rounded"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div class="mb-6">
                  <label
                    htmlFor="address"
                    class="block text-gray-800 font-bold mb-2"
                  >
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={address}
                    placeholder="Enter your address"
                    class="w-full p-3 border border-gray-300 rounded"
                    onChange={(e) => setAddress(e.target.value)}
                  ></textarea>
                </div>
                <div class="mb-6">
                  <label
                    htmlFor="number"
                    class="block text-gray-800 font-bold mb-2"
                  >
                    Number
                  </label>
                  <input
                    type="text"
                    id="phonenumber"
                    name="phonenumber"
                    value={phonenumber}
                    placeholder="Enter your phone number"
                    class="w-full p-3 border border-gray-300 rounded"
                    onChange={(e) => setPhonenumber(e.target.value)}
                  />
                </div>

                <div class="mb-6">
                  <label
                    htmlFor="companylicence"
                    class="block text-gray-800 font-bold mb-2"
                  >
                    Company Licence (PDF)
                  </label>
                  <input
                    type="file"
                    id="companylicence"
                    name="companylicence"
                    class="w-full p-3 border border-gray-300 rounded"
                    accept="application/pdf"
                    onChange={(event) =>
                      setCompanyLicense(event.target.files[0])
                    }
                  />
                </div>
                <div class="mb-6">
                  <label
                    htmlFor="avatar"
                    class="block text-gray-800 font-bold mb-2"
                  >
                    Avatar (JPG)
                  </label>
                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    class="w-full p-3 border border-gray-300 rounded"
                    accept="image/*"
                    onChange={(event) => setAvatar(event.target.files[0])}
                  />
                </div>
                <div class="text-center">
                  <button
                    type="submit"
                    class="bg-gray-800 text-white py-3 px-6 rounded-lg font-bold"
                  >
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default SecurityAgencySignup;
