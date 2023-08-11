from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text


def seed_reviews():
    reviews = [
        {"reviewer_id": 2, "restaurant_id": 1, "rating": 4,
         "message": "Nobody at a fast food restaurant treats you like the only customer they care about, but here, that's how you feel. Drive Thru attentive, no mistakes on my order at this location, and they don't push you about meals and drinks. They let you order at your comfort and convenience. This is how it should be."},
        {"reviewer_id": 3, "restaurant_id": 1, "rating": 5,
         "message": "McDonald's is my go-to spot for a quick and satisfying meal. The classic Big Mac never disappoints, and their fries are always perfectly crispy. Fast service and a reliable menu make it a comfort food haven!"},
        {"reviewer_id": 4, "restaurant_id": 1, "rating": 2,
         "message": "Visited this McDonald's during lunchtime, and the long lines were a bit overwhelming. It took quite a while to get my order, and the restaurant was a bit messy. They could use some better organization during peak hours."},
        {"reviewer_id": 2, "restaurant_id": 1, "rating": 4,
         "message": "I appreciate that McDonald's offers healthier options now. The salads are surprisingly good, and the yogurt parfaits are a guilt-free treat. It's nice to have choices beyond the usual fast-food fare."},
        {"reviewer_id": 5, "restaurant_id": 1, "rating": 3,
         "message": "Stopped by McDonald's for a quick bite, and while the service was speedy, my order was a bit mixed up. The staff, however, were very apologetic and quickly fixed the issue. Kudos for the great customer service."},
        {"reviewer_id": 6, "restaurant_id": 1, "rating": 4,
         "message": "The delivery was surprisingly fast, and my Big Mac combo arrived still warm and delicious. "},

        {"reviewer_id": 2, "restaurant_id": 3, "rating": 5,
         "message": "Had a fantastic time at Gyu-Karu! The ambiance is modern and inviting, and the waitstaff is attentive. The assortment of meats and veggies for grilling satisfied both meat lovers and vegetarians in our group."},
        {"reviewer_id": 6, "restaurant_id": 3, "rating": 4,
         "message": "Gyu-Karu never disappoints! The sizzle of meat on the grill and the aroma of the sauces create an immersive dining experience. The variety of dipping sauces adds a personalized touch to each bite. A must-visit for BBQ lovers!"},

        {"reviewer_id": 1, "restaurant_id": 4, "rating": 4,
            "message": "Haven't had in a decade and still tastes delicious!"},
        {"reviewer_id": 1, "restaurant_id": 6, "rating": 5,
            "message": "Good food"},
    ]

    seed_reviews = [db.session.add(
        Review(**review)) for review in reviews]
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
