


import pandas as pd
import random

rows = []

for _ in range(1200):
    seat_type = "sleeper"
    meal = random.choice(["Veg", "Non-Veg", "Jain"])
    route_distance = random.randint(1, 6)
    booking_hour = random.randint(0, 23)

    prob = 0.7
    if meal in ["Veg", "Jain"]:
        prob += 0.1
    if route_distance > 4:
        prob -= 0.1
    if booking_hour >= 22 or booking_hour <= 6:
        prob += 0.1

    confirmed = 1 if random.random() < prob else 0

    rows.append([
        seat_type,
        meal,
        route_distance,
        booking_hour,
        confirmed
    ])

df = pd.DataFrame(rows, columns=[
    "seat_type",
    "meal",
    "route_distance",
    "booking_hour",
    "confirmed"
])

df.to_csv("bookings.csv", index=False)
print("Dataset created: bookings.csv")
