from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class OrderItem(db.Model):
    __tablename__ = 'orderitems'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("orders.id")), nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("menuitems.id")), nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)

    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now(), onupdate=func.now())

    # one-to-many
    menuitem = db.relationship("MenuItem", back_populates="orderitems")
    order = db.relationship("Order", back_populates="orderitems")

    # orderitem_likes = db.relationship(
    #     "OrderItemLike", back_populates="orderitem", cascade="all, delete-orphan")

    def to_dict(self):
        res = {
            'id': self.id,
            'order_id': self.order_id,
            'item_id': self.item_id,
            'quantity': self.quantity,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
        return res
