import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import React Router
import Auth from './Components/Auth'; // Path to your Auth component
import Dashboard from './Dashboard';
import Portfolio from './Portfolio'; // Path to your Dashboard component
import BuyStocks from './Buystocks';
import StockPrediction from './StockPrediction';
import Home from './Home';
const App = () => {
  return (
    <Router>
      <div className="app-container">
        {/* Define application routes */}
        <Routes>
          <Route path="/" element={<Auth />} /> {/* Default route for login/signup */}
          <Route path="/home" element={<Home />} /> 
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/buy-stocks" element={<BuyStocks />} />{/* Route for the dashboard */}
          <Route path="/stock-prediction" element={<StockPrediction />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;