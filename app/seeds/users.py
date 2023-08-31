from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text

user_images = [
    "https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/9538c4f1cb0d524a.svg",  # demo     user8
    "https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/544c3c3781e0db92.svg",  # sheldon  user9
    "https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/21f488d3249d6f03.svg",  # penny    user10
    "https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/d590fac5df89924d.svg",  # leonard  user11
    "https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/9f716d4b83f1173e.svg",  # raj      user12
    # amy      user13   user15
    "https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/76cd7fa5fcf22251.svg",
    "https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/d96375ed3fb7384c.svg",  # user7    user14
]


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', first_name='Demo', last_name='Lition', phone_number="1234567890", image_url="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/9538c4f1cb0d524a.svg", address="Empire State Building, 350 5th Ave, New York, NY 10118", zip="10118",
        lat=40.7488177, lng=-73.9854285, city="New York", state="NY")
    sheldon = User(
        username='Sheldon', email='sheldon@gmail.com', password='password', first_name='Sheldon', last_name='Cooper', phone_number="3141592653", image_url="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/544c3c3781e0db92.svg", address="Caltech, 1200 E California Blvd, Pasadena, CA 91125", zip="91125",
        lat=34.1365586, lng=-118.1255305, city="Pasadena", state="CA")
    penny = User(
        username='Penny', email='penny@gmail.com', password='password', first_name='Penny', last_name='Hofstadter', phone_number="5556667777", image_url="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/21f488d3249d6f03.svg", address="Space Needle, 400 Broad St, Seattle, WA 98109", zip="98109",
        lat=47.6207075, lng=-122.3475196, city="Seattle", state="WA")
    leonard = User(
        username='Leonard', email='leonard@gmail.com', password='password', first_name='Leonard', last_name='Hofstadter', phone_number="7776665555", image_url="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/d590fac5df89924d.svg", address="Bellevue Downtown Park, 10201 NE 4th St, Bellevue, WA 98004", zip="98004",
        lat=47.6148431, lng=-122.1910512, city="Bellevue", state="WA")
    raj = User(
        username='Raj', email='raj@gmail.com', password='password', first_name='Raj', last_name='Koothrappali', phone_number="1230001234", image_url="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/9f716d4b83f1173e.svg", address="Baruch College, 55 Lexington Ave, New York, NY 10010", zip="10010",
        lat=40.740661, lng=-73.983382, city="New York", state="NY")
    amy = User(
        username='Amy', email='amy@gmail.com', password='password', first_name='Amy', last_name='Fowler', phone_number="3141592654", image_url="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/76cd7fa5fcf22251.svg", address="Union Square, 333 Post St, San Francisco, CA 94108", zip="94108",
        lat=37.788653, lng=-122.407750, city="San Francisco", state="CA")

    user7 = User(
        username='John', email='john@gmail.com', password='password', first_name='John', last_name='Smith', phone_number="0000000000", image_url="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/d96375ed3fb7384c.svg", address="Bellevue Downtown Park, 10201 NE 4th St, Bellevue, WA 98004", zip="98004",
        lat=47.6148431, lng=-122.1910512, city="Bellevue", state="WA")

    user8 = User(
        username='Emily', email='emily@gmail.com', password='password', first_name='Emily', last_name='Johnson', phone_number="0000000000", image_url="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/9538c4f1cb0d524a.svg", address="Bellevue Downtown Park, 10201 NE 4th St, Bellevue, WA 98004", zip="98004",
        lat=47.6148431, lng=-122.1910512, city="Bellevue", state="WA")

    user9 = User(
        username='Michael', email='michael@gmail.com', password='password', first_name='Michael', last_name='Williams', phone_number="0000000000", image_url="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/544c3c3781e0db92.svg", address="Bellevue Downtown Park, 10201 NE 4th St, Bellevue, WA 98004", zip="98004",
        lat=47.6148431, lng=-122.1910512, city="Bellevue", state="WA")

    user10 = User(
        username='Olivia', email='olivia@gmail.com', password='password', first_name='Olivia', last_name='Jones', phone_number="0000000000", image_url="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/21f488d3249d6f03.svg", address="Bellevue Downtown Park, 10201 NE 4th St, Bellevue, WA 98004", zip="98004",
        lat=47.6148431, lng=-122.1910512, city="Bellevue", state="WA")

    user11 = User(
        username='William', email='william@gmail.com', password='password', first_name='William', last_name='Brown', phone_number="0000000000", image_url="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/d590fac5df89924d.svg", address="Bellevue Downtown Park, 10201 NE 4th St, Bellevue, WA 98004", zip="98004",
        lat=47.6148431, lng=-122.1910512, city="Bellevue", state="WA")

    user12 = User(
        username='Ava', email='ava@gmail.com', password='password', first_name='Ava', last_name='Davis', phone_number="0000000000", image_url="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/9f716d4b83f1173e.svg", address="Bellevue Downtown Park, 10201 NE 4th St, Bellevue, WA 98004", zip="98004",
        lat=47.6148431, lng=-122.1910512, city="Bellevue", state="WA")

    user13 = User(
        username='Sophia', email='sophia@gmail.com', password='password', first_name='Sophia', last_name='Wilson', phone_number="0000000000", image_url="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/76cd7fa5fcf22251.svg", address="Bellevue Downtown Park, 10201 NE 4th St, Bellevue, WA 98004", zip="98004",
        lat=47.6148431, lng=-122.1910512, city="Bellevue", state="WA")

    user14 = User(
        username='Robert', email='robert@gmail.com', password='password', first_name='Robert', last_name='Moore', phone_number="0000000000", image_url="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/d96375ed3fb7384c.svg", address="Bellevue Downtown Park, 10201 NE 4th St, Bellevue, WA 98004", zip="98004",
        lat=47.6148431, lng=-122.1910512, city="Bellevue", state="WA")

    user15 = User(
        username='Mia', email='mia@gmail.com', password='password', first_name='Mia', last_name='Taylor', phone_number="0000000000", image_url="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/76cd7fa5fcf22251.svg", address="Bellevue Downtown Park, 10201 NE 4th St, Bellevue, WA 98004", zip="98004",
        lat=47.6148431, lng=-122.1910512, city="Bellevue", state="WA")

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
