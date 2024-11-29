// src/StockPrediction.js

import React, { useState, useEffect } from 'react';
import './StockPrediction.css'; 
import Navbar1 from './Navbar1'; // Include a CSS file for styling

const StockPrediction = () => {
  // State to store stock prediction data
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a fetch request to get stock predictions (you can replace it with real data from a prediction API)
    const fetchStockPredictions = async () => {
      try {
        setLoading(true);
        // Mock prediction data (Replace with real API call)
        const data = [
          { company: 'Tesla', prediction: 'Increase by 5% in next month', confidence: '85%' },
          { company: 'Apple', prediction: 'Decrease by 3% in next month', confidence: '75%' },
          { company: 'Amazon', prediction: 'Increase by 8% in next month', confidence: '90%' },
        ];
        setPredictions(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching predictions:', error);
        setLoading(false);
      }
    };

    fetchStockPredictions();
  }, []);

  return (
    <div>
      <Navbar1/>
    <div className="stock-prediction-container">

      {loading ? (
        <p>Loading predictions...</p>
      ) : (
        <div className="prediction-list">
          {predictions.map((prediction, index) => (
            <div className="prediction-card" key={index}>
              <h3>{prediction.company}</h3>
              <p><strong>Prediction:</strong> {prediction.prediction}</p>
              <p><strong>Confidence:</strong> {prediction.confidence}</p>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default StockPrediction;
