import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from 'react-slick'; // Import react-slick for the slideshow
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import logo from './images/INVestIQ.png'; 
import './Dasboard.css'// Adjust the path to your logo file

const Dashboard = () => {
  const navigate = useNavigate();

  const companies = [
    { name: 'Apple', logo: '/apple-logo.png', url: 'https://www.apple.com/investor/' },
    { name: 'Google', logo: '/google-icon.png', url: 'https://www.google.com/finance/' },
    { name: 'Amazon', logo: '/amazon-logo.png', url: 'https://www.amazon.com/invest/' },
    { name: 'Tesla', logo: '/tesla-logo.png', url: 'https://ir.tesla.com/#quarterly-disclosure' },
    { name: 'Oracle', logo: '/oracle-logo.png', url: 'https://investor.oracle.com/home/default.aspx' },
    { name: 'NSE', logo: '/nse-logo.png', url: 'https://www.nseindia.com/investor-relations/financials' },
    { name: 'Aditya Birla', logo: '/aditya-logo.png', url: 'https://www.adityabirlacapital.com/investor-relations' },
    { name: 'Intuit', logo: '/intuit-logo.png', url: 'https://investors.intuit.com/' },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const handleLogout = () => {
    navigate('/'); // Redirect to the login page
  };

  const handleInvest = (companyUrl) => {
    window.open(companyUrl, '_blank'); // Open the company's stock-buying page
  };

  return (
    <div>
      {/* Watermark background */}
      <div className="dashboard-background"></div>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <img
              src={logo}
              alt="StockMarketPro Logo"
              style={{ width: '40px', marginRight: '10px' }}
            />
            <span>InvestIQ</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link" href="/home">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/portfolio">
                  Portfolio
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/stock-prediction">
                  Market Updates
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  About
                </a>
              </li>
            </ul>
            <button className="btn btn-outline-light" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
  {/* Welcome Section */}
  <div className="welcome-container">
    <h1>Welcome to the Dashboard</h1>
  </div>

  {/* Slider Section */}
  <h3 className="mt-5">Company Stocks</h3>
  <Slider {...sliderSettings}>
    {companies.map((company) => (
      <div
        key={company.name}
        className="text-center p-3"
        onClick={() => handleInvest(company.url)}
      >
        <div className="card" style={{ cursor: 'pointer' }}>
          <img
            src={company.logo}
            className="card-img-top"
            alt={`${company.name} logo`}
            style={{ height: '150px', objectFit: 'contain' }}
          />
          <div className="card-body">
            <h5 className="card-title">{company.name}</h5>
          </div>
        </div>
      </div>
    ))}
  </Slider>
</div>
    </div>
  );
};

export default Dashboard;
