# 🚌 Bus Ticket Booking System
**Ahmedabad → Mumbai Sleeper Bus Route**

---

## 🔗 Important Links

| Resource | URL |
|----------|-----|
| 🌐 **Live Application** | [https://bus-ticket-booking-system-git-main-savan-kansagaras-projects.vercel.app/login](https://bus-ticket-booking-system-git-main-savan-kansagaras-projects.vercel.app/login) |
| 🎨 **Figma Prototype** | [figma-prototype-link](https://kinder-habit-46829769.figma.site/)|


---

## 📋 Project Overview

A full-stack bus ticket booking system for the Ahmedabad → Mumbai route with real-time seat management, mandatory meal selection, intermediate stations, and ML-based booking confirmation prediction.

---

## 🚀 Defined Features

1. **User Authentication** - Secure login/registration with session management
2. **Route & Station Selection** - Ahmedabad → Mumbai with 7 intermediate stations (Nadiad, Anand, Vadodara, Bharuch, Surat)
3. **Seat Selection** - 40 sleeper seats with real-time availability and color-coded status
4. **Meal Selection (Mandatory)** - Veg, Non-Veg, Jain options with modification support
5. **Booking Prediction** - ML-based confirmation probability (0-99%)
6. **Booking Management** - View, modify, and cancel bookings
7. **Availability Check** - Real-time seat and meal availability

---

## 🧪 Test Cases

### Functional Test Cases
- ✅ Book seat with valid meal selection
- ✅ Attempt to book already booked seat (error handling)
- ✅ Cancel booking and rebook same seat
- ✅ Retrieve available seats and stations
- ✅ View booking history
- ✅ Modify meal for existing booking

### Edge Cases
- ⚠️ Book seat with invalid station
- ⚠️ Book seat without meal selection (validation)
- ⚠️ Cancel non-existent booking
- ⚠️ Book when bus is full (40/40 seats)
- ⚠️ Unauthorized access (authentication check)

### UI/UX Validation
- 🎨 Route selection mandatory
- 🎨 Booked seats disabled/greyed out
- 🎨 Meal selection required before confirmation
- 🎨 Prediction percentage displayed
- 🎨 Responsive design (mobile/desktop)
- 🎨 Clear error messages

---

## 📡 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/register` | POST | User registration |
| `/api/auth/login` | POST | User login |
| `/api/seats` | GET | Get all seats with status |
| `/api/book-seat` | POST | Book a seat (requires meal) |
| `/api/book-meal` | POST | Add/modify meal for booking |
| `/api/cancel-booking` | POST | Cancel a booking |
| `/api/stations` | GET | List all stations |
| `/api/availability` | GET | Check seat/meal availability |
| `/api/booking-history` | GET | User booking history |

---

## 🤖 Prediction Model

**Type:** Rule-based ML mock model  
**Purpose:** Predict booking confirmation probability (0-99%)

**Features Used:**
- Seat type (sleeper)
- Booking time (hour of day)
- Meal preference (Veg/Non-Veg/Jain)
- Route distance (number of stations)

**Logic:** Base probability adjusted by:
- Night bookings: +7%
- Jain/Veg meals: +6-8%
- Shorter routes: +5%
- Longer routes: -8%

📄 **Detailed Documentation:** [PREDICTION_APPROACH.md](./PREDICTION_APPROACH.md)

---

## 💻 Technology Stack

**Frontend:** React.js, React Router, Axios, CSS3, Vite  
**Backend:** Node.js, Express.js, CORS  
**Deployment:** Vercel (Frontend), Render (Backend)  
**Version Control:** Git, GitHub

---

## 🎨 UI/UX Design

**Design Principles:**
- Simple, step-by-step booking flow (Route → Seat → Meal → Confirm)
- Mobile-first responsive design
- Color-coded seat status (Available/Selected/Booked)
- Real-time validation and feedback

**Booking Flow:**
1. Login/Register
2. Select route and stations
3. Choose seat from visual map
4. Select meal (mandatory)
5. View prediction and confirm
6. Manage bookings

📄 **Design Documentation:** [UI_UX_DESIGN.md](./UI_UX_DESIGN.md)

---

## 📁 Project Structure

```
Bus-Ticket-Booking-System/
├── backend/
│   ├── routes/          # API endpoints
│   ├── services/        # Prediction logic
│   └── data/            # Mock data
├── frontend-react/
│   ├── src/
│   │   ├── pages/       # UI components
│   │   └── services/    # API calls
│   └── public/
├── Screenshots/         # App screenshots
├── README.md
├── PREDICTION_APPROACH.md
└── UI_UX_DESIGN.md
```


**Author:** Savan Kansagara  
