const express = require('express');
const router = express.Router();
const stations = require('../data/stations');

// GET /stations
// Purpose: List all stations on the route
router.get('/', (req, res) => {
  res.json({ stations });
});

module.exports = router;
