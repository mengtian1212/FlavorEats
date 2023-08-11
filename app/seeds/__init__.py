from flask.cli import AppGroup
from .users import seed_users, undo_users
from .restaurants import seed_restaurants, undo_restaurants
from .menuitems import seed_menuitems, undo_menuitems
from .orders import seed_orders, undo_orders
from .orderitems import seed_orderitems, undo_orderitems
from .reviews import seed_reviews, undo_reviews
from .favorites import seed_favorites, undo_favorites
from .menuitemlikes import seed_menuitemlikes, undo_menuitemlikes

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_menuitemlikes()
        undo_favorites()
        undo_reviews()
        undo_orderitems()
        undo_orders()
        undo_menuitems()
        undo_restaurants()
        undo_users()
    seed_users()
    seed_restaurants()
    seed_menuitems()
    seed_orders()
    seed_orderitems()
    seed_reviews()
    seed_favorites()
    seed_menuitemlikes()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_restaurants()
    undo_menuitems()
    undo_orders()
    undo_orderitems()
    undo_reviews()
    undo_favorites()
    undo_menuitemlikes()
