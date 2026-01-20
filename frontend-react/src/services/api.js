import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const authAPI = {
    login: (username, password) => api.post('/auth/login', { username, password }),
    register: (username, password, name) => api.post('/auth/register', { username, password, name })
};

export const seatsAPI = {
    getSeats: () => api.get('/seats')
};

export const bookingAPI = {
    createBooking: (userId, seatNumber, mealId, fromStation, toStation) =>
        api.post('/booking', { userId, seatNumber, mealId, fromStation, toStation }),
    cancelBooking: (bookingId) =>
        api.post('/booking/cancel-booking', { bookingId }),
    getBookingHistory: (userId) =>
        api.get(`/booking-history?userId=${userId}`)
};

export default api;
