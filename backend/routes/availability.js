const express = require('express');
const router = express.Router();
const seats = require('../data/seats');
const meals = require('../data/meals');

// GET /availability
// Purpose: Get seat and meal availability
router.get('/', (req, res) => {
  const availableSeats = seats.filter(s => !s.booked);
  res.json({ availableSeats, meals });
});

module.exports = router;
