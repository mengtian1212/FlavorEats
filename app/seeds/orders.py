from app.models import db, Order, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_orders():
    orders = [
        {  # 1
            "user_id": 1,
            "restaurant_id": 1,
            "is_pickup": False,
            "is_complete": False,
            "delivery_address": "",
        },
        {  # 2
            "user_id": 1,
            "restaurant_id": 1,
            "tip": 5,
            "is_pickup": False,
            "is_priority": True,
            "is_complete": True,
            "review_id": 2,
            "delivery_address": "Time Square, Manhattan, NY 10036",
            "delivery_lat": 40.758896,
            "delivery_lng": -73.985130,
            "created_at": datetime(2023, 9, 9, 11, 50),
            "updated_at": datetime(2023, 9, 9, 13, 50),
        },
        {  # 3
            "user_id": 1,
            "restaurant_id": 5,
            "tip": 8,
            "is_pickup": False,
            "is_complete": True,
            "delivery_address": "Empire State Building 350 5th Ave, New York, NY 10118",
            "delivery_lat": 40.748817,
            "delivery_lng": -73.985428,
            "created_at": datetime(2023, 9, 6, 8, 30),
            "updated_at": datetime(2023, 9, 6, 8, 30),
        },
        {  # 4
            "user_id": 1,
            "restaurant_id": 2,
            "is_pickup": True,
            "is_complete": False,
            "delivery_address": "",
        },
        {  # 5
            "user_id": 1,
            "restaurant_id": 2,
            "tip": 6.25,
            "is_pickup": True,
            "is_complete": True,
            "review_id": 8,
            "created_at": datetime(2023, 9, 3, 17, 15),
            "updated_at": datetime(2023, 9, 3, 17, 15),
        },
        {  # 6
            "user_id": 1,
            "restaurant_id": 5,
            "is_pickup": False,
            "is_complete": False,
            "delivery_address": "",
        },
        {  # 7
            "user_id": 1,
            "restaurant_id": 7,
            "tip": 3,
            "is_pickup": False,
            "is_complete": True,
            "delivery_address": "510 Main Street, Apt 525, New York, NY 10044",
            "delivery_lat": 40.761593,
            "delivery_lng": -73.950595,
            "created_at": datetime(2023, 8, 29, 20, 26),
            "updated_at": datetime(2023, 8, 29, 20, 26),

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
