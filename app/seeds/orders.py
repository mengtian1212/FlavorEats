from app.models import db, Order, environment, SCHEMA
from sqlalchemy.sql import text


def seed_orders():
    orders = [
        {  # 1
            "user_id": 1,
            "restaurant_id": 1,
            "tip": 2.50,
            "is_pickup": False,
            "is_complete": False,
            "delivery_address": "350 5th Ave, New York, NY 10118",
            "delivery_lat": 40.748817,
            "delivery_lng": -73.985428,
        },
        {  # 2
            "user_id": 1,
            "restaurant_id": 1,
            "tip": 5.00,
            "is_pickup": False,
            "is_complete": True,
            "delivery_address": "Time Square, Manhattan, NY 10036",
            "delivery_lat": 40.758896,
            "delivery_lng": -73.985130,
        },
        {  # 3
            "user_id": 1,
            "restaurant_id": 3,
            "tip": 6.25,
            "is_pickup": False,
            "is_complete": True,
            "delivery_address": "510 Main Street, Apt 525, New York, NY 10044",
            "delivery_lat": 40.761593,
            "delivery_lng": -73.950595,
        },
    ]
    seed_orders = [db.session.add(
        Order(**order)) for order in orders]
    db.session.commit()


def undo_orders():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM orders"))

    db.session.commit()
