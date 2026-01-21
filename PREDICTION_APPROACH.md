# 🤖 Booking Confirmation Prediction Approach

## 📊 Problem Definition
Predict the **probability (%)** that a bus ticket booking will be successfully confirmed based on booking attributes and user behavior patterns.

---

## 🟢 Current Implementation (Deployed)

### 🎯 Model Choice
**Type:** Rule-based ML mock model

**Reasoning:**
- High interpretability and transparency
- No dependency on historical datasets
- Fast inference and stable deployment
- Suitable for demonstration and evaluation

---

## 🔍 Features Used for Prediction

| Feature | Type | Impact |
|-------|------|-------|
| Seat Type | Categorical | +8% (sleeper seats) |
| Booking Time | Temporal | +3% to +7% (night bookings preferred) |
| Meal Selected | Categorical | +4% to +8% (Jain/Veg higher) |
| Route Distance | Numerical | −8% to +5% |

---

## 📁 Mock Dataset (Conceptual)

| Seat Type | Booking Time | Meal | Route Distance | Confirmed |
|----------|--------------|------|----------------|----------|
| sleeper | 23:00 | Veg | 6 | Yes |
| sleeper | 10:00 | Non-Veg | 2 | Yes |
| sleeper | 15:00 | Jain | 4 | Yes |
| sleeper | 02:00 | Veg | 5 | Yes |
| sleeper | 18:00 | Non-Veg | 6 | No |

**Observed Patterns:**
- Night bookings → higher confirmation
- Jain/Veg meals → higher confidence
- Longer routes → increased uncertainty

---

## 🧮 Rule-Based Prediction Logic (Deployed)

```js
function predictBookingConfirmation({ seatType, bookingTime, mealSelected, routeDistance }) {
  let base = 65 + Math.floor(Math.random() * 15);

  if (seatType === 'sleeper') base += 8;
  if (mealSelected === 'Veg') base += 6;
  if (mealSelected === 'Non-Veg') base += 4;
  if (mealSelected === 'Jain') base += 8;

  if (routeDistance > 5) base -= 8;
  else if (routeDistance > 3) base -= 5;
  else if (routeDistance === 1) base += 5;

  const hour = new Date(bookingTime).getHours();
  if (hour >= 22 || hour <= 6) base += 7;
  else if (hour >= 18 || hour <= 9) base += 3;

  base += Math.floor(Math.random() * 10) - 5;
  return Math.min(95, Math.max(60, base));
}

```

**Example:**
- Sleeper seat, 23:30, Jain meal, 4 stations
- Calculation: 70 + 8 + 8 - 5 + 7 + 3 = **91% probability**

---

## 🟡 Experimental ML Implementation (Not Deployed)
To explore a real ML-based approach, an experimental Python ML pipeline was implemented locally.

**🔧 Model Details:**
- **Algorithm**: Logistic Regression
- **Language**: Python
- **Libraries**: scikit-learn, pandas
- **Dataset**: Synthetic historical booking data

## 📊 Features Used

- Seat type (encoded)
- Meal selection (encoded)
- Route distance
-Booking hour

## 🧪 Training Methodology

- Synthetic dataset generation based on realistic assumptions
- Categorical encoding using LabelEncoder
- Model trained to predict confirmation probability
- Output generated using predict_proba()

## 🏗️ Architecture

- Python ML model exposed via REST API
- Designed to be consumed by Node.js backend
- Not integrated into production deployment to ensure stability

## 🎯 Booking Probability Output (%)

**Output Range:** 60-95%

**Interpretation:**
- **60-70%:** Low confidence
- **71-80%:** Moderate confidence
- **81-90%:** High confidence
- **91-95%:** Very high confidence

**Example Outputs:**

| Scenario | Probability |
|----------|-------------|
| Night, Jain meal, 1 station | 94% |
| Midday, Non-Veg, 6 stations | 68% |
| Evening, Veg, 3 stations | 82% |

---