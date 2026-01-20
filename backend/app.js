const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const seatRoutes = require('./routes/seats');
const bookingRoutes = require('./routes/booking');
const stationRoutes = require('./routes/stations');
const availabilityRoutes = require('./routes/availability');
const historyRoutes = require('./routes/history');
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/seats', seatRoutes);
app.use('/booking', bookingRoutes);
app.use('/stations', stationRoutes);
app.use('/availability', availabilityRoutes);
app.use('/booking-history', historyRoutes);
app.use('/auth', authRoutes);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Welcome to the Train Booking System API');
});