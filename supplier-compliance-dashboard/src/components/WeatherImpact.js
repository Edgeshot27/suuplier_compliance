import React, { useState } from "react";
import axios from "../api/suppliers";

const WeatherImpact = () => {
  const [data, setData] = useState({
    supplier_id: "",
    latitude: "",
    longitude: "",
    delivery_date: "",
  });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/suppliers/check-weather-impact", data);
      setMessage("Weather impact analyzed successfully!");
    } catch (error) {
      setMessage("Failed to analyze weather impact.");
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Check Weather Impact</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="supplier_id"
          placeholder="Supplier ID"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="latitude"
          placeholder="Latitude"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="longitude"
          placeholder="Longitude"
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="delivery_date"
          onChange={handleChange}
          required
        />
        <button type="submit">Check</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default WeatherImpact;
