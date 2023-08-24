from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', first_name='Demo', last_name='Lition', phone_number="1234567890", image_url="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/9538c4f1cb0d524a.svg", address="Empire State Building, 350 5th Ave, New York, NY 10118", zip="10118",
        lat=40.748817, lng=-73.985428, city="New York", state="NY")
    sheldon = User(
        username='Sheldon', email='sheldon@gmail.com', password='password', first_name='Sheldon', last_name='Cooper', phone_number="3141592653", image_url="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/544c3c3781e0db92.svg", address="Caltech, 1200 E California Blvd, Pasadena, CA 91125", zip="91125",
        lat=34.1379, lng=-118.1255, city="Pasadena", state="CA")
    penny = User(
        username='Penny', email='penny@gmail.com', password='password', first_name='Penny', last_name='Hofstadter', phone_number="5556667777", image_url="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/21f488d3249d6f03.svg", address="Space Needle, 400 Broad St, Seattle, WA 98109", zip="98109",
        lat=47.6205, lng=-122.3493, city="Seattle", state="WA")
    leonard = User(
        username='Leonard', email='leonard@gmail.com', password='password', first_name='Leonard', last_name='Hofstadter', phone_number="7776665555", image_url="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/d590fac5df89924d.svg", address="Bellevue Downtown Park, 10201 NE 4th St, Bellevue, WA 98004", zip="98004",
        lat=47.615875, lng=-122.19295, city="Bellevue", state="WA")
    raj = User(
        username='Raj', email='raj@gmail.com', password='password', first_name='Raj', last_name='Koothrappali', phone_number="1230001234", image_url="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/9f716d4b83f1173e.svg", address="Brooklyn Bridge, New York, NY 10038", zip="10038",
        lat=40.70608, lng=-73.99686, city="Brooklyn", state="NY")
    amy = User(
        username='Amy', email='amy@gmail.com', password='password', first_name='Amy', last_name='Fowler', phone_number="3141592654", image_url="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/76cd7fa5fcf22251.svg", address="Union Square, 333 Post St, San Francisco, CA 94108", zip="94108",
        lat=37.7879, lng=-122.4075, city="San Francisco", state="CA")

    user7 = User(
        username='user7', email='user7@gmail.com', password='password', first_name='user7', last_name='', phone_number="0000000000", image_url="", address="Bellevue Downtown Park, 10201 NE 4th St, Bellevue, WA 98004", zip="98004",
        lat=47.615875, lng=-122.19295, city="Bellevue", state="WA")

    user8 = User(
        username='user8', email='user8@gmail.com', password='password', first_name='user8', last_name='', phone_number="0000000000", image_url="", address="Bellevue Downtown Park, 10201 NE 4th St, Bellevue, WA 98004", zip="98004",
        lat=47.615875, lng=-122.19295, city="Bellevue", state="WA")

    user9 = User(
        username='user9', email='user9@gmail.com', password='password', first_name='user7', last_name='', phone_number="0000000000", image_url="", address="Bellevue Downtown Park, 10201 NE 4th St, Bellevue, WA 98004", zip="98004",
        lat=47.615875, lng=-122.19295, city="Bellevue", state="WA")

    user10 = User(
        username='user10', email='user10@gmail.com', password='password', first_name='user10', last_name='', phone_number="0000000000", image_url="", address="Bellevue Downtown Park, 10201 NE 4th St, Bellevue, WA 98004", zip="98004",
        lat=47.615875, lng=-122.19295, city="Bellevue", state="WA")

    user11 = User(
        username='user11', email='user11@gmail.com', password='password', first_name='user11', last_name='', phone_number="0000000000", image_url="", address="Bellevue Downtown Park, 10201 NE 4th St, Bellevue, WA 98004", zip="98004",
        lat=47.615875, lng=-122.19295, city="Bellevue", state="WA")

    user12 = User(
        username='user12', email='user12@gmail.com', password='password', first_name='user12', last_name='', phone_number="0000000000", image_url="", address="Bellevue Downtown Park, 10201 NE 4th St, Bellevue, WA 98004", zip="98004",
        lat=47.615875, lng=-122.19295, city="Bellevue", state="WA")

    user13 = User(
        username='user13', email='user13@gmail.com', password='password', first_name='user13', last_name='', phone_number="0000000000", image_url="", address="Bellevue Downtown Park, 10201 NE 4th St, Bellevue, WA 98004", zip="98004",
        lat=47.615875, lng=-122.19295, city="Bellevue", state="WA")

    user14 = User(
        username='user14', email='user14@gmail.com', password='password', first_name='user14', last_name='', phone_number="0000000000", image_url="", address="Bellevue Downtown Park, 10201 NE 4th St, Bellevue, WA 98004", zip="98004",
        lat=47.615875, lng=-122.19295, city="Bellevue", state="WA")

    user15 = User(
        username='user15', email='user15@gmail.com', password='password', first_name='user15', last_name='', phone_number="0000000000", image_url="", address="Bellevue Downtown Park, 10201 NE 4th St, Bellevue, WA 98004", zip="98004",
        lat=47.615875, lng=-122.19295, city="Bellevue", state="WA")

    db.session.add(demo)
    db.session.add(sheldon)
    db.session.add(penny)
    db.session.add(leonard)
    db.session.add(raj)
    db.session.add(amy)

    db.session.add(user7)
    db.session.add(user8)
    db.session.add(user9)
    db.session.add(user10)
    db.session.add(user11)
    db.session.add(user12)
    db.session.add(user13)
    db.session.add(user14)
    db.session.add(user15)

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
