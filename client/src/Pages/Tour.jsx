import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Tour = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState("");
  const [price, SetPrice] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [startDates, setStartDates] = useState("");
  const [guide, setGuide] = useState("");
  const [imageCover, setImageCover] = useState("");
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("location", location);
    formData.append("duration", duration);
    formData.append("price", price);
    formData.append("summary", summary);
    formData.append("description", description);
    formData.append("startDates", startDates);
    formData.append("guide", guide);
    formData.append("imageCover", imageCover);
    formData.append("image1", image1);
    formData.append("image2", image2);
    formData.append("image3", image3);

    try {
      await axios.post("http://localhost:5001/api/createtour", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // navigate to the login page after a successful signup
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} class="max-w-xl mx-auto py-4">
      <h1 className="text-center text-gray-700 font-extrabold text-3xl">
        Add Trip Details
      </h1>
      <div class="mb-4">
        <label class="block font-medium text-gray-700 mb-2" for="duration">
          Title
        </label>
        <input
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="duration"
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div class="mb-4">
        <label class="block font-medium text-gray-700 mb-2" for="location">
          Location
        </label>
        <input
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="location"
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>

      <div class="mb-4">
        <label class="block font-medium text-gray-700 mb-2" for="duration">
          Duration
        </label>
        <input
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="duration"
          type="text"
          placeholder="Enter duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
      </div>

      <div class="mb-4">
        <label class="block font-medium text-gray-700 mb-2" for="price">
          Price
        </label>
        <input
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="price"
          type="text"
          placeholder="Enter price"
          value={price}
          onChange={(e) => SetPrice(e.target.value)}
          required
        />
      </div>

      <div class="mb-4">
        <label class="block font-medium text-gray-700 mb-2" for="summary">
          Summary
        </label>
        <textarea
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="summary"
          placeholder="Enter summary"
          rows="4"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          required
        ></textarea>
      </div>

      <div class="mb-4">
        <label class="block font-medium text-gray-700 mb-2" for="description">
          Description
        </label>
        <textarea
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          placeholder="Enter description"
          rows="6"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>

      <div class="mb-4">
        <label class="block font-medium text-gray-700 mb-2" for="startDates">
          Start Dates
        </label>
        <input
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="startDates"
          type="date"
          value={startDates}
          onChange={(e) => setStartDates(e.target.value)}
          required
        />
      </div>

      <div class="mb-4">
        <label class="block font-medium text-gray-700 mb-2" for="imageCover">
          Cover Image
        </label>
        <input
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="imageCover"
          type="file"
          accept="image/*"
          onChange={(event) => setImageCover(event.target.files[0])}
          required
        />
      </div>

      <div class="mb-4">
        <label class="block font-medium text-gray-700 mb-2" for="image1">
          Additional Image 1
        </label>
        <input
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="image1"
          type="file"
          accept="image/*"
          onChange={(event) => setImage1(event.target.files[0])}
        />
      </div>

      <div class="mb-4">
        <label class="block font-medium text-gray-700 mb-2" for="image2">
          Additional Image 2
        </label>
        <input
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="image2"
          type="file"
          accept="image/*"
          onChange={(event) => setImage2(event.target.files[0])}
        />
      </div>

      <div class="mb-4">
        <label class="block font-medium text-gray-700 mb-2" for="image3">
          Additional Image 3
        </label>
        <input
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="image3"
          type="file"
          accept="image/*"
          onChange={(event) => setImage3(event.target.files[0])}
        />
      </div>

      <div className="flex items-center justify-between">
        <button className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          submit
        </button>
      </div>
    </form>
  );
};

export default Tour;
