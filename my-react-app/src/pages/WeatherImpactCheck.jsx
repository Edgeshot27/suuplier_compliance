import React, { useState } from 'react';

const WeatherImpactCheck = () => {
  const [supplierId, setSupplierId] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      supplier_id: supplierId,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      delivery_date: deliveryDate,
    };

    setLoading(true);
    setError('');
    setResult('');

    try {
      const response = await fetch('http://localhost:8001/weather-impact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
      setResult(data.message);  // Set the response message directly
    } else {
      setError(data.detail || 'An error occurred');
    }
  } catch (err) {
    setError('An error occurred while contacting the server');
  } finally {
    setLoading(false);
  }
  };

  return (
    <div>
      <h2>Check Weather Impact on Supplier Delivery</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="supplier_id">Supplier ID:</label>
          <input
            type="number"
            id="supplier_id"
            value={supplierId}
            onChange={(e) => setSupplierId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="latitude">Latitude:</label>
          <input
            type="text"
            id="latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="longitude">Longitude:</label>
          <input
            type="text"
            id="longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="delivery_date">Delivery Date:</label>
          <input
            type="date"
            id="delivery_date"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit" disabled={loading}>
            {loading ? 'Checking...' : 'Check Weather Impact'}
          </button>
        </div>
      </form>

      {result && (
        <div style={{ marginTop: '20px' }}>
          <h3>Result:</h3>
          <p>{result}</p>
        </div>
      )}

      {error && (
        <div style={{ marginTop: '20px', color: 'red' }}>
          <h3>Error:</h3>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherImpactCheck;
