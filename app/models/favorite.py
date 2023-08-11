# from .db import db, environment, SCHEMA, add_prefix_for_prod

# favorites = db.Table('favorites', db.Model.metadata,
#                      db.Column('user_id', db.Integer, db.ForeignKey(
#                          add_prefix_for_prod("users.id")), primary_key=True),
#                      db.Column('restaurant_id', db.Integer, db.ForeignKey(
#                          add_prefix_for_prod("restaurants.id")), primary_key=True))

# if environment == "production":
#     favorites.schema = SCHEMA

from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class Favorite(db.Model):
    __tablename__ = 'favorites'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("restaurants.id")), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now(), onupdate=func.now())

    # one-to-many
    user = db.relationship('User', back_populates='favorites')
    restaurant = db.relationship('Restaurant', back_populates='favorites')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'restaurant_id': self.restaurant_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
