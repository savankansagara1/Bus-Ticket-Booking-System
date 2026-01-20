# Booking Confirmation Prediction (Mock ML)

## Problem Definition
Predict the probability (%) that a booking will be successfully confirmed based on user choices and route details.

## Features Used
- Seat type (sleeper)
- Booking time (hour)
- Meal selected (Veg/Non-Veg/Jain)
- Route distance (number of stations between source and destination)

## Mock Dataset (Tabular)
| seatType | bookingTime | mealSelected | routeDistance | confirmed |
|----------|-------------|--------------|--------------|-----------|
| sleeper  | 23:00       | Veg          | 6            | 1         |
| sleeper  | 10:00       | Non-Veg      | 2            | 1         |
| sleeper  | 15:00       | Jain         | 4            | 1         |
| sleeper  | 02:00       | Veg          | 5            | 1         |
| sleeper  | 18:00       | Non-Veg      | 6            | 0         |
| sleeper  | 21:00       | Jain         | 3            | 1         |
| sleeper  | 08:00       | Veg          | 1            | 1         |
| sleeper  | 12:00       | Non-Veg      | 5            | 0         |

## Model Choice
- Rule-based logic (see predictionService.js)
- Adjusts base probability by seat type, meal, route distance, and booking time

## Training Explanation
- No actual training; rules derived from mock dataset patterns
- Night bookings and Jain/Veg meals slightly increase probability
- Longer routes slightly decrease probability

## Final Prediction Output
- Returns a percentage (0-99%)
- Example: 87% probability for sleeper seat, Veg meal, night booking, long route

---

For implementation, see backend/services/predictionService.js.