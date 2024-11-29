// backend/routes/investmentRoutes.js
const express = require('express');
const Investment = require('../models/Investment');
const User = require('../models/User');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.post('/buy', authenticateToken, async (req, res) => {
  const { stockName, quantity, price } = req.body;
  const userId = req.user.id; // Ensure the middleware sets req.user

  try {
    if (!stockName || !quantity || !price) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (quantity <= 0 || price <= 0) {
      return res.status(400).json({ message: 'Quantity and price must be positive' });
    }

    const totalAmount = quantity * price;

    // Check user's balance
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.balance < totalAmount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Deduct balance and save the investment
    user.balance -= totalAmount;
    await user.save();

    const investment = new Investment({
      userId,
      stockName,
      quantity,
      price,
      totalAmount,
    });
    await investment.save();

    res.status(201).json({ message: 'Stock bought successfully', investment });
  } catch (error) {
    console.error('Error during stock purchase:', error);
    res.status(500).json({ message: 'Failed to buy the stock' });
  }
});

router.get('/user-portfolio', authenticateToken, async (req, res) => {
    try {
      const investments = await Investment.find({ userId: req.user.id });
      if (!investments || investments.length === 0) {
        return res.status(200).json([]);
      }
  
      // Fetch current prices dynamically (static here for demonstration)
      const currentPrices = {
        Apple: 180,
        Google: 2900,
        Amazon: 3450,
        Tesla: 1050,
      };
  
      const portfolio = investments.map((investment) => {
        const currentPrice = currentPrices[investment.stockName] || 0; // Handle unknown stocks gracefully
        return {
          company: investment.stockName,
          quantity: investment.quantity,
          boughtAt: investment.price,
          currentPrice,
        };
      });
  
      res.status(200).json(portfolio);
    } catch (error) {
      console.error('Error fetching user portfolio:', error);
      res.status(500).json({ message: 'Failed to fetch portfolio' });
    }
  });

module.exports = router;
