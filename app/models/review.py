from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    reviewer_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)

    restaurant_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("restaurants.id")), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    message = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now(), onupdate=func.now())

    # one-to-many
    user = db.relationship("User", back_populates="reviews")
    restaurant = db.relationship("Restaurant", back_populates="reviews")

    def to_dict(self):
        res = {
            'id': self.id,
            'reviewer_id': self.reviwer_id,
            'restaurant_id': self.restaurant_id,
            'rating': self.rating,
            'message': self.message,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
