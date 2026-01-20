# Sleeper Bus Booking System - React Frontend

A React-based frontend with multi-user authentication for the sleeper bus booking system.

## Features

✅ **Multi-User Authentication**
- Login and Register functionality
- Session management with localStorage
- Protected routes for authenticated users

✅ **Real-Time Seat Updates**
- Seats refresh every 3 seconds
- When one user books a seat, other users see it as booked immediately

✅ **User-Specific Booking History**
- Each user sees only their own bookings
- Booking management (view and cancel)

✅ **Complete Booking Flow**
- Seat selection (Lower & Upper Berth)
- Meal selection (Veg, Non-Veg, Jain)
- Booking confirmation with probability
- Booking history management

## Demo Accounts

- **User 1**: Username: `john` | Password: `password123`
- **User 2**: Username: `jane` | Password: `password123`

## How to Run

### 1. Start the Backend
```bash
cd backend
node app.js
```
Backend runs on `http://localhost:3000`

### 2. Start the React Frontend
```bash
cd frontend-react
npm run dev
```
Frontend runs on `http://localhost:5173`

### 3. Test Multi-User Functionality
1. Open two browser windows (or use incognito mode)
2. Login as `john` in one window
3. Login as `jane` in another window
4. Book a seat as `john` - you'll see it become unavailable for `jane` within 3 seconds
5. Each user can see only their own booking history

## Project Structure

```
frontend-react/
├── src/
│   ├── context/
│   │   └── AuthContext.jsx       # Authentication state management
│   ├── pages/
│   │   ├── Login.jsx              # Login/Register page
│   │   ├── SeatSelection.jsx     # Seat selection with real-time updates
│   │   ├── MealSelection.jsx     # Meal selection
│   │   ├── Confirmation.jsx      # Booking confirmation
│   │   └── BookingHistory.jsx    # User-specific booking history
│   ├── services/
│   │   └── api.js                 # API service layer
│   ├── styles/                    # Component-specific CSS
│   ├── App.jsx                    # Main app with routing
│   └── main.jsx                   # Entry point
```

## Technologies Used

- **React 18** - UI framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Vite** - Build tool
- **Context API** - State management
