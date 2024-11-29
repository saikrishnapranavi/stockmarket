import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Portfolio.css';
import Navbar from './Navbar';

const Portfolio = () => {
  const [stocks, setStocks] = useState([]);
  const navigate = useNavigate(); // Hook to navigate to another page

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/investments/user-portfolio', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setStocks(response.data);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      }
    };
  
    fetchPortfolio();
  }, []);
  

  // Calculate totals
  const totalInvested = stocks.reduce((acc, stock) => acc + stock.boughtAt * stock.quantity, 0).toFixed(2);
  const totalCurrentValue = stocks.reduce((acc, stock) => acc + stock.currentPrice * stock.quantity, 0).toFixed(2);
  const totalProfitLoss = (totalCurrentValue - totalInvested).toFixed(2);
  const profitLossColor = totalProfitLoss >= 0 ? 'green' : 'red';

  // Handle "Invest Now" button click
  const handleInvestNow = () => {
    navigate('/buy-stocks'); // Navigate to the BuyStocks page
  };

  return (
    <div>
    <Navbar/>
    <div className="portfolio-container">
      <div className="portfolio-card">
        <h2>My Portfolio</h2>
        <div className="portfolio-summary">
          <div>
            <span>Current Value:</span>
            <h3>₹{totalCurrentValue}</h3>
          </div>
          <div>
            <span>Invested:</span>
            <h3>₹{totalInvested}</h3>
          </div>
          <div>
            <span style={{ color: profitLossColor }}>Profit/Loss:</span>
            <h3 style={{ color: profitLossColor }}>₹{totalProfitLoss}</h3>
          </div>
        </div>
        <p>Last Updated: {new Date().toLocaleDateString()}</p>

        {/* Invest Now Button */}
        <button className="btn-primary" onClick={handleInvestNow}>
          Invest Now
        </button>
      </div>

      <div className="stocks-card">
        <h3>Invested Funds</h3>
        {stocks.map((stock, index) => (
          <div className="stock-details" key={index}>
            <div className="stock-header">
              <span>{stock.company}</span>
            </div>
            <div className="stock-info">
              <div>
                <span>Current Value:</span>
                <span>₹{(stock.currentPrice * stock.quantity).toFixed(2)}</span>
              </div>
              <div>
                <span>Invested:</span>
                <span>₹{(stock.boughtAt * stock.quantity).toFixed(2)}</span>
              </div>
              <div>
                <span
                  style={{
                    color: (stock.currentPrice - stock.boughtAt) >= 0 ? 'green' : 'red',
                  }}
                >
                  Profit/Loss:
                </span>
                <span
                  style={{
                    color: (stock.currentPrice - stock.boughtAt) >= 0 ? 'green' : 'red',
                  }}
                >
                  ₹{((stock.currentPrice - stock.boughtAt) * stock.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Portfolio;
