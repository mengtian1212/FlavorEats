from app.models import db, Favorite, environment, SCHEMA
from sqlalchemy.sql import text


def seed_favorites():
    favorites = [
        {"user_id": 1, "restaurant_id": 1},
        {"user_id": 1, "restaurant_id": 2},
        {"user_id": 1, "restaurant_id": 5},
        {"user_id": 1, "restaurant_id": 6},
        {"user_id": 2, "restaurant_id": 1},
        {"user_id": 2, "restaurant_id": 3},
        {"user_id": 2, "restaurant_id": 4},
        {"user_id": 3, "restaurant_id": 1},
        {"user_id": 3, "restaurant_id": 2},
        {"user_id": 4, "restaurant_id": 1},
    ]

    seed_favorites = [db.session.add(
        Favorite(**favorite)) for favorite in favorites]
    db.session.commit()


def undo_favorites():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM favorites"))

    db.session.commit()
