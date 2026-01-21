from flask import Flask, request, jsonify
import joblib
import numpy as np
from datetime import datetime

app = Flask(__name__)

model = joblib.load("model.pkl")
seat_enc = joblib.load("seat_encoder.pkl")
meal_enc = joblib.load("meal_encoder.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    seat = seat_enc.transform([data["seat_type"]])[0]
    meal = meal_enc.transform([data["meal"]])[0]

    features = np.array([[
        seat,
        meal,
        data["route_distance"],
        data["booking_hour"]
    ]])

    prob = model.predict_proba(features)[0][1]

    return jsonify({
        "prediction": round(prob * 100, 2)
    })

app.run(port=5000)
