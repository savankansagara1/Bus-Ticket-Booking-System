const express = require('express');
const router = express.Router();
const seats = require('../data/seats');
const bookings = require('../data/bookings');
const meals = require('../data/meals');
const stations = require('../data/stations');
const { predictBookingConfirmation } = require('../services/predictionService');

// POST /book-seat
// Purpose: Book a seat (requires meal selection)
// Request body: { userId, seatNumber, mealId, fromStation, toStation }
// Response: { success, booking, prediction }
router.post('/', (req, res, next) => {
  try {
    const { userId, seatNumber, mealId, fromStation, toStation } = req.body;
    // Validation
    if (!userId || !seatNumber || !mealId || !fromStation || !toStation) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    if (!stations.includes(fromStation) || !stations.includes(toStation)) {
      return res.status(400).json({ error: 'Invalid station.' });
    }
    const seat = seats.find(s => s.seatNumber === seatNumber);
    if (!seat || seat.booked) {
      return res.status(400).json({ error: 'Seat unavailable.' });
    }
    const meal = meals.find(m => m.id === mealId);
    if (!meal) {
      return res.status(400).json({ error: 'Invalid meal selection.' });
    }
    // Business logic
    const bookingId = bookings.length + 1;
    const booking = {
      bookingId,
      userId,
      seatNumber,
      mealId,
      fromStation,
      toStation,
      status: 'confirmed',
      createdAt: new Date()
    };
    bookings.push(booking);
    seat.booked = true;
    seat.bookingId = bookingId;
    // ML prediction
    const prediction = predictBookingConfirmation({ seatType: seat.type, bookingTime: booking.createdAt, mealSelected: meal.name, routeDistance: stations.indexOf(toStation) - stations.indexOf(fromStation) });
    //when ml service is implemented //

    /*const prediction = await predictBookingConfirmation({
      seatType: seat.type,
       meal: meal.name,
      routeDistance:
       stations.indexOf(toStation) - stations.indexOf(fromStation)
       });*/
    res.json({ success: true, booking, prediction });
  } catch (err) {
    next(err);
  }
});

// POST /book-meal
// Purpose: Add/modify meal for a booking
// Request body: { bookingId, mealId }
// Response: { success, booking }
router.post('/book-meal', (req, res, next) => {
  try {
    const { bookingId, mealId } = req.body;
    const booking = bookings.find(b => b.bookingId === bookingId);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found.' });
    }
    const meal = meals.find(m => m.id === mealId);
    if (!meal) {
      return res.status(400).json({ error: 'Invalid meal selection.' });
    }
    booking.mealId = mealId;
    res.json({ success: true, booking });
  } catch (err) {
    next(err);
  }
});

// POST /cancel-booking
// Purpose: Cancel a booking
// Request body: { bookingId }
// Response: { success }
router.post('/cancel-booking', (req, res, next) => {
  try {
    const { bookingId } = req.body;
    const bookingIndex = bookings.findIndex(b => b.bookingId === bookingId);
    if (bookingIndex === -1) {
      return res.status(404).json({ error: 'Booking not found.' });
    }
    const seat = seats.find(s => s.bookingId === bookingId);
    if (seat) {
      seat.booked = false;
      seat.bookingId = null;
    }
    bookings.splice(bookingIndex, 1);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;