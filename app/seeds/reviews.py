from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text


def seed_reviews():
    reviews = [
        {"reviewer_id": 2, "restaurant_id": 1, "rating": 4,
         "message": "Nobody at a fast food restaurant treats you like the only customer they care about, but here, that's how you feel. Drive Thru attentive, no mistakes on my order at this location, and they don't push you about meals and drinks. They let you order at your comfort and convenience. This is how it should be."},
        {"reviewer_id": 1, "restaurant_id": 1, "rating": 5,
         "message": "McDonald's is my go-to spot for a quick and satisfying meal. The classic Big Mac never disappoints, and their fries are always perfectly crispy. Fast service and a reliable menu make it a comfort food haven!"},
        {"reviewer_id": 4, "restaurant_id": 1, "rating": 2,
         "message": "Visited this McDonald's during lunchtime, and the long lines were a bit overwhelming. It took quite a while to get my order, and the restaurant was a bit messy. They could use some better organization during peak hours."},
        {"reviewer_id": 2, "restaurant_id": 1, "rating": 4,
         "message": "I appreciate that McDonald's offers healthier options now. The salads are surprisingly good, and the yogurt parfaits are a guilt-free treat. It's nice to have choices beyond the usual fast-food fare."},
        {"reviewer_id": 5, "restaurant_id": 1, "rating": 3,
         "message": "Stopped by McDonald's for a quick bite, and while the service was speedy, my order was a bit mixed up. The staff, however, were very apologetic and quickly fixed the issue. Kudos for the great customer service."},
        {"reviewer_id": 6, "restaurant_id": 1, "rating": 4,
         "message": "The delivery was surprisingly fast, and my Big Mac combo arrived still warm and delicious. "},

        {"reviewer_id": 2, "restaurant_id": 2, "rating": 5,
         "message": "Had a fantastic time at Gyu-Karu! The ambiance is modern and inviting, and the waitstaff is attentive. The assortment of meats and veggies for grilling satisfied both meat lovers and vegetarians in our group."},
        {"reviewer_id": 1, "restaurant_id": 2, "rating": 2,
         "message": "The BBQ meats were dry and lacked the tenderness I had experienced before. Hopefully, they can improve the consistency of their delivery orders."},
        {"reviewer_id": 6, "restaurant_id": 2, "rating": 4,
         "message": "Gyu-Karu never disappoints! The sizzle of meat on the grill and the aroma of the sauces create an immersive dining experience. The variety of dipping sauces adds a personalized touch to each bite. A must-visit for BBQ lovers!"},
        {"reviewer_id": 4, "restaurant_id": 2, "rating": 5,
         "message": "A great option for those craving high-quality Japanese BBQ without leaving home!"},
        {"reviewer_id": 9, "restaurant_id": 2, "rating": 2,
         "message": "The food arrived late, and unfortunately, the quality didn't match up to my expectations."},

        {"reviewer_id": 9, "restaurant_id": 3, "rating": 3,
         "message": "Great service but long line wait"},
        {"reviewer_id": 1, "restaurant_id": 3, "rating": 4,
         "message": "Loved the convenience of location and ordering to go. Hamburgers were delicious."},
        {"reviewer_id": 14, "restaurant_id": 3, "rating": 5,
         "message": "Fast delivery and excellent burger and frozen vanilla custard."},
        {"reviewer_id": 10, "restaurant_id": 3, "rating": 1,
         "message": "Never delivered. Takes forever."},

        {"reviewer_id": 1, "restaurant_id": 4, "rating": 4,
            "message": "Haven't had in a decade and still tastes delicious!"},
        {"reviewer_id": 3, "restaurant_id": 4, "rating": 3,
         "message": "I wish my food was a little hotter upon arrival, but the food was still delicious. Thanks"},
        {"reviewer_id": 12, "restaurant_id": 4, "rating": 5,
         "message": "The delivery person was speedy and nice."},

        {"reviewer_id": 1, "restaurant_id": 5, "rating": 5,
         "message": "Best Americana hot or cold anywhere!"},
        {"reviewer_id": 4, "restaurant_id": 5, "rating": 5,
         "message": "Absolutely love Starbucks! Their coffee is always consistent and the staff is friendly. My go-to place for my daily caffeine fix"},
        {"reviewer_id": 1, "restaurant_id": 5, "rating": 2,
         "message": "Disappointed with my recent experience at Starbucks. The latte I ordered was lukewarm and tasted watered down. Hope they improve their quality control."},
        {"reviewer_id": 5, "restaurant_id": 5, "rating": 4,
         "message": "Their mobile ordering is convenient, and the drinks are usually prepared well. Sometimes the wait can be long during peak hours."},
        {"reviewer_id": 3, "restaurant_id": 5, "rating": 5,
         "message": "Starbucks has a wide variety of delicious drinks. Their caramel macchiato is my favorite. The service is usually fast, and I appreciate their cozy atmosphere."},

        {"reviewer_id": 8, "restaurant_id": 6, "rating": 4,
         "message": "It's close and easy to order and fast delivery."},
        {"reviewer_id": 1, "restaurant_id": 6, "rating": 5,
         "message": "Fantastic. Fresh and hot."},
        {"reviewer_id": 11, "restaurant_id": 6, "rating": 5,
         "message": "Taco Tuesday!!!"},

        {"reviewer_id": 1, "restaurant_id": 7, "rating": 5,
         "message": "Delicious and Quick! Panda Express on Uber Eats never disappoints. The orange chicken is always crispy and flavorful, and the chow mein is the perfect balance of noodles and veggies. It arrived hot and fresh, and the delivery was faster than expected. Definitely my go-to for a satisfying Chinese food craving."},
        {"reviewer_id": 7, "restaurant_id": 7, "rating": 4,
         "message": "Quick and Tasty! Panda Express on Uber Eats is my guilty pleasure. The Kung Pao Chicken has the right amount of kick, and the Beijing Beef is sweet and savory in every bite. "},
        {"reviewer_id": 13, "restaurant_id": 7, "rating": 4,
         "message": "Flavorful Options, Slightly Delayed. The food from Panda Express is always packed with flavor, and their variety is impressive. However, my recent order through Uber Eats arrived about 15 minutes later than the estimated time, which resulted in the food being a bit cooler than I would have liked. "},

        {"reviewer_id": 2, "restaurant_id": 8, "rating": 4,
         "message": "The salad here is very fresh and delicious. My go to lunch place :)"},
        {"reviewer_id": 1, "restaurant_id": 8, "rating": 4,
         "message": "I love this place. The quality of the food and ingredients is exceptional, and the flavor combinations and variety are amazing. Happily ordering again."},
        {"reviewer_id": 6, "restaurant_id": 8, "rating": 1,
         "message": "Terrible Salad Experience. I ordered a salad through Uber Eats from this place, and it was a huge disappointment. "},
        {"reviewer_id": 11, "restaurant_id": 8, "rating": 2,
         "message": "I had high hopes for a healthy meal when I ordered a salad, but unfortunately, it fell short of my expectations. The portion was small, and the ingredients didn't seem very fresh."},

        {"reviewer_id": 1, "restaurant_id": 9, "rating": 5,
         "message": "The place I went a hundread times during my coding bootcamp. Lots of memories. Thank you!"},
        {"reviewer_id": 2, "restaurant_id": 9, "rating": 4,
         "message": "The Adana Kebab is beautifully seasoned and the hummus is just sooooo good, it's light in flavor compared to store-bought."},
        {"reviewer_id": 10, "restaurant_id": 9, "rating": 3,
         "message": "Not Impressed. The salad I received from this place via Uber Eats was just okay. "},


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
