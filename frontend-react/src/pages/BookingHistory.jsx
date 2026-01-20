import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { bookingAPI } from '../services/api';
import '../styles/Bookings.css';

function BookingHistory() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = async () => {
        try {
            const response = await bookingAPI.getBookingHistory(user.id);
            setBookings(response.data.bookings);
            setLoading(false);
        } catch (err) {
            setError('Failed to load bookings');
            setLoading(false);
        }
    };

    const handleCancelBooking = async (bookingId) => {
        if (!confirm('Are you sure you want to cancel this booking?')) {
            return;
        }

        try {
            const response = await bookingAPI.cancelBooking(bookingId);
            if (response.data.success) {
                alert('Booking cancelled successfully');
                loadBookings();
            }
        } catch (err) {
            alert(err.response?.data?.error || 'Failed to cancel booking');
        }
    };

    const getSeatLabel = (seatNumber) => {
        if (seatNumber <= 15) {
            return `L${((seatNumber - 1) % 6) + 1}`;
        } else {
            return `U${((seatNumber - 16) % 6) + 1}`;
        }
    };

    const formatBookingId = (booking) => {
        const date = new Date(booking.createdAt);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        return `BK${year}${month}${String(booking.bookingId).padStart(5, '0')}`;
    };

    const getMealName = (mealId) => {
        const meals = { 1: 'Veg', 2: 'Non-Veg', 3: 'Jain' };
        return meals[mealId] || 'Unknown';
    };

    if (loading) {
        return <div className="loading">Loading bookings...</div>;
    }

    return (
        <div className="container">
            <div className="header">
                <div>
                    <h1>My Bookings</h1>
                    <p className="subtitle">User: {user?.name}</p>
                </div>
                <div className="user-info">
                    <button onClick={() => navigate('/seats')} className="link-btn">New Booking</button>
                    <button onClick={logout} className="logout-btn">Logout</button>
                </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            {bookings.length === 0 ? (
                <p className="no-bookings">No bookings found</p>
            ) : (
                <div className="bookings-list">
                    {bookings.map(booking => (
                        <div key={booking.bookingId} className="booking-card">
                            <div className="booking-header">
                                <div className="booking-field">
                                    <span className="label">Booking ID</span>
                                    <span className="value">{formatBookingId(booking)}</span>
                                </div>
                                <div className="booking-field">
                                    <span className="label">Seat Number</span>
                                    <span className="value">{getSeatLabel(booking.seatNumber)}</span>
                                </div>
                                <div className="booking-field">
                                    <span className="label">From</span>
                                    <span className="value">{booking.fromStation}</span>
                                </div>
                                <div className="booking-field">
                                    <span className="label">To</span>
                                    <span className="value">{booking.toStation}</span>
                                </div>
                                <div className="booking-field">
                                    <span className="label">Booking Status</span>
                                    <span className={`value ${booking.status.toLowerCase()}`}>
                                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                    </span>
                                </div>
                            </div>
                            {booking.status === 'confirmed' && (
                                <button
                                    className="cancel-btn"
                                    onClick={() => handleCancelBooking(booking.bookingId)}
                                >
                                    Cancel Booking
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default BookingHistory;
