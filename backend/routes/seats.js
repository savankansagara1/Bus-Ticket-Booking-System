const express = require('express');
const router = express.Router();
const seats = require('../data/seats');

// GET /seats
// Purpose: List all seats and their status
router.get('/', (req, res) => {
  res.json({ seats });
});

module.exports = router;
