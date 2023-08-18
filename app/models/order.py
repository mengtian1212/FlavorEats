from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class Order(db.Model):
    __tablename__ = 'orders'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("restaurants.id")), nullable=False)
    tip = db.Column(db.Numeric(4, 2), nullable=False, default=0)
    is_pickup = db.Column(db.Boolean, nullable=False, default=0)
    is_priority = db.Column(db.Boolean, nullable=False, default=False)
    is_complete = db.Column(db.Boolean, nullable=False, default=False)
    delivery_address = db.Column(db.String(255), nullable=True)
    delivery_lat = db.Column(db.Integer, nullable=True)
    delivery_lng = db.Column(db.Integer, nullable=True)

    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now(), onupdate=func.now())

    # one-to-many
    user = db.relationship("User", back_populates="orders")
    restaurant = db.relationship("Restaurant", back_populates="orders")
    orderitems = db.relationship(
        "OrderItem", back_populates="order", cascade="all, delete-orphan")

    def calculate_num_items(self):
        num_items = 0
        for item in self.orderitems:
            num_items += item.quantity
        return num_items

    def calculate_total_price(self):
        total_price = 0
        for item in self.orderitems:
            curr = item.quantity * item.menuitem.price
            total_price += curr
        tip = float(self.tip) if self.is_pickup == False else 0
        priority_fee = float(2.99) if self.is_priority else 0
        return float(total_price) + float(self.restaurant.delivery_fee) + tip + priority_fee

    def calculate_subtotal(self):
        subtotal = 0
        for item in self.orderitems:
            curr = item.quantity * item.menuitem.price
            subtotal += curr
        return float(subtotal)

    def items(self):
        res = {}
        for orderitem in self.orderitems:
            res[orderitem.item_id] = orderitem.to_dict()
        return res

    def to_dict(self, geo=False):
        res = {
            'id': self.id,
            'user_id': self.user_id,
            'restaurant_id': self.restaurant_id,
            'restaurant_name': self.restaurant.name,
            'restaurant_image': self.restaurant.image_url,
            'restaurant_address': self.restaurant.address,
            'tip': float(self.tip),
            'is_pickup': self.is_pickup,
            'is_complete': self.is_complete,
            'is_priority': self.is_priority,
            'delivery_address': self.delivery_address,
            'delivery_fee': self.restaurant.delivery_fee,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'order_items': self.items(),
            'num_items': self.calculate_num_items(),
            'total_price': self.calculate_total_price(),
            'subtotal': self.calculate_subtotal()
        }

        if geo:
            res['delivery_lat'] = self.delivery_lat
            res['delivery_lng'] = self.delivery_lng

        return res
