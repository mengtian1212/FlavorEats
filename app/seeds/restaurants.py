from app.models import db, Restaurant, environment, SCHEMA
from sqlalchemy.sql import text


cusine_types = ["Fast Food", "Healthy", "Bakery", "Mexican", "Chinese", "Burgers",
                "Pizza", "Vegan", "Indian", "Comfort Food", "Tacos",
                "Asian", "Bubble Tea", "Ramen", "French", "Japanese", "Desserts",
                "BBQ", "Salads", "American", "Coffee", "Seafood", "European",
                "Alcohol", "Breakfast", "Sushi", "Italian", "Ice cream", "Burritos"]


def seed_restaurants():
    restaurants = [
        {  # 1
            "owner_id": 1,
            "name": "McDonald's",
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/41e448619de9527990482249b90f154c/97ef7458dde62fa918635bc21265d9f5.jpeg",
            "description": "McDonald's is a renowned global fast-food chain recognized for its affordable menu, featuring popular items like the Big Mac and Chicken McNuggets. ",
            "delivery_fee": 0.49,
            "cusine_types": "American#Fast Food#Burgers#Comfort Food#Coffee & Tea#Breakfast",
            "price_ranges": "$",
            "city": "Manhattan",
            "state": "NY",
            "address": "26 E 23rd St, NEW YORK, NY 10010",
            "lat": 40.740166,
            "lng": -73.987967
        },
        {  # 2
            "owner_id": 1,
            "name": "Shake Shack",
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/66e0f9d70b3fb76cbec9ec5203d4cfea/97ef7458dde62fa918635bc21265d9f5.jpeg",
            "description": "Shake Shack is an American fast casual restaurant chain based in New York City. It started out as a hot dog cart inside Madison Square Park in 2001, and its popularity steadily grew. ",
            "delivery_fee": 0.99,
            "cusine_types": "American#Fast Food#Burgers#Comfort Food#Ice cream",
            "price_ranges": "$",
            "city": "Manhattan",
            "state": "NY",
            "address": "23rd And Madison Avenue, New York, NY 10010",
            "lat": 40.741922,
            "lng": -73.986337
        },
        {  # 3
            "owner_id": 1,
            "name": "Gyu-Kaku Japanese BBQ",
            "image_url": "https://d1ralsognjng37.cloudfront.net/5b819fd2-ee2c-4b6c-b60a-1ff32d4e175c.jpeg",
            "description": "Gyu-Kaku is a renowned Japanese barbecue (yakiniku) restaurant that offers an interactive and flavorful dining experience. Originating from Japan, Gyu-Kaku invites diners to grill their own high-quality meats and vegetables right at their table, fostering a sense of fun and community. ",
            "delivery_fee": 2.99,
            "cusine_types": "Asian#Japanese#BBQ",
            "price_ranges": "$",
            "city": "Manhattan",
            "state": "NY",
            "address": "34 Cooper Sq New York NY 10003",
            "lat": 40.727246,
            "lng": -73.992232
        },
        {  # 4
            "owner_id": 2,
            "name": "P.F. Chang's",
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/2892d0438d2d0db230564521ee2ac04b/97ef7458dde62fa918635bc21265d9f5.jpeg",
            "delivery_fee": 0,
            "cusine_types": "Chinese#Asian",
            "price_ranges": "$$",
            "city": "Manhattan",
            "state": "NY",
            "address": "113 University Place, New York, NY 10003",
            "lat": 40.733773,
            "lng": -73.993939
        },
        {  # 5
            "owner_id": 1,
            "name": "Starbucks",
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/ab8e3f337605a518833ff1c0aebe10da/97ef7458dde62fa918635bc21265d9f5.jpeg",
            "delivery_fee": 1.59,
            "cusine_types": "Coffee#Breakfast#Bakery",
            "price_ranges": "$",
            "city": "Manhattan",
            "state": "NY",
            "address": "10 Union Square East, New York, NY 10003",
            "lat": 40.734190,
            "lng": -73.989319
        },
        {  # 6
            "owner_id": 2,
            "name": "Taco Bell",
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/087213ee09a12d82eab4f192aa53b8cc/97ef7458dde62fa918635bc21265d9f5.jpeg",
            "delivery_fee": 1.29,
            "cusine_types": "Mexican#Burritos#Fast Food#Tacos#Breakfast",
            "price_ranges": "$",
            "city": "Redmond",
            "state": "WA",
            "address": "1960 148th Avenue N.E., Redmond, WA 98052",
            "lat": 47.634407,
            "lng": -122.131828
        },
    ]

    seed_restaurants = [db.session.add(
        Restaurant(**restaurant)) for restaurant in restaurants]
    db.session.commit()


def undo_restaurants():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.restaurants RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM restaurants"))

    db.session.commit()
