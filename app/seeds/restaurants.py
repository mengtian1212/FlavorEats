from app.models import db, Restaurant, environment, SCHEMA
from sqlalchemy.sql import text


def seed_restaurants():
    restaurants = [
        {  # 1
            "owner_id": 1,
            "name": "McDonald's",
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/41e448619de9527990482249b90f154c/3ac2b39ad528f8c8c5dc77c59abb683d.jpeg",
            "description": "McDonald's is a renowned global fast-food chain recognized for its affordable menu, featuring popular items like the Big Mac and Chicken McNuggets. ",
            "delivery_fee": 0.49,
            "cusine_types": "American#Fast Food#Burgers#Comfort Food#Coffee & Tea#Breakfast",
            "price_ranges": "$",
            "address": "26 E 23rd St, New York, NY 10010",
            "city": "New York",
            "state": "NY",
            "lat": 40.740166,
            "lng": -73.987967
        },
        {  # 2
            "owner_id": 1,
            "name": "Gyu-Kaku Japanese BBQ",
            "image_url": "https://d1ralsognjng37.cloudfront.net/ece58bad-1d56-4102-893c-a087f7897c39.jpeg",
            "description": "Gyu-Kaku is a renowned Japanese barbecue (yakiniku) restaurant that offers an interactive and flavorful dining experience. Originating from Japan, Gyu-Kaku invites diners to grill their own high-quality meats and vegetables right at their table, fostering a sense of fun and community. ",
            "delivery_fee": 1.99,
            "cusine_types": "Asian#Japanese#BBQ",
            "price_ranges": "$",
            "address": "34 Cooper Sq, New York, NY 10003",
            "city": "New York",
            "state": "NY",
            "lat": 40.727246,
            "lng": -73.992232
        },
        {  # 3
            "owner_id": 1,
            "name": "Shake Shack",
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/66e0f9d70b3fb76cbec9ec5203d4cfea/3ac2b39ad528f8c8c5dc77c59abb683d.jpeg",
            "description": "Shake Shack is an American fast casual restaurant chain based in New York City. It started out as a hot dog cart inside Madison Square Park in 2001, and its popularity steadily grew. ",
            "delivery_fee": 0.99,
            "cusine_types": "American#Fast Food#Burgers#Comfort Food#Ice cream#Dessert",
            "price_ranges": "$",
            "address": "23rd And Madison Avenue, New York, NY 10010",
            "city": "New York",
            "state": "NY",
            "lat": 40.741922,
            "lng": -73.986337
        },
        {  # 4
            "owner_id": 2,
            "name": "P.F. Chang's",
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/2892d0438d2d0db230564521ee2ac04b/3ac2b39ad528f8c8c5dc77c59abb683d.jpeg",
            "delivery_fee": 0,
            "cusine_types": "Chinese#Asian#Sushi#Gluten-free",
            "price_ranges": "$$",
            "address": "113 University Place, New York, NY 10003",
            "city": "New York",
            "state": "NY",
            "lat": 40.733773,
            "lng": -73.993939
        },
        {  # 5
            "owner_id": 1,
            "name": "Starbucks",
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/ab8e3f337605a518833ff1c0aebe10da/3ac2b39ad528f8c8c5dc77c59abb683d.jpeg",
            "delivery_fee": 1.59,
            "cusine_types": "Coffee & Tea#Breakfast#Dessert",
            "price_ranges": "$",
            "address": "10 Union Square East, New York, NY 10003",
            "city": "New York",
            "state": "NY",
            "lat": 40.734190,
            "lng": -73.989319
        },
        {  # 6
            "owner_id": 2,
            "name": "Taco Bell",
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/087213ee09a12d82eab4f192aa53b8cc/3ac2b39ad528f8c8c5dc77c59abb683d.jpeg",
            "delivery_fee": 1.29,
            "cusine_types": "Mexican#Burritos#Fast Food#Tacos#Breakfast",
            "price_ranges": "$",
            "address": "1960 148th Avenue N.E., Redmond, WA 98052",
            "city": "Redmond",
            "state": "WA",
            "lat": 47.634407,
            "lng": -122.131828
        },
        {  # 7
            "owner_id": 2,
            "name": "Panda Express",
            "image_url": "https://d1ralsognjng37.cloudfront.net/2c9841a7-c2e5-4202-bcb4-dc7cff46c668.jpeg",
            "delivery_fee": 1.49,
            "cusine_types": "Asian#Chinese#Vegetarian",
            "price_ranges": "$",
            "address": "414 Eighth Avenue, New York, NY 10001",
            "city": "New York",
            "state": "NY",
            "lat": 40.752320,
            "lng": -73.994640
        },
        {  # 8
            "owner_id": 2,
            "name": "Evergreens",
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/95d9b91355723d0fe9f80a96ff17944a/3ac2b39ad528f8c8c5dc77c59abb683d.jpeg",
            "delivery_fee": 0.99,
            "cusine_types": "Salads#Vegetarian#Healthy#Vegan#Gluten-free",
            "price_ranges": "$",
            "address": "10503 Ne 4th St, Bellevue, WA 98004",
            "city": "Bellevue",
            "state": "WA",
            "lat": 47.615880,
            "lng": -122.192130
        },
        {  # 9
            "owner_id": 3,
            "name": "Mediterranean Grill",
            "image_url": "https://duyt4h9nfnj50.cloudfront.net/resized/4b5b96a41c0399956cde3035209e087d-w2880-81.jpg",
            "delivery_fee": 2.29,
            "cusine_types": "Vegetarian#Halal#Fast Food",
            "price_ranges": "$",
            "address": "15253 Bel-Red Rd, Ste C, Bellevue, WA 98007",
            "city": "Bellevue",
            "state": "WA",
            "lat": 47.629225,
            "lng": -122.155993
        },
        {  # 10
            "owner_id": 3,
            "name": "Gluten Free Garden Pizza",
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/4c08bac83cd442fcb8da740d86061f56/3ac2b39ad528f8c8c5dc77c59abb683d.jpeg",
            "delivery_fee": 2.49,
            "cusine_types": "Pizza#American#Italian#Gluten-free",
            "price_ranges": "$",
            "address": "949 Ruff Dr, San Jose, CA 95110",
            "city": "San Jose",
            "state": "CA",
            "lat": 0,
            "lng": 0
        },
        {  # 11
            "owner_id": 4,
            "name": "Sharetea",
            "image_url": "https://d1ralsognjng37.cloudfront.net/f1b3f67d-583d-495c-a70d-01fd1de965a1.jpeg",
            "delivery_fee": 0.99,
            "cusine_types": "Asian#Dessert#Coffee & Tea",
            "price_ranges": "$",
            "address": "7325 166th Avenue Northeast, F130, Redmond, WA 98052",
            "city": "Redmond",
            "state": "WA",
            "lat": 0,
            "lng": 0
        },
        {  # 12
            "owner_id": 4,
            "name": "Mastro's Steakhouse",
            "image_url": "https://d1ralsognjng37.cloudfront.net/9e7abfa0-5b8c-40d2-b073-f068e7ce2fa1.jpeg",
            "delivery_fee": 6.99,
            "cusine_types": "American#Italian",
            "price_ranges": "$$$$",
            "address": "1285 Avenue Of The Americas, New York, NY 10019",
            "city": "New York",
            "state": "NY",
            "lat": 0,
            "lng": 0
        },
        {  # 13
            "owner_id": 4,
            "name": "MakiMaki",
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/db7d06e3bc76ba5795780c6268dfa8b5/c73ecc27d2a9eaa735b1ee95304ba588.jpeg",
            "delivery_fee": 3.99,
            "cusine_types": "Asian#Sushi#Japanese#Korean",
            "price_ranges": "$$$",
            "address": "350 Hudson Street, New York, NY 10014",
            "city": "New York",
            "state": "NY",
            "lat": 0,
            "lng": 0
        },
        {  # 14
            "owner_id": 4,
            "name": "Applebee's",
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/e89b16893e36f765fde687ad3d3a88cd/3ac2b39ad528f8c8c5dc77c59abb683d.jpeg",
            "delivery_fee": 2.59,
            "cusine_types": "American#Burgers#Salads#Dessert",
            "price_ranges": "$$$",
            "address": "234 W 42nd St, New York, NY 10036",
            "city": "New York",
            "state": "NY",
            "lat": 0,
            "lng": 0
        },
        {  # 15
            "owner_id": 4,
            "name": "The Lobster Place",
            "image_url": "https://d1ralsognjng37.cloudfront.net/425fc969-8196-4a03-b535-db9cf2f260c7.jpeg",
            "delivery_fee": 4.99,
            "cusine_types": "Sushi#American#Seafood",
            "price_ranges": "$$$",
            "address": "448 W 16th St, New York, NY 10011",
            "city": "New York",
            "state": "NY",
            "lat": 0,
            "lng": 0
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
