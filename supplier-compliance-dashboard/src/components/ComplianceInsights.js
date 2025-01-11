import React, { useState, useEffect } from "react";
import axios from "../api/suppliers";

const ComplianceInsights = () => {
  const [insights, setInsights] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("/suppliers/insights")
      .then((response) => {
        setInsights(response.data);
      })
      .catch(() => {
        setError("Failed to fetch insights.");
      });
  }, []);

  if (error) return <p className="error">{error}</p>;
  return (
    <div>
      <h2>Compliance Insights</h2>
      <pre>{insights}</pre>
    </div>
  );
};

export default ComplianceInsights;
