import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { bookingAPI } from '../services/api';
import '../styles/Meal.css';

function MealSelection() {
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { seatNumber, fromStation, toStation } = location.state || {};

    const meals = [
        { id: 1, name: 'Veg', price: 150 },
        { id: 2, name: 'Non-Veg', price: 200 },
        { id: 3, name: 'Jain', price: 170 }
    ];

    if (!seatNumber || !fromStation || !toStation) {
        navigate('/seats');
        return null;
    }

    const handleMealClick = (meal) => {
        setSelectedMeal(meal);
    };

    const handleConfirmBooking = async () => {
        if (!selectedMeal) return;

        setLoading(true);
        setError('');

        try {
            const response = await bookingAPI.createBooking(
                user.id,
                seatNumber,
                selectedMeal.id,
                fromStation,
                toStation
            );

            if (response.data.success) {
                navigate('/confirmation', {
                    state: {
                        seatNumber,
                        mealName: selectedMeal.name,
                        route: `${fromStation} → ${toStation}`,
                        probability: response.data.prediction // Directly access prediction number
                    }
                });
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to confirm booking');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1>Select Your Meal</h1>
            <p className="route">Route: {fromStation} → {toStation}</p>

            {error && <div className="error-message">{error}</div>}

            <div className="meal-grid">
                {meals.map(meal => (
                    <div
                        key={meal.id}
                        className={`meal-card ${selectedMeal?.id === meal.id ? 'selected' : ''}`}
                        onClick={() => handleMealClick(meal)}
                    >
                        <h3>{meal.name}</h3>
                        <p className="price">₹{meal.price}</p>
                    </div>
                ))}
            </div>

            <button
                className="continue-btn"
                onClick={handleConfirmBooking}
                disabled={!selectedMeal || loading}
            >
                {loading ? 'Confirming...' : 'Confirm Booking'}
            </button>
        </div>
    );
}

export default MealSelection;
