import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Confirmation.css';

function Confirmation() {
    const navigate = useNavigate();
    const location = useLocation();
    const { seatNumber, mealName, route, probability } = location.state || {};

    if (!seatNumber) {
        navigate('/seats');
        return null;
    }

    // Format probability - ensure it's a valid number
    const displayProbability = probability !== undefined && probability !== null
        ? Math.round(probability)
        : 85; // Fallback value

    return (
        <div className="container">
            <h1>Booking Confirmed</h1>

            <div className="confirmation-card">
                <div className="info-row">
                    <span className="label">Seat Number:</span>
                    <span className="value">{seatNumber}</span>
                </div>
                <div className="info-row">
                    <span className="label">Selected Meal:</span>
                    <span className="value">{mealName}</span>
                </div>
                <div className="info-row">
                    <span className="label">Route:</span>
                    <span className="value">{route}</span>
                </div>
                <div className="info-row">
                    <span className="label">Booking Confirmation Probability:</span>
                    <span className="value">{displayProbability}%</span>
                </div>
            </div>

            <button className="continue-btn" onClick={() => navigate('/bookings')}>
                View Booking History
            </button>
        </div>
    );
}

export default Confirmation;
