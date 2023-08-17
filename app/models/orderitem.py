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
            'item_id': self.item_id,
            "item_name": self.menuitem.item_name,
            'quantity': self.quantity,
            "item_price": float(self.menuitem.price),
            "item_subtotal": float(self.menuitem.price) * self.quantity,
            "image_url": self.menuitem.image_url,
            'order_id': self.order_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            # 'description': self.menuitem.description,
            # 'calory': self.menuitem.calory,
            # 'like_ratio': self.menuitem.calculate_like_dislike_ratio(),
            # 'num_likes': sum(1 for like in self.menuitem.menuitem_likes if like.is_like)
        }
        return res
