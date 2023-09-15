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
            "created_at": datetime(2023, 9, 9, 16, 50),
            "updated_at": datetime(2023, 9, 9, 16, 50),
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
            "created_at": datetime(2023, 9, 6, 14, 30),
            "updated_at": datetime(2023, 9, 6, 14, 30),
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
            "created_at": datetime(2023, 9, 3, 1, 15),
            "updated_at": datetime(2023, 9, 3, 1, 15),
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
            "created_at": datetime(2023, 8, 29, 19, 26),
            "updated_at": datetime(2023, 8, 29, 19, 26),
        },

        # user_id not demo user seeds
        {  # 8
            "user_id": 2,
            "restaurant_id": 1,
            "tip": 3,
            "is_pickup": False,
            "is_complete": True,
            "delivery_address": "510 Main Street, Apt 525, New York, NY 10044",
            "delivery_lat": 40.761593,
            "delivery_lng": -73.950595,
            "created_at": datetime(2023, 2, 1, 19, 00),
            "updated_at": datetime(2023, 2, 1, 19, 00),
        },

        {  # 9
            "user_id": 3,
            "restaurant_id": 1,
            "tip": 3,
            "is_pickup": False,
            "is_complete": True,
            "delivery_address": "510 Main Street, Apt 525, New York, NY 10044",
            "delivery_lat": 40.761593,
            "delivery_lng": -73.950595,
            "created_at": datetime(2023, 3, 1, 19, 00),
            "updated_at": datetime(2023, 3, 1, 19, 00),
        },

        {  # 10
            "user_id": 4,
            "restaurant_id": 1,
            "tip": 3,
            "is_pickup": False,
            "is_complete": True,
            "delivery_address": "510 Main Street, Apt 525, New York, NY 10044",
            "delivery_lat": 40.761593,
            "delivery_lng": -73.950595,
            "created_at": datetime(2023, 4, 1, 19, 00),
            "updated_at": datetime(2023, 4, 1, 19, 00),
        },

        {  # 11
            "user_id": 5,
            "restaurant_id": 1,
            "tip": 3,
            "is_pickup": False,
            "is_complete": True,
            "delivery_address": "510 Main Street, Apt 525, New York, NY 10044",
            "delivery_lat": 40.761593,
            "delivery_lng": -73.950595,
            "created_at": datetime(2023, 5, 1, 19, 00),
            "updated_at": datetime(2023, 5, 1, 19, 00),
        },

        {  # 12
            "user_id": 6,
            "restaurant_id": 1,
            "tip": 3,
            "is_pickup": False,
            "is_complete": True,
            "delivery_address": "510 Main Street, Apt 525, New York, NY 10044",
            "delivery_lat": 40.761593,
            "delivery_lng": -73.950595,
            "created_at": datetime(2023, 6, 1, 19, 00),
            "updated_at": datetime(2023, 6, 1, 19, 00),
        },

        {  # 13
            "user_id": 7,
            "restaurant_id": 1,
            "tip": 3,
            "is_pickup": False,
            "is_complete": True,
            "delivery_address": "510 Main Street, Apt 525, New York, NY 10044",
            "delivery_lat": 40.761593,
            "delivery_lng": -73.950595,
            "created_at": datetime(2023, 7, 1, 19, 00),
            "updated_at": datetime(2023, 7, 1, 19, 00),
        },

        {  # 14
            "user_id": 8,
            "restaurant_id": 1,
            "tip": 3,
            "is_pickup": False,
            "is_complete": True,
            "delivery_address": "510 Main Street, Apt 525, New York, NY 10044",
            "delivery_lat": 40.761593,
            "delivery_lng": -73.950595,
            "created_at": datetime(2023, 8, 1, 19, 00),
            "updated_at": datetime(2023, 8, 1, 19, 00),
        },

        {  # 15
            "user_id": 9,
            "restaurant_id": 1,
            "tip": 3,
            "is_pickup": False,
            "is_complete": True,
            "delivery_address": "510 Main Street, Apt 525, New York, NY 10044",
            "delivery_lat": 40.761593,
            "delivery_lng": -73.950595,
            "created_at": datetime(2023, 9, 1, 19, 00),
            "updated_at": datetime(2023, 9, 1, 19, 00),
        },

        {  # 16
            "user_id": 11,
            "restaurant_id": 1,
            "tip": 3,
            "is_pickup": False,
            "is_complete": True,
            "delivery_address": "510 Main Street, Apt 525, New York, NY 10044",
            "delivery_lat": 40.761593,
            "delivery_lng": -73.950595,
            "created_at": datetime(2022, 10, 1, 19, 00),
            "updated_at": datetime(2022, 10, 1, 19, 00),
        },

        {  # 17
            "user_id": 11,
            "restaurant_id": 1,
            "tip": 3,
            "is_pickup": False,
            "is_complete": True,
            "delivery_address": "510 Main Street, Apt 525, New York, NY 10044",
            "delivery_lat": 40.761593,
            "delivery_lng": -73.950595,
            "created_at": datetime(2022, 11, 1, 19, 00),
            "updated_at": datetime(2022, 11, 1, 19, 00),
        },

        {  # 18
            "user_id": 12,
            "restaurant_id": 1,
            "tip": 3,
            "is_pickup": False,
            "is_complete": True,
            "delivery_address": "510 Main Street, Apt 525, New York, NY 10044",
            "delivery_lat": 40.761593,
            "delivery_lng": -73.950595,
            "created_at": datetime(2022, 12, 1, 19, 00),
            "updated_at": datetime(2022, 12, 1, 19, 00),
        },

        {  # 19
            "user_id": 12,
            "restaurant_id": 1,
            "tip": 3,
            "is_pickup": False,
            "is_complete": True,
            "delivery_address": "510 Main Street, Apt 525, New York, NY 10044",
            "delivery_lat": 40.761593,
            "delivery_lng": -73.950595,
            "created_at": datetime(2023, 1, 1, 19, 00),
            "updated_at": datetime(2023, 1, 1, 19, 00),
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
