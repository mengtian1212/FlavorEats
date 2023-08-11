from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class OrderItemLike(db.Model):
    __tablename__ = 'orderitemlikes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    reviewer_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)

    order_item_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("orderitems.id")), nullable=False)

    is_like = db.Column(db.Boolean, nullable=False, default=1)

    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now(), onupdate=func.now())

    user = db.relationship(
        "User", back_populates="orderitem_likes")
    orderitem = db.relationship(
        "OrderItem", back_populates="orderitem_likes")

    def to_dict(self):
        res = {
            'id': self.id,
            'reviewer_id': self.reviewer_id,
            'order_item_id': self.order_item_id,
            'is_like': self.is_like,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
        return res
