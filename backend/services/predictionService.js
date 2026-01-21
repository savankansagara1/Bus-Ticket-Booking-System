// Booking Confirmation Prediction Service (Mock ML)
function predictBookingConfirmation({ seatType, bookingTime, mealSelected, routeDistance }) {
  // Base prediction with random variation
  let base = 65 + Math.floor(Math.random() * 15); // Random between 65-80

  // Seat type adjustment
  if (seatType === 'sleeper') base += 8;

  // Meal preference adjustment
  if (mealSelected === 'Veg') base += 6;
  if (mealSelected === 'Non-Veg') base += 4;
  if (mealSelected === 'Jain') base += 8;

  // Route distance adjustment (longer routes have lower confirmation)
  if (routeDistance > 5) base -= 8;
  else if (routeDistance > 3) base -= 5;
  else if (routeDistance === 1) base += 5;

  // Time-based adjustment (night bookings more likely)
  const hour = new Date(bookingTime).getHours();
  if (hour >= 22 || hour <= 6) base += 7;
  else if (hour >= 18 || hour <= 9) base += 3;

  // Add some randomness for realistic variation
  base += Math.floor(Math.random() * 10) - 5; // +/- 5

  // Clamp between 60 and 95
  return Math.min(95, Math.max(60, base));
}

module.exports = { predictBookingConfirmation };

/*const axios = require("axios");

async function predictBookingConfirmation(data) {
  try {
    const response = await axios.post("http://localhost:5000/predict", {
      seat_type: data.seatType,
      meal: data.meal,
      route_distance: data.routeDistance,
      booking_hour: new Date().getHours()
    });

    return response.data.prediction;
  } catch (error) {
    console.error("ML service error");
    return null;
  }
}

module.exports = { predictBookingConfirmation };
