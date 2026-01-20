import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { seatsAPI } from '../services/api';
import '../styles/Seats.css';

function SeatSelection() {
    const [seats, setSeats] = useState([]);
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [fromStation, setFromStation] = useState('Ahmedabad');
    const [toStation, setToStation] = useState('Mumbai');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const stations = ['Ahmedabad', 'Nadiad', 'Anand', 'Vadodara', 'Surat', 'Vapi', 'Mumbai'];

    useEffect(() => {
        loadSeats();
        // Poll for seat updates every 3 seconds
        const interval = setInterval(loadSeats, 3000);
        return () => clearInterval(interval);
    }, []);

    const loadSeats = async () => {
        try {
            const response = await seatsAPI.getSeats();
            setSeats(response.data.seats);
            setLoading(false);
        } catch (err) {
            setError('Failed to load seats');
            setLoading(false);
        }
    };

    const handleSeatClick = (seat) => {
        if (!seat.booked) {
            setSelectedSeat(seat.seatNumber);
        }
    };

    const handleContinue = () => {
        if (!selectedSeat) {
            setError('Please select a seat');
            return;
        }

        const fromIndex = stations.indexOf(fromStation);
        const toIndex = stations.indexOf(toStation);

        if (fromIndex >= toIndex) {
            setError('Destination must be after the starting station');
            return;
        }

        navigate('/meal', {
            state: {
                seatNumber: selectedSeat,
                fromStation,
                toStation
            }
        });
    };

    const getSeatLabel = (index) => {
        if (index < 15) {
            return `L${(index % 6) + 1}`;
        } else {
            return `U${((index - 15) % 6) + 1}`;
        }
    };

    const renderSeats = (start, end, label) => {
        return (
            <div className="berth-section">
                <h2>{label}</h2>
                <div className="seat-grid">
                    {seats.slice(start, end).map((seat, index) => (
                        <div
                            key={seat.seatNumber}
                            className={`seat ${seat.booked ? 'booked' : 'available'} ${selectedSeat === seat.seatNumber ? 'selected' : ''}`}
                            onClick={() => handleSeatClick(seat)}
                        >
                            <div className="seat-number">{getSeatLabel(start + index)}</div>
                            <div className="seat-status">{seat.booked ? 'Booked' : 'Available'}</div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    if (loading) {
        return <div className="loading">Loading seats...</div>;
    }

    return (
        <div className="container">
            <div className="header">
                <div>
                    <h1>Sleeper Bus Seat Selection</h1>
                    <p className="route">Route: {fromStation} → {toStation}</p>
                </div>
                <div className="user-info">
                    <span>Welcome, {user?.name}!</span>
                    <button onClick={() => navigate('/bookings')} className="link-btn">My Bookings</button>
                    <button onClick={logout} className="logout-btn">Logout</button>
                </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="station-selection">
                <div className="station-field">
                    <label>From Station</label>
                    <select value={fromStation} onChange={(e) => setFromStation(e.target.value)}>
                        {stations.map(station => (
                            <option key={station} value={station}>{station}</option>
                        ))}
                    </select>
                </div>
                <div className="station-field">
                    <label>To Station</label>
                    <select value={toStation} onChange={(e) => setToStation(e.target.value)}>
                        {stations.map(station => (
                            <option key={station} value={station}>{station}</option>
                        ))}
                    </select>
                </div>
            </div>

            {renderSeats(0, 6, 'Lower Berth')}
            {renderSeats(15, 21, 'Upper Berth')}

            <button
                className="continue-btn"
                onClick={handleContinue}
                disabled={!selectedSeat}
            >
                Continue
            </button>
        </div>
    );
}

export default SeatSelection;
