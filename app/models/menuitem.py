from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class MenuItem(db.Model):
    __tablename__ = 'menuitems'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("restaurants.id")), nullable=False)
    item_name = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Numeric(4, 2), nullable=False)
    image_url = db.Column(db.String(255), nullable=True)
    description = db.Column(db.String, nullable=True)
    item_type = db.Column(db.String, nullable=True)

    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now(), onupdate=func.now())

    # one-to-many
    restaurant = db.relationship("Restaurant", back_populates="menuitems")
    orderitems = db.relationship(
        "OrderItem", back_populates="menuitem", cascade="all, delete-orphan")

    def to_dict(self):
        res = {
            'id': self.id,
            'restaurant_id': self.restaurant_id,
            'item_name': self.item_name,
            'price': self.price,
            'image_url': self.image_url,
            'description': self.description,
            'item_type': self.item_type,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
        return res
