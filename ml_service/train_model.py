import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import LabelEncoder
import joblib

data = pd.read_csv("bookings.csv")

seat_enc = LabelEncoder()
meal_enc = LabelEncoder()

data["seat_type"] = seat_enc.fit_transform(data["seat_type"])
data["meal"] = meal_enc.fit_transform(data["meal"])

X = data[["seat_type", "meal", "route_distance", "booking_hour"]]
y = data["confirmed"]

model = LogisticRegression()
model.fit(X, y)

joblib.dump(model, "model.pkl")
joblib.dump(seat_enc, "seat_encoder.pkl")
joblib.dump(meal_enc, "meal_encoder.pkl")

print("Model trained & saved")
