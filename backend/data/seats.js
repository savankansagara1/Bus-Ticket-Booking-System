// In-memory mock data for seats
const seats = Array.from({ length: 30 }, (_, i) => ({
  seatNumber: i + 1,
  type: 'sleeper',
  booked: false,
  bookingId: null
}));

module.exports = seats;
