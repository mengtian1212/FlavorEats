from app.models import db, OrderItem, environment, SCHEMA
from sqlalchemy.sql import text


def seed_orderitems():
    orderitems = [
        # order 1 restaurant 1
        {"order_id": 1, "item_id": 1, "quantity": 1},
        {"order_id": 1, "item_id": 15, "quantity": 1},
        {"order_id": 1, "item_id": 17, "quantity": 1},
        {"order_id": 1, "item_id": 19, "quantity": 1},
        # order 2 restaurant 1
        {"order_id": 2, "item_id": 5, "quantity": 3},
        {"order_id": 2, "item_id": 11, "quantity": 2},
        {"order_id": 2, "item_id": 20, "quantity": 2},
        # order 3 restaurant 2
        {"order_id": 3, "item_id": 27, "quantity": 3},
        # order 4 restaurant 2
        {"order_id": 4, "item_id": 28, "quantity": 1},
        {"order_id": 4, "item_id": 32, "quantity": 1},
        # order 5 restaurant 5
        {"order_id": 5, "item_id": 97, "quantity": 2},
        # order 6 restaurant 5
        {"order_id": 6, "item_id": 91, "quantity": 1},
        {"order_id": 6, "item_id": 104, "quantity": 1},

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
