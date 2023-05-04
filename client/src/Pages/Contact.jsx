import React from "react";
import emailjs from "emailjs-com";
import { useState } from "react";

const Contact = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
       process.env.REACT_APP_TEMPLATE_ID,
        event.target,
        process.env.REACT_APP_USER_ID
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    event.target.reset();
  };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  return (
    <div className="grid grid-cols-2 justify-center ml-3">
    <form onSubmit={handleSubmit} classname="max-w-xl  py-4   ">
      <div class="mb-4 " >
        <label
          htmlFor="name"
          class="block font-medium text-gray-700 mb-2"
          for="duration"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleChange}
        />
      </div>
      <div class="mb-4">
        <label
          htmlFor="email"
          class="block font-medium text-gray-700 mb-2"
          for="duration"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleChange}
        />
      </div>

      <div class="mb-4">
        {" "}
        <label
          htmlFor="message"
          class="block font-medium text-gray-700 mb-2"
          for="duration"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        ></textarea>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Send
        </button>
      </div>
    </form>
    </div>
  );
};

export default Contact;
