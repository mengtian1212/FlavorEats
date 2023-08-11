from app.models import db, MenuItemLike, environment, SCHEMA
from sqlalchemy.sql import text


def seed_menuitemlikes():
    menuitemlikes = [
        {"reviewer_id": 1, "menuitem_id": 1, "is_like": True},
        {"reviewer_id": 2, "menuitem_id": 1, "is_like": True},
        {"reviewer_id": 3, "menuitem_id": 1, "is_like": True},
        {"reviewer_id": 4, "menuitem_id": 1, "is_like": True},
        {"reviewer_id": 5, "menuitem_id": 1, "is_like": False},
        {"reviewer_id": 2, "menuitem_id": 5, "is_like": True},
        {"reviewer_id": 3, "menuitem_id": 5, "is_like": True},
        {"reviewer_id": 4, "menuitem_id": 5, "is_like": True},
        {"reviewer_id": 1, "menuitem_id": 11, "is_like": True},
        {"reviewer_id": 2, "menuitem_id": 11, "is_like": True},
        {"reviewer_id": 3, "menuitem_id": 11, "is_like": True},
        {"reviewer_id": 4, "menuitem_id": 11, "is_like": True},
        {"reviewer_id": 5, "menuitem_id": 11, "is_like": True},
        {"reviewer_id": 1, "menuitem_id": 15, "is_like": True},
        {"reviewer_id": 2, "menuitem_id": 15, "is_like": True},
        {"reviewer_id": 3, "menuitem_id": 15, "is_like": True},
        {"reviewer_id": 4, "menuitem_id": 15, "is_like": True},
        {"reviewer_id": 5, "menuitem_id": 15, "is_like": False},
        {"reviewer_id": 3, "menuitem_id": 28, "is_like": True},
        {"reviewer_id": 4, "menuitem_id": 28, "is_like": True},
        {"reviewer_id": 6, "menuitem_id": 28, "is_like": False},
        {"reviewer_id": 1, "menuitem_id": 32, "is_like": True},
        {"reviewer_id": 2, "menuitem_id": 32, "is_like": True},
        {"reviewer_id": 3, "menuitem_id": 32, "is_like": True},
        {"reviewer_id": 4, "menuitem_id": 32, "is_like": True},
        {"reviewer_id": 5, "menuitem_id": 32, "is_like": False},
    ]

    seed_menuitemlikes = [db.session.add(
        MenuItemLike(**menuitemlike)) for menuitemlike in menuitemlikes]
    db.session.commit()


def undo_menuitemlikes():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.menuitemlikes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM menuitemlikes"))

    db.session.commit()
