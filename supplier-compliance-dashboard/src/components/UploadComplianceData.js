import React, { useState } from "react";
import axios from "../api/suppliers";

const UploadComplianceData = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/suppliers/check-compliance", formData);
      setMessage("Compliance data uploaded successfully!");
    } catch (error) {
      setMessage("Failed to upload compliance data.");
    }
  };

  return (
    <div>
      <h2>Upload Compliance Data</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadComplianceData;
