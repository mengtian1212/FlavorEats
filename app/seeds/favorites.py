from app.models import db, Favorite, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_favorites():
    favorites = [
        {"user_id": 1, "restaurant_id": 2,
         "created_at": datetime(2023, 9, 9, 11, 57),
         "updated_at": datetime(2023, 9, 9, 13, 57), },
        {"user_id": 1, "restaurant_id": 3,
         "created_at": datetime(2023, 9, 6, 11, 57),
         "updated_at": datetime(2023, 9, 6, 13, 57), },
        {"user_id": 1, "restaurant_id": 14,
         "created_at": datetime(2023, 9, 4, 11, 57),
         "updated_at": datetime(2023, 9, 4, 13, 57), },
        {"user_id": 1, "restaurant_id": 11,
         "created_at": datetime(2023, 9, 3, 11, 57),
         "updated_at": datetime(2023, 9, 3, 13, 57), },
        {"user_id": 1, "restaurant_id": 18,
         "created_at": datetime(2023, 9, 1, 11, 57),
         "updated_at": datetime(2023, 9, 1, 13, 57), },
        {"user_id": 2, "restaurant_id": 1},
        {"user_id": 2, "restaurant_id": 3},
        {"user_id": 2, "restaurant_id": 4},
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
