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
    review_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("reviews.id")), nullable=True)

    tip = db.Column(db.Numeric(4, 2), nullable=False, default=0)
    is_pickup = db.Column(db.Boolean, nullable=False, default=0)
    is_priority = db.Column(db.Boolean, nullable=False, default=False)
    is_complete = db.Column(db.Boolean, nullable=False, default=False)
    delivery_address = db.Column(db.String(255), nullable=True)
    delivery_lat = db.Column(db.Numeric(
        scale=13, asdecimal=False), nullable=True)
    delivery_lng = db.Column(db.Numeric(
        scale=13, asdecimal=False), nullable=True)

    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now(), onupdate=func.now())

    # one-to-many
    user = db.relationship("User", back_populates="orders")
    restaurant = db.relationship("Restaurant", back_populates="orders")
    orderitems = db.relationship(
        "OrderItem", back_populates="order", cascade="all, delete-orphan")

    # one-to-one
    review = db.relationship("Review", back_populates="order", uselist=False)

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

        # tip exist for both delivery and pickup orders
        tip = float(self.tip)

        # delivery fee exist only for delivery orders
        delivery = float(
            self.restaurant.delivery_fee) if not self.is_pickup else 0

        # priority fee exist only for delivery & priority delivery orders
        priority_fee = float(
            2.99) if not self.is_pickup and self.is_priority else 0
        return float(total_price) + tip + delivery + priority_fee

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
            'restaurant_city': self.restaurant.city,
            'restaurant_lat': self.restaurant.lat,
            'restaurant_lng': self.restaurant.lng,
            'tip': float(self.tip),
            'is_pickup': self.is_pickup,
            'is_complete': self.is_complete,
            'is_priority': self.is_priority,
            'delivery_address': self.delivery_address,
            'delivery_lat': self.delivery_lat,
            'delivery_lng': self.delivery_lng,
            'delivery_fee': self.restaurant.delivery_fee,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'order_items': self.items(),
            'num_items': self.calculate_num_items(),
            'total_price': self.calculate_total_price(),
            'subtotal': self.calculate_subtotal(),
            'review_rating': self.review.rating if self.review_id else 0
        }

        if geo:
            # res['delivery_lat'] = self.delivery_lat
            # res['delivery_lng'] = self.delivery_lng
            pass

        return res

    def to_dict_simple(self, geo=False):
        res = {
            'id': self.id,
            'user_id': self.user_id,
            'user_firstname': self.user.first_name,
            'user_lastname': self.user.last_name,
            'user_image_url': self.user.image_url,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'num_items': self.calculate_num_items(),
            'total_price': self.calculate_total_price(),
            'review_rating': self.review.rating if self.review_id else 0,
            'is_pickup': self.is_pickup,
            'is_priority': self.is_priority, }

        return res
