from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', first_name='Demo', last_name='Lition', phone_number="1234567890", image_url="https://m.media-amazon.com/images/I/51K9YDu2QZL._SX522_.jpg", city="Manhattan", state="NY")
    sheldon = User(
        username='Sheldon', email='sheldon@gmail.com', password='password', first_name='Sheldon', last_name='Cooper', phone_number="3141592653", image_url="https://the-big-bang-theory.com/images/uploads/5/rs_3463ec66edb459bd1dd.jpg", city="San Jose", state="CA")
    penny = User(
        username='Penny', email='penny@gmail.com', password='password', first_name='Penny', last_name='Hofstadter', phone_number="5556667777", image_url="https://the-big-bang-theory.com/images/uploads/3/rs_304c3dd3b937df81cac.jpg", city="Seattle", state="WA")
    leonard = User(
        username='Leonard', email='leonard@gmail.com', password='password', first_name='Leonard', last_name='Hofstadter', phone_number="7776665555", image_url="https://the-big-bang-theory.com/images/uploads/2/rs_1365ce5b16123fd10b8.jpg", city="Bellevue", state="WA")
    raj = User(
        username='Raj', email='raj@gmail.com', password='password', first_name='Raj', last_name='Koothrappali', phone_number="1230001234", image_url="https://the-big-bang-theory.com/images/uploads/2/rs_35619e852e696869058.jpg", city="Brooklyn", state="NY")

    db.session.add(demo)
    db.session.add(sheldon)
    db.session.add(penny)
    db.session.add(leonard)
    db.session.add(raj)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
