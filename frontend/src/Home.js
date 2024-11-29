import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 
import logo from './images/INVestIQ.png';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/'); // Redirect to the login page
  };// Assuming styles.css is in the same folder
  return (
    <div className="main">
      <div id="box1"></div>

      <div id="box2">
        <div id="text">
          START SMALL
          <br/>
          DREAM BIG
        </div>
      </div>

      <div id="box3">
        <div id="container">
        <div id="logo">
            <img src={logo} alt="Logo" />
            <h1>InvestIQ</h1>
        </div>
          <div id="menu">
            <ul>
            <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
              <Link to="/portfolio">Portfolio</Link>
              </li>
              <li>
              <Link to="/stock-prediction">Prediction</Link>
              </li>
              <li>contact</li>
            <button className="btn btn-outline-light" onClick={handleLogout}>
              Logout
            </button>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};



export default Dashboard;
