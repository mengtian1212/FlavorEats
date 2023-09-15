from app.models import db, OrderItem, environment, SCHEMA
from sqlalchemy.sql import text
import random


def seed_orderitems():
    orderitems = [
        # order 1 restaurant 1
        {"order_id": 1, "item_id": 1, "quantity": 1},
        {"order_id": 1, "item_id": 15, "quantity": 1},
        {"order_id": 1, "item_id": 17, "quantity": 1},
        {"order_id": 1, "item_id": 19, "quantity": 1},
        # order 2 restaurant 1
        {"order_id": 2, "item_id": 5, "quantity": 3,
            "is_like": True, "is_dislike": False},
        {"order_id": 2, "item_id": 11, "quantity": 2,
            "is_like": True, "is_dislike": False},
        {"order_id": 2, "item_id": 20, "quantity": 2,
            "is_like": False, "is_dislike": True},
        # order 3 restaurant 5
        {"order_id": 3, "item_id": 97, "quantity": 2},
        # order 4 restaurant 2
        {"order_id": 4, "item_id": 28, "quantity": 1},
        {"order_id": 4, "item_id": 32, "quantity": 1},
        # order 5 restaurant 2
        {"order_id": 5, "item_id": 27, "quantity": 3,
            "is_like": False, "is_dislike": True},
        # order 6 restaurant 5
        {"order_id": 6, "item_id": 91, "quantity": 1},
        {"order_id": 6, "item_id": 104, "quantity": 1},
        # order 7 restaurant 7
        {"order_id": 7, "item_id": 144, "quantity": 1},
        {"order_id": 7, "item_id": 145, "quantity": 1},
        {"order_id": 7, "item_id": 151, "quantity": 1},
        {"order_id": 7, "item_id": 157, "quantity": 2},

        # user_id not demo user seeds
        # order 8 restaurant 1
        {"order_id": 8, "item_id": random.randint(
            1, 23), "quantity": random.randint(50, 98)},
        {"order_id": 8, "item_id": random.randint(
            1, 23), "quantity": random.randint(50, 98)},

        # order 9 restaurant 1
        {"order_id": 9, "item_id": random.randint(
            1, 23), "quantity": random.randint(50, 98)},
        {"order_id": 9, "item_id": random.randint(
            1, 23), "quantity": random.randint(50, 98)},
        {"order_id": 9, "item_id": random.randint(
            1, 23), "quantity": random.randint(50, 98)},

        # order 10 restaurant 1
        {"order_id": 10, "item_id": random.randint(
            1, 23), "quantity": random.randint(50, 98)},
        {"order_id": 10, "item_id": random.randint(
            1, 23), "quantity": random.randint(50, 98)},

        # order 11 restaurant 1
        {"order_id": 11, "item_id": random.randint(
            1, 23), "quantity": random.randint(50, 98)},
        {"order_id": 11, "item_id": random.randint(
            1, 23), "quantity": random.randint(50, 98)},
        {"order_id": 11, "item_id": random.randint(
            1, 23), "quantity": random.randint(50, 98)},

        # order 12 restaurant 1
        {"order_id": 12, "item_id": random.randint(
            1, 23), "quantity": random.randint(50, 98)},
        {"order_id": 12, "item_id": random.randint(
            1, 23), "quantity": random.randint(50, 98)},

        # order 13 restaurant 1
        {"order_id": 13, "item_id": random.randint(
            1, 23), "quantity": random.randint(50, 98), },
        {"order_id": 13, "item_id": random.randint(
            1, 23), "quantity": random.randint(50, 98), },

        # order 14 restaurant 1
        {"order_id": 14, "item_id": random.randint(
            1, 23), "quantity": random.randint(50, 98)},
        {"order_id": 14, "item_id": random.randint(
            1, 23), "quantity": random.randint(50, 98)},

        # order 15 restaurant 1
        {"order_id": 15, "item_id": random.randint(
            1, 23), "quantity": random.randint(50, 98)},
        {"order_id": 15, "item_id": random.randint(
            1, 23), "quantity": random.randint(50, 98)},

        # order 16 restaurant 1
        {"order_id": 16, "item_id": random.randint(
            1, 23), "quantity": random.randint(50, 98)},
        {"order_id": 16, "item_id": random.randint(
            1, 23), "quantity": random.randint(50, 98)},
        {"order_id": 16, "item_id": random.randint(
            1, 23), "quantity": random.randint(50, 98)},

        # order 17 restaurant 1
        {"order_id": 17, "item_id": random.randint(
            1, 23), "quantity": random.randint(50, 98)},
        {"order_id": 17, "item_id": random.randint(
            1, 23), "quantity": random.randint(50, 98)},

        # order 18 restaurant 1
        {"order_id": 18, "item_id": random.randint(
            1, 23), "quantity": random.randint(50, 98)},
        {"order_id": 18, "item_id": random.randint(
            1, 23), "quantity": random.randint(50, 98)},

        # order 19 restaurant 1
        {"order_id": 19, "item_id": random.randint(
            1, 23), "quantity": random.randint(30, 98)},
        {"order_id": 19, "item_id": random.randint(
            1, 23), "quantity": random.randint(30, 98)},

    ]

    seed_menuitems = [db.session.add(
        OrderItem(**orderitem)) for orderitem in orderitems]
    db.session.commit()


def undo_orderitems():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.orderitems RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM orderitems"))

    db.session.commit()
