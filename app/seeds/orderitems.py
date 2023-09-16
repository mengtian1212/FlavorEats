from app.models import db, OrderItem, environment, SCHEMA
from sqlalchemy.sql import text
import random
from datetime import datetime


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

        # order 20 restaurant 1
        {"order_id": 20, "item_id": random.randint(
            1, 23), "quantity": random.randint(30, 98)},
        {"order_id": 20, "item_id": random.randint(
            1, 23), "quantity": random.randint(30, 98)},

        # order 21 restaurant 1
        {"order_id": 21, "item_id": random.randint(
            1, 23), "quantity": random.randint(30, 98)},
        {"order_id": 21, "item_id": random.randint(
            1, 23), "quantity": random.randint(30, 98)},

        # order 22 restaurant 1
        {"order_id": 22, "item_id": random.randint(
            1, 23), "quantity": random.randint(30, 98)},
        {"order_id": 22, "item_id": random.randint(
            1, 23), "quantity": random.randint(30, 98)},

        # order 23 restaurant 1
        {"order_id": 23, "item_id": random.randint(
            1, 23), "quantity": random.randint(30, 98)},
        {"order_id": 23, "item_id": random.randint(
            1, 23), "quantity": random.randint(30, 98)},

        # order 24 restaurant 1
        {"order_id": 24, "item_id": random.randint(
            1, 23), "quantity": random.randint(30, 98)},
        {"order_id": 24, "item_id": random.randint(
            1, 23), "quantity": random.randint(30, 98),
         "is_like": True, "is_dislike": False,
         "created_at": datetime(2023, 8, 29, 19, 00),
         "updated_at": datetime(2023, 8, 29, 19, 00),
         },

        # order 25 restaurant 1
        {"order_id": 25, "item_id": random.randint(
            1, 23), "quantity": random.randint(30, 98)},
        {"order_id": 25, "item_id": random.randint(
            1, 23), "quantity": random.randint(30, 98),
         "is_like": False, "is_dislike": True,
         "created_at": datetime(2023, 9, 10, 19, 00),
         "updated_at": datetime(2023, 9, 10, 19, 00),
         },

        # restaurant 4
        # order 26 restaurant 4
        {"order_id": 26, "item_id": random.randint(
            54, 83), "quantity": random.randint(20, 50)},
        {"order_id": 26, "item_id": random.randint(
            54, 83), "quantity": random.randint(20, 50)},

        # order 27 restaurant 4
        {"order_id": 27, "item_id": random.randint(
            54, 83), "quantity": random.randint(20, 50)},
        {"order_id": 27, "item_id": random.randint(
            54, 83), "quantity": random.randint(20, 50)},

        # order 28 restaurant 4
        {"order_id": 28, "item_id": random.randint(
            54, 83), "quantity": random.randint(20, 50)},
        {"order_id": 28, "item_id": random.randint(
            54, 83), "quantity": random.randint(20, 50)},

        # order 29 restaurant 4
        {"order_id": 29, "item_id": random.randint(
            54, 83), "quantity": random.randint(20, 50)},
        {"order_id": 29, "item_id": random.randint(
            54, 83), "quantity": random.randint(20, 50)},

        # order 30 restaurant 4
        {"order_id": 30, "item_id": random.randint(
            54, 83), "quantity": random.randint(20, 50)},
        {"order_id": 30, "item_id": random.randint(
            54, 83), "quantity": random.randint(20, 50)},

        # order 31 restaurant 4
        {"order_id": 31, "item_id": random.randint(
            54, 83), "quantity": random.randint(20, 50)},
        {"order_id": 31, "item_id": random.randint(
            54, 83), "quantity": random.randint(20, 50)},

        # order 32 restaurant 4
        {"order_id": 32, "item_id": random.randint(
            54, 83), "quantity": random.randint(20, 50)},
        {"order_id": 32, "item_id": random.randint(
            54, 83), "quantity": random.randint(20, 50)},

        # order 33 restaurant 4
        {"order_id": 33, "item_id": random.randint(
            54, 83), "quantity": random.randint(20, 50)},
        {"order_id": 33, "item_id": random.randint(
            54, 83), "quantity": random.randint(20, 50)},

        # order 34 restaurant 4
        {"order_id": 34, "item_id": random.randint(
            54, 83), "quantity": random.randint(20, 50)},
        {"order_id": 34, "item_id": random.randint(
            54, 83), "quantity": random.randint(20, 50)},

        # order 35 restaurant 4
        {"order_id": 35, "item_id": random.randint(
            54, 83), "quantity": random.randint(20, 50)},
        {"order_id": 35, "item_id": random.randint(
            54, 83), "quantity": random.randint(20, 50)},

        # order 36 restaurant 4
        {"order_id": 36, "item_id": random.randint(
            54, 83), "quantity": random.randint(20, 50)},
        {"order_id": 36, "item_id": random.randint(
            54, 83), "quantity": random.randint(20, 50)},

        # order 37 restaurant 4
        {"order_id": 37, "item_id": random.randint(
            54, 83), "quantity": random.randint(20, 50)},
        {"order_id": 37, "item_id": random.randint(
            54, 83), "quantity": random.randint(20, 50)},

        # order 38 restaurant 4
        {"order_id": 38, "item_id": random.randint(
            54, 83), "quantity": random.randint(20, 50)},
        {"order_id": 38, "item_id": random.randint(
            54, 83), "quantity": random.randint(20, 50)},

        # order 39 restaurant 4
        {"order_id": 39, "item_id": random.randint(
            54, 83), "quantity": random.randint(20, 50)},
        {"order_id": 39, "item_id": random.randint(
            54, 83), "quantity": random.randint(20, 50)},

        # order 40 restaurant 4
        {"order_id": 40, "item_id": random.randint(
            54, 83), "quantity": random.randint(20, 50)},
        {"order_id": 40, "item_id": random.randint(
            54, 83), "quantity": random.randint(20, 50)},

        # order 41 restaurant 4
        {"order_id": 41, "item_id": random.randint(
            54, 83), "quantity": random.randint(20, 50)},
        {"order_id": 41, "item_id": random.randint(
            54, 83), "quantity": random.randint(20, 50)},

        # order 42 restaurant 4
        {"order_id": 42, "item_id": random.randint(
            54, 83), "quantity": random.randint(20, 50)},
        {"order_id": 42, "item_id": random.randint(
            54, 83), "quantity": random.randint(20, 50),
         "is_like": True, "is_dislike": False,
         "created_at": datetime(2023, 8, 29, 22, 00),
         "updated_at": datetime(2023, 8, 29, 22, 00), },

        # order 43 restaurant 4
        {"order_id": 43, "item_id": random.randint(
            54, 83), "quantity": random.randint(20, 50)},
        {"order_id": 43, "item_id": random.randint(
            54, 83), "quantity": random.randint(20, 50),
         "is_like": True, "is_dislike": False,
         "created_at": datetime(2023, 8, 15, 22, 00),
         "updated_at": datetime(2023, 8, 15, 22, 00), },

        # order 44 restaurant 4
        {"order_id": 44, "item_id": random.randint(
            54, 83), "quantity": random.randint(20, 50)},
        {"order_id": 44, "item_id": random.randint(
            54, 83), "quantity": random.randint(20, 50),
         "is_like": True, "is_dislike": False,
         "created_at": datetime(2023, 9, 10, 22, 00),
         "updated_at": datetime(2023, 9, 10, 22, 00), },

        # order 45 restaurant 4
        {"order_id": 45, "item_id": random.randint(
            54, 83), "quantity": random.randint(20, 50)},
        {"order_id": 45, "item_id": random.randint(
            54, 83), "quantity": random.randint(20, 50),
         "is_like": False, "is_dislike": True,
         "created_at": datetime(2023, 9, 14, 22, 00),
         "updated_at": datetime(2023, 9, 14, 22, 00), },

        # order 46 restaurant 4
        {"order_id": 46, "item_id": random.randint(
            54, 83), "quantity": random.randint(20, 50)},
        {"order_id": 46, "item_id": random.randint(
            54, 83), "quantity": random.randint(20, 50),
            "is_like": True, "is_dislike": False,
         "created_at": datetime(2023, 9, 15, 19, 00),
         "updated_at": datetime(2023, 9, 15, 19, 00), },

        # restaurant 5
        # order 47 restaurant 5
        {"order_id": 47, "item_id": random.randint(
            84, 106), "quantity": random.randint(20, 50)},
        {"order_id": 47, "item_id": random.randint(
            84, 106), "quantity": random.randint(20, 50)},

        # order 48 restaurant 5
        {"order_id": 48, "item_id": random.randint(
            84, 106), "quantity": random.randint(20, 50)},
        {"order_id": 48, "item_id": random.randint(
            84, 106), "quantity": random.randint(20, 50)},

        # order 49 restaurant 5
        {"order_id": 49, "item_id": random.randint(
            84, 106), "quantity": random.randint(20, 50)},
        {"order_id": 49, "item_id": random.randint(
            84, 106), "quantity": random.randint(20, 50)},

        # order 50 restaurant 5
        {"order_id": 50, "item_id": random.randint(
            84, 106), "quantity": random.randint(20, 50)},
        {"order_id": 50, "item_id": random.randint(
            84, 106), "quantity": random.randint(20, 50)},

        # order 51 restaurant 5
        {"order_id": 51, "item_id": random.randint(
            84, 106), "quantity": random.randint(20, 50)},
        {"order_id": 51, "item_id": random.randint(
            84, 106), "quantity": random.randint(20, 50)},

        # order 52 restaurant 5
        {"order_id": 52, "item_id": random.randint(
         84, 106), "quantity": random.randint(20, 50)},
        {"order_id": 52, "item_id": random.randint(
            84, 106), "quantity": random.randint(20, 50)},

        # order 53 restaurant 5
        {"order_id": 53, "item_id": random.randint(
            84, 106), "quantity": random.randint(20, 50)},
        {"order_id": 53, "item_id": random.randint(
            84, 106), "quantity": random.randint(20, 50)},

        # order 54 restaurant 5
        {"order_id": 54, "item_id": random.randint(
            84, 106), "quantity": random.randint(20, 50)},
        {"order_id": 54, "item_id": random.randint(
            84, 106), "quantity": random.randint(20, 50)},

        # order 55 restaurant  5
        {"order_id": 55, "item_id": random.randint(
         84, 106), "quantity": random.randint(20, 50)},
        {"order_id": 55, "item_id": random.randint(
            84, 106), "quantity": random.randint(20, 50)},

        # order 56 restaurant 5
        {"order_id": 56, "item_id": random.randint(
            84, 106), "quantity": random.randint(20, 50)},
        {"order_id": 56, "item_id": random.randint(
            84, 106), "quantity": random.randint(20, 50)},

        # order 57 restaurant 5
        {"order_id": 57, "item_id": random.randint(
            84, 106), "quantity": random.randint(20, 50)},
        {"order_id": 57, "item_id": random.randint(
            84, 106), "quantity": random.randint(20, 50)},

        # order 58 restaurant 5
        {"order_id": 58, "item_id": random.randint(
            84, 106), "quantity": random.randint(20, 50)},
        {"order_id": 58, "item_id": random.randint(
            84, 106), "quantity": random.randint(20, 50)},

        # order 59 restaurant 5
        {"order_id": 59, "item_id": random.randint(
         84, 106), "quantity": random.randint(20, 50)},
        {"order_id": 59, "item_id": random.randint(
            84, 106), "quantity": random.randint(20, 50)},

        # order 60 restaurant 5
        {"order_id": 60, "item_id": random.randint(
            84, 106), "quantity": random.randint(20, 50)},
        {"order_id": 60, "item_id": random.randint(
            84, 106), "quantity": random.randint(20, 50)},

        # order 61 restaurant 5
        {"order_id": 61, "item_id": random.randint(
            84, 106), "quantity": random.randint(20, 50)},
        {"order_id": 61, "item_id": random.randint(
            84, 106), "quantity": random.randint(20, 50)},

        # order 62 restaurant 5
        {"order_id": 62, "item_id": random.randint(
            84, 106), "quantity": random.randint(20, 50)},
        {"order_id": 62, "item_id": random.randint(
            84, 106), "quantity": random.randint(20, 50)},

        # order 63 restaurant 5
        {"order_id": 63, "item_id": random.randint(
            84, 106), "quantity": random.randint(20, 50)},
        {"order_id": 63, "item_id": random.randint(
            84, 106), "quantity": random.randint(20, 50),
         "is_like": False, "is_dislike": True,
         "created_at": datetime(2023, 8, 29, 22, 00),
         "updated_at": datetime(2023, 8, 29, 22, 00), },

        # order 64 restaurant 5
        {"order_id": 64, "item_id": random.randint(
            84, 106), "quantity": random.randint(20, 50)},
        {"order_id": 64, "item_id": random.randint(
            84, 106), "quantity": random.randint(20, 50),
         "is_like": True, "is_dislike": False,
         "created_at": datetime(2023, 8, 15, 22, 00),
         "updated_at": datetime(2023, 8, 15, 22, 00), },

        # order 65 restaurant 5
        {"order_id": 65, "item_id": random.randint(
            84, 106), "quantity": random.randint(20, 50)},
        {"order_id": 65, "item_id": random.randint(
            84, 106), "quantity": random.randint(20, 50),
         "is_like": True, "is_dislike": False,
         "created_at": datetime(2023, 9, 10, 22, 00),
         "updated_at": datetime(2023, 9, 10, 22, 00), },

        # order 66 restaurant 5
        {"order_id": 66, "item_id": random.randint(
            84, 106), "quantity": random.randint(20, 50)},
        {"order_id": 66, "item_id": random.randint(
            84, 106), "quantity": random.randint(20, 50),
         "is_like": False, "is_dislike": True,
         "created_at": datetime(2023, 9, 14, 22, 00),
         "updated_at": datetime(2023, 9, 14, 22, 00), },

        # order 67 restaurant 5
        {"order_id": 67, "item_id": random.randint(
            84, 106), "quantity": random.randint(20, 50)},
        {"order_id": 67, "item_id": random.randint(
            84, 106), "quantity": random.randint(20, 50),
            "is_like": True, "is_dislike": False,
         "created_at": datetime(2023, 9, 15, 19, 00),
         "updated_at": datetime(2023, 9, 15, 19, 00), },

        # restaurant 21
        # order 68 restaurant 21
        {"order_id": 68, "item_id": random.randint(
            482, 511), "quantity": random.randint(30, 70)},
        {"order_id": 68, "item_id": random.randint(
            482, 511), "quantity": random.randint(30, 70)},

        # order 69 restaurant 21
        {"order_id": 69, "item_id": random.randint(
            482, 511), "quantity": random.randint(30, 70)},
        {"order_id": 69, "item_id": random.randint(
            482, 511), "quantity": random.randint(30, 70)},

        # order 70 restaurant 21
        {"order_id": 70, "item_id": random.randint(
            482, 511), "quantity": random.randint(30, 70)},
        {"order_id": 70, "item_id": random.randint(
            482, 511), "quantity": random.randint(30, 70)},

        # order 71 restaurant 21
        {"order_id": 71, "item_id": random.randint(
            482, 511), "quantity": random.randint(30, 70)},
        {"order_id": 71, "item_id": random.randint(
            482, 511), "quantity": random.randint(30, 70)},

        # order 72 restaurant 21
        {"order_id": 72, "item_id": random.randint(
            482, 511), "quantity": random.randint(30, 70)},
        {"order_id": 72, "item_id": random.randint(
            482, 511), "quantity": random.randint(30, 70)},

        # order 73 restaurant 21
        {"order_id": 73, "item_id": random.randint(
         482, 511), "quantity": random.randint(30, 70)},
        {"order_id": 73, "item_id": random.randint(
            482, 511), "quantity": random.randint(30, 70)},

        # order 74 restaurant 21
        {"order_id": 74, "item_id": random.randint(
            482, 511), "quantity": random.randint(30, 70)},
        {"order_id": 74, "item_id": random.randint(
            482, 511), "quantity": random.randint(30, 70)},

        # order 75 restaurant 21
        {"order_id": 75, "item_id": random.randint(
            482, 511), "quantity": random.randint(30, 70)},
        {"order_id": 75, "item_id": random.randint(
            482, 511), "quantity": random.randint(30, 70)},

        # order 76 restaurant  21
        {"order_id": 76, "item_id": random.randint(
         482, 511), "quantity": random.randint(30, 70)},
        {"order_id": 76, "item_id": random.randint(
            482, 511), "quantity": random.randint(30, 70)},

        # order 77 restaurant 21
        {"order_id": 77, "item_id": random.randint(
            482, 511), "quantity": random.randint(30, 70)},
        {"order_id": 77, "item_id": random.randint(
            482, 511), "quantity": random.randint(30, 70)},

        # order 78 restaurant 21
        {"order_id": 78, "item_id": random.randint(
            482, 511), "quantity": random.randint(30, 70)},
        {"order_id": 78, "item_id": random.randint(
            482, 511), "quantity": random.randint(30, 70)},

        # order 79 restaurant 21
        {"order_id": 79, "item_id": random.randint(
            482, 511), "quantity": random.randint(100, 150)},
        {"order_id": 79, "item_id": random.randint(
            482, 511), "quantity": random.randint(100, 150)},

        # order 80 restaurant 21
        {"order_id": 80, "item_id": random.randint(
         482, 511), "quantity": random.randint(30, 70)},
        {"order_id": 80, "item_id": random.randint(
            482, 511), "quantity": random.randint(30, 70)},

        # order 81 restaurant 21
        {"order_id": 81, "item_id": random.randint(
            482, 511), "quantity": random.randint(30, 70)},
        {"order_id": 81, "item_id": random.randint(
            482, 511), "quantity": random.randint(30, 70)},

        # order 82 restaurant 21
        {"order_id": 82, "item_id": random.randint(
            482, 511), "quantity": random.randint(30, 70)},
        {"order_id": 82, "item_id": random.randint(
            482, 511), "quantity": random.randint(30, 70)},

        # order 83 restaurant 21
        {"order_id": 83, "item_id": random.randint(
            482, 511), "quantity": random.randint(30, 70)},
        {"order_id": 83, "item_id": random.randint(
            482, 511), "quantity": random.randint(30, 70)},

        # order 84 restaurant 21
        {"order_id": 84, "item_id": random.randint(
            482, 511), "quantity": random.randint(30, 70)},
        {"order_id": 84, "item_id": random.randint(
            482, 511), "quantity": random.randint(30, 70),
         "is_like": False, "is_dislike": True,
         "created_at": datetime(2023, 8, 18, 22, 00),
         "updated_at": datetime(2023, 8, 18, 22, 00), },

        # order 85 restaurant 21
        {"order_id": 85, "item_id": random.randint(
            482, 511), "quantity": random.randint(30, 70)},
        {"order_id": 85, "item_id": random.randint(
            482, 511), "quantity": random.randint(30, 70),
         "is_like": True, "is_dislike": False,
         "created_at": datetime(2023, 8, 27, 22, 00),
         "updated_at": datetime(2023, 8, 27, 22, 00), },

        # order 86 restaurant 21
        {"order_id": 86, "item_id": random.randint(
            482, 511), "quantity": random.randint(70, 100)},
        {"order_id": 86, "item_id": random.randint(
            482, 511), "quantity": random.randint(70, 100),
         "is_like": True, "is_dislike": False,
         "created_at": datetime(2023, 9, 2, 22, 00),
         "updated_at": datetime(2023, 9, 2, 22, 00), },

        # order 87 restaurant 21
        {"order_id": 87, "item_id": random.randint(
            482, 511), "quantity": random.randint(30, 70)},
        {"order_id": 87, "item_id": random.randint(
            482, 511), "quantity": random.randint(30, 70),
         "is_like": False, "is_dislike": True,
         "created_at": datetime(2023, 9, 12, 22, 00),
         "updated_at": datetime(2023, 9, 12, 22, 00), },

        # order 88 restaurant 21
        {"order_id": 88, "item_id": random.randint(
            482, 511), "quantity": random.randint(30, 70)},
        {"order_id": 88, "item_id": random.randint(
            482, 511), "quantity": random.randint(30, 70),
            "is_like": True, "is_dislike": False,
         "created_at": datetime(2023, 9, 15, 19, 00),
         "updated_at": datetime(2023, 9, 15, 19, 00), },
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
