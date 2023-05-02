import React, { useState } from "react";

const Signup = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
   const response = await  fetch("http://localhost:5001/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstname, lastname, email, password }),
    })
      .then((res) => res.json())
      if (response.ok) {
        window.location.href = '/home';
      } else {
        alert('Failed to sign up');
      }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <label
              className="block text-gray-300 font-bold mb-2"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              className="bg-gray-700 appearance-none border-2 border-gray-600 rounded w-full py-2 px-4 text-gray-300 leading-tight focus:outline-none focus:bg-gray-600"
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
              className="block text-gray-300 font-bold mb-2"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              className="bg-gray-700 appearance-none border-2 border-gray-600 rounded w-full py-2 px-4 text-gray-300 leading-tight focus:outline-none focus:bg-gray-600"
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
              className="block text-gray-300 font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="bg-gray-700 appearance-none border-2 border-gray-600 rounded w-full py-2 px-4 text-gray-300 leading-tight focus:outline-none focus:bg-gray-600"
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
              className="block text-gray-300 font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="bg-gray-700 appearance-none border-2 border-gray-600 rounded w-full py-2 px-4 text-gray-300 leading-tight focus:outline-none focus:bg-gray-600"
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              submit
            </button>
          </div>
          <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Want to register as a Guide?{" "}
          <a
            href="/guidesignup"
            className="font-medium text-gray-600 hover:underline"
          >
            Sign up as guide
          </a>
        </p>
        </div>
      </div>
    </form>
  );
};

export default Signup;
