# Sleeper Bus Ticket Booking System (Ahmedabad → Mumbai)

## Project Overview
A backend system for booking sleeper bus tickets on the Ahmedabad → Mumbai route. The system supports seat selection, mandatory meal booking, intermediate stations, booking confirmation prediction, and booking management. UI is described as a wireframe prototype for Figma.

## Core Features
1. **Route Selection**: Choose Ahmedabad → Mumbai and intermediate stations.
2. **Seat Selection**: Select available sleeper seats.
3. **Meal Selection**: Mandatory meal booking during checkout.
4. **Booking Confirmation**: Predict booking success probability (ML mock).
5. **Booking Management**: View, confirm, and cancel bookings.
6. **Availability Check**: Real-time seat and meal availability.
7. **Booking History**: Retrieve user booking history.

## Test Cases
### Functional Test Cases
- Book a seat with meal selection (valid flow)
- Attempt to book an already booked seat
- Cancel a booking and rebook the same seat
- Retrieve available seats and stations
- View booking history for a user

### Edge Cases
- Book seat with invalid station
- Book seat without meal selection (should fail)
- Cancel non-existent booking
- Book seat when bus is full
- Book meal for non-existent booking

### UI/UX Validation Cases
- Route selection is mandatory
- Seat selection disables unavailable seats
- Meal selection is required before confirmation
- Booking confirmation displays prediction percentage
- Error messages for invalid actions

## API Endpoints
| Endpoint              | Method | Description                                 |
|----------------------|--------|--------------------------------------------- |
| /seats               | GET    | List all seats and their status              |
| /book-seat           | POST   | Book a seat (requires meal selection)        |
| /book-meal           | POST   | Add/modify meal for a booking                |
| /cancel-booking      | POST   | Cancel a booking                             |
| /stations            | GET    | List all stations on the route               |
| /availability        | GET    | Get seat and meal availability               |
| /booking-history     | GET    | Get user's booking history                   |

## UI/UX Flow Explanation
1. **Route Selection**: User selects Ahmedabad → Mumbai and intermediate stations.
2. **Seat Selection**: User views sleeper seat map, selects available seat.
3. **Meal Selection**: User chooses mandatory meal option.
4. **Booking Confirmation**: System predicts booking success, displays percentage.
5. **Booking Management**: User can view, confirm, or cancel bookings.

## Public Prototype Link
[Prototype (Figma) - Placeholder](https://kinder-habit-46829769.figma.site/)

---