import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick'; // Import the slider library
import axios from 'axios'; // For API calls
import './Portfolio.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BuyStocks = () => {
  const navigate = useNavigate();

  // Company data
  const companies = [
    { id: 'apple', name: 'Apple', price: 175, logo: '/apple-logo.png' },
    { id: 'google', name: 'Google', price: 2800, logo: '/google-icon.png' },
    { id: 'amazon', name: 'Amazon', price: 3400, logo: '/amazon-logo.png' },
    { id: 'tesla', name: 'Tesla', price: 1000, logo: '/tesla-logo.png' },
    { id: 'oracle', name: 'Oracle', price: 1500, logo: '/oracle-logo.png' },
    { id: 'nse', name: 'NSE', price: 2000, logo: '/nse-logo.png' },
    { id: 'adityabirla', name: 'Aditya Birla', price: 3000, logo: '/aditya-logo.png' },
    { id: 'intuit', name: 'Intuit', price: 200, logo: '/intuit-logo.png' },


  ];



  const [selectedCompany, setSelectedCompany] = useState(companies[0]); // Default to the first company
  const [quantity, setQuantity] = useState(1); // Quantity input

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  // Handle stock purchase
  const handleBuyStock = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token'); // Retrieve JWT from localStorage
      const response = await axios.post(
        'http://localhost:5000/api/investments/buy',
        {
          stockName: selectedCompany.name,
          quantity,
          price: selectedCompany.price,
        },
        {
          headers: { Authorization: `Bearer ${token}` }, // Add token in headers
        }
      );

      if (response.status === 201) {
        alert(`Successfully purchased ${quantity} shares of ${selectedCompany.name}!`);
        navigate('/portfolio'); // Redirect to portfolio page
      } else {
        alert('Failed to purchase stock. Please try again.');
      }
    } catch (error) {
      console.error('Error purchasing stock:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="portfolio-container">
      <div className="portfolio-card">
        <h2>Select a Company to Invest</h2>

        {/* Company Slider */}
        <Slider {...sliderSettings}>
          {companies.map((company) => (
            <div
              key={company.id}
              className="text-center p-3"
              onClick={() => setSelectedCompany(company)} // Update selected company
              style={{ cursor: 'pointer' }}
            >
              <div className={`card ${selectedCompany.id === company.id ? 'selected' : ''}`}>
                <img
                  src={company.logo}
                  className="card-img-top"
                  alt={`${company.name} logo`}
                  style={{ height: '150px', objectFit: 'contain', marginBottom: '10px' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{company.name}</h5>
                  <p>Price: ₹{company.price}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        {/* Quantity Input */}
        <div className="mt-4">
          <h3>{selectedCompany.name}</h3>
          <p>Current Price (₹): {selectedCompany.price}</p>
          <label>
            Quantity:
            <input
              type="number"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </label>
        </div>

        {/* Buy Button */}
        <button className="btn-primary mt-3" onClick={handleBuyStock}>
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default BuyStocks;
