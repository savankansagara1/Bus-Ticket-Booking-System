const express = require('express');
const router = express.Router();
const bookings = require('../data/bookings');

// GET /booking-history?userId=123
// Purpose: Get user's booking history
router.get('/', (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ error: 'userId is required.' });
  }
  const userBookings = bookings.filter(b => b.userId === userId);
  res.json({ bookings: userBookings });
});

module.exports = router;
