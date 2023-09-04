from app.models import db, Restaurant, environment, SCHEMA
from sqlalchemy.sql import text


def seed_restaurants():
    restaurants = [
        {  # 1  new york
            "owner_id": 1,
            "name": "McDonald's",
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/41e448619de9527990482249b90f154c/3ac2b39ad528f8c8c5dc77c59abb683d.jpeg",
            "description": "McDonald's is a renowned global fast-food chain recognized for its affordable menu, featuring popular items like the Big Mac and Chicken McNuggets. ",
            "delivery_fee": 0.49,
            "cusine_types": "American#Fast Food#Burgers#Comfort Food#Breakfast#Dessert",
            "price_ranges": "$",
            "address": "26 E 23rd St, New York, NY 10010",
            "city": "New York",
            "state": "NY",
            "lat": 40.7406637,
            "lng": -73.9878848
        },
        {  # 2   new york
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
            "lat": 40.7275287,
            "lng": -73.9925333
        },
        {  # 3   new york
            "owner_id": 2,
            "name": "Shake Shack",
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/66e0f9d70b3fb76cbec9ec5203d4cfea/3ac2b39ad528f8c8c5dc77c59abb683d.jpeg",
            "description": "Shake Shack is an American fast casual restaurant chain based in New York City. It started out as a hot dog cart inside Madison Square Park in 2001, and its popularity steadily grew. ",
            "delivery_fee": 0.99,
            "cusine_types": "American#Fast Food#Burgers#Comfort Food#Ice cream#Dessert",
            "price_ranges": "$",
            "address": "23rd And Madison Avenue, New York, NY 10010",
            "city": "New York",
            "state": "NY",
            "lat": 40.7413836,
            "lng": -73.9864856
        },
        {  # 4   new york
            "owner_id": 1,
            "name": "P.F. Chang's",
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/2892d0438d2d0db230564521ee2ac04b/3ac2b39ad528f8c8c5dc77c59abb683d.jpeg",
            "delivery_fee": 0,
            "cusine_types": "Chinese#Asian#Sushi#Gluten-free",
            "price_ranges": "$$",
            "address": "113 University Place, New York, NY 10003",
            "city": "New York",
            "state": "NY",
            "lat": 40.7330491,
            "lng": -73.9949616
        },
        {  # 5  new york
            "owner_id": 1,
            "name": "Starbucks",
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/ab8e3f337605a518833ff1c0aebe10da/3ac2b39ad528f8c8c5dc77c59abb683d.jpeg",
            "delivery_fee": 1.59,
            "cusine_types": "Coffee & Tea#Breakfast#Dessert",
            "price_ranges": "$",
            "address": "10 Union Square East, New York, NY 10003",
            "city": "New York",
            "state": "NY",
            "lat": 40.7351506,
            "lng": -73.9917738
        },
        {  # 6   seattle
            "owner_id": 2,
            "name": "Taco Bell",
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/087213ee09a12d82eab4f192aa53b8cc/3ac2b39ad528f8c8c5dc77c59abb683d.jpeg",
            "delivery_fee": 1.29,
            "cusine_types": "Mexican#Burritos#Fast Food#Tacos#Breakfast#Pizza",
            "price_ranges": "$",
            "address": "1960 148th Avenue N.E., Redmond, WA 98052",
            "city": "Redmond",
            "state": "WA",
            "lat": 47.6310725,
            "lng": -122.1341079
        },
        {  # 7  new york
            "owner_id": 2,
            "name": "Panda Express",
            "image_url": "https://d1ralsognjng37.cloudfront.net/2c9841a7-c2e5-4202-bcb4-dc7cff46c668.jpeg",
            "delivery_fee": 1.49,
            "cusine_types": "Asian#Chinese#Vegetarian",
            "price_ranges": "$",
            "address": "414 Eighth Avenue, New York, NY 10001",
            "city": "New York",
            "state": "NY",
            "lat": 40.7528154,
            "lng": -73.9950309
        },
        {  # 8   seattle
            "owner_id": 2,
            "name": "Evergreens",
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/95d9b91355723d0fe9f80a96ff17944a/3ac2b39ad528f8c8c5dc77c59abb683d.jpeg",
            "delivery_fee": 0.99,
            "cusine_types": "Salads#Vegetarian#Healthy#Vegan#Gluten-free#Dessert",
            "price_ranges": "$",
            "address": "10503 Ne 4th St, Bellevue, WA 98004",
            "city": "Bellevue",
            "state": "WA",
            "lat": 47.6149382,
            "lng": -122.1940891
        },
        {  # 9  seattle
            "owner_id": 3,
            "name": "Mediterranean Grill",
            "image_url": "https://duyt4h9nfnj50.cloudfront.net/resized/4b5b96a41c0399956cde3035209e087d-w2880-81.jpg",
            "delivery_fee": 2.29,
            "cusine_types": "Vegetarian#Halal#Fast Food#Vegan#Dessert#Salads",
            "price_ranges": "$",
            "address": "15253 Bel-Red Rd, Ste C, Bellevue, WA 98007",
            "city": "Bellevue",
            "state": "WA",
            "lat":  47.6176931,
            "lng": -122.1940891
        },
        {  # 10  san jose
            "owner_id": 3,
            "name": "Gluten Free Garden Pizza",
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/4c08bac83cd442fcb8da740d86061f56/3ac2b39ad528f8c8c5dc77c59abb683d.jpeg",
            "delivery_fee": 2.49,
            "cusine_types": "Pizza#American#Italian#Gluten-free#Salads",
            "price_ranges": "$",
            "address": "949 Ruff Dr, San Jose, CA 95110",
            "city": "San Jose",
            "state": "CA",
            "lat": 37.3605573,
            "lng": -121.8911417
        },
        {  # 11  seattle
            "owner_id": 4,
            "name": "Sharetea",
            "image_url": "https://d1ralsognjng37.cloudfront.net/f1b3f67d-583d-495c-a70d-01fd1de965a1.jpeg",
            "delivery_fee": 0.99,
            "cusine_types": "Asian#Dessert#Coffee & Tea",
            "price_ranges": "$",
            "address": "7325 166th Avenue Northeast, F130, Redmond, WA 98052",
            "city": "Redmond",
            "state": "WA",
            "lat": 47.6712195,
            "lng": -122.1249384
        },
        {  # 12  new york
            "owner_id": 4,
            "name": "Mastro's Steakhouse",
            "image_url": "https://d1ralsognjng37.cloudfront.net/9e7abfa0-5b8c-40d2-b073-f068e7ce2fa1.jpeg",
            "delivery_fee": 6.99,
            "cusine_types": "American#Italian#Salads#Seafood",
            "price_ranges": "$$$$",
            "address": "1285 Avenue Of The Americas, New York, NY 10019",
            "city": "New York",
            "state": "NY",
            "lat": 40.7616784,
            "lng": -73.9790489
        },
        {  # 13  new york
            "owner_id": 4,
            "name": "MakiMaki",
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/db7d06e3bc76ba5795780c6268dfa8b5/c73ecc27d2a9eaa735b1ee95304ba588.jpeg",
            "delivery_fee": 3.99,
            "cusine_types": "Asian#Sushi#Japanese#Korean#Seaffod",
            "price_ranges": "$$$",
            "address": "350 Hudson Street, New York, NY 10014",
            "city": "New York",
            "state": "NY",
            "lat": 47.4370272,
            "lng": -122.1979131
        },
        {  # 14  seattle
            "owner_id": 4,
            "name": "Applebee's",
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/e89b16893e36f765fde687ad3d3a88cd/3ac2b39ad528f8c8c5dc77c59abb683d.jpeg",
            "delivery_fee": 2.59,
            "cusine_types": "American#Burgers#Salads#Dessert#Seafood",
            "price_ranges": "$$$",
            "address": "375 S Grady Way, Renton, WA 98057",
            "city": "Renton",
            "state": "WA",
            "lat": 47.4637277,
            "lng": -122.2209327
        },
        {  # 15  new york
            "owner_id": 4,
            "name": "The Lobster Place",
            "image_url": "https://d1ralsognjng37.cloudfront.net/425fc969-8196-4a03-b535-db9cf2f260c7.jpeg",
            "delivery_fee": 4.99,
            "cusine_types": "Sushi#American#Seafood",
            "price_ranges": "$$$",
            "address": "448 W 16th St, New York, NY 10011",
            "city": "New York",
            "state": "NY",
            "lat": 40.7423997,
            "lng": -74.0073088
        },
        {  # 16  san jose
            "owner_id": 3,
            "name": "Red Hot Chilli Pepper",
            "image_url": "https://d1ralsognjng37.cloudfront.net/e154613d-88dc-4483-b674-de0026d786c2.jpeg",
            "delivery_fee": 2.99,
            "cusine_types": "Asian#Indian#Chinese#Halal#Vegetarian",
            "price_ranges": "$$",
            "address": "43321 Boscell Rd, Fremont, CA 94538",
            "city": "Fremont",
            "state": "CA",
            "lat": 37.493499,
            "lng": -121.940184
        },
        {  # 17  san jose
            "owner_id": 3,
            "name": "Curry Pizza House",
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/38b0133691c9fa26fd010eb799634407/c73ecc27d2a9eaa735b1ee95304ba588.jpeg",
            "delivery_fee": 0.99,
            "cusine_types": "Indian#Pizza#Fast Food#Vegetarian",
            "price_ranges": "$$",
            "address": "1806 Milmont Dr, Milpitas, CA 95035",
            "city": "Milpitas",
            "state": "CA",
            "lat": 37.422336,
            "lng": -121.915497
        },
        {  # 18  san jose
            "owner_id": 4,
            "name": "Chipotle Mexican Grill",
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/89897a7b8a8f6e6bb58837a05b7a09b2/3ac2b39ad528f8c8c5dc77c59abb683d.jpeg",
            "delivery_fee": 0.99,
            "cusine_types": "Healthy#Mexican#Fast Food",
            "price_ranges": "$",
            "address": "4180 N 1st St Unit 60, San Jose, CA 95134",
            "city": "San Jose",
            "state": "CA",
            "lat": 37.414107,
            "lng": -121.974332
        },
        {  # 19  san jose
            "owner_id": 1,
            "name": "Inchin's Bamboo Garden",
            "image_url": "https://d1ralsognjng37.cloudfront.net/ab923441-03f8-431c-9b58-00587a5c9ddb.jpeg",
            "delivery_fee": 3.99,
            "cusine_types": "Asian#Chinese#Indian#Gluten-free",
            "price_ranges": "$$",
            "address": "55 River Oaks Pl, San Jose, CA 95134",
            "city": "San Jose",
            "state": "CA",
            "lat": 37.408866,
            "lng": -121.935649
        },
        {  # 20  san jose
            "owner_id": 4,
            "name": "Mas Veggies Vegan Taqueria",
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/9d3c0dd42711986a659d825f7070325f/3ac2b39ad528f8c8c5dc77c59abb683d.jpeg",
            "delivery_fee": 2.69,
            "cusine_types": "American#Healthy#Vegetarian#Mexican#Comfort Food#Vegan#Burritos",
            "price_ranges": "$$",
            "address": "3055 Olin Ave, San Jose, CA 95128",
            "city": "San Jose",
            "state": "CA",
            "lat": 37.325784,
            "lng": -121.925177
        },
        {  # 21  san jose
            "owner_id": 1,
            "name": "Paris Baguette",
            "image_url": "https://d1ralsognjng37.cloudfront.net/1876a388-e376-417d-827f-b6eb2fc1b243.jpeg",
            "delivery_fee": 1.99,
            "cusine_types": "Dessert#Bakery#Asian#Coffee & Tea#Breakfast",
            "price_ranges": "$$",
            "address": "249 W Calaveras Blvd, Milpitas, CA 95035",
            "city": "Milpitas",
            "state": "CA",
            "lat": 37.428783,
            "lng": -121.918631
        },
        {  # 22  san jose
            "owner_id": 1,
            "name": "Moonbowls",
            "image_url": "https://d1ralsognjng37.cloudfront.net/58bbf870-5470-4812-bcea-6ec1f893c9d6.jpeg",
            "delivery_fee": 2.29,
            "cusine_types": "Healthy#Asian#Vegan#Gluten-free#Korean#Vegetarian#Salads#Dessert",
            "price_ranges": "$$",
            "address": "949 Ruff Drive, San Jose, CA 95110",
            "city": "San Jose",
            "state": "CA",
            "lat": 37.344940,
            "lng": -121.897950
        },
        {  # 23  la
            "owner_id": 1,
            "name": "Caffe Roma",
            "image_url": "https://duyt4h9nfnj50.cloudfront.net/resized/1525961969839-w2880-ac.jpg",
            "delivery_fee": 5.50,
            "cusine_types": "Italian#European#Pizza#Salads#Seafood",
            "price_ranges": "$$$$",
            "address": "350 N Canon Dr Ste 13, Beverly Hills, CA 90210",
            "city": "Beverly Hills",
            "state": "CA",
            "lat": 34.070682,
            "lng": -118.402292
        },
        {  # 24  la
            "owner_id": 2,
            "name": "Star of India Tandoori Restaurant",
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/1817bc23a91288066edacdde13341628/df577d3a0807d3bb859f2fb53aefcd86.jpeg",
            "delivery_fee": 3.79,
            "cusine_types": "Halal#Vegan#Vegetarian#Healthy#Indian#Asian#Seafood",
            "price_ranges": "$$$",
            "address": "730 Vine St, Los Angeles, CA 90038",
            "city": "Los Angeles",
            "state": "CA",
            "lat": 34.083753,
            "lng": -118.326449
        },
        {  # 25  la
            "owner_id": 2,
            "name": "ORGANICO Breakfast",
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/974e0173eb95b5a35f0efe4b9230fac3/3ac2b39ad528f8c8c5dc77c59abb683d.jpeg",
            "delivery_fee": 0.00,
            "cusine_types": "Breakfast#American#Coffee & Tea#Dessert",
            "price_ranges": "$$",
            "address": "2210 Sawtelle Boulevard, Los Angeles, CA 90064",
            "city": "Los Angeles",
            "state": "CA",
            "lat": 34.034418,
            "lng": -118.431976
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
