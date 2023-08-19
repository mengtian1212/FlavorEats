from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
# from .favorite import favorites

price_ranges = ['$', '$$', '$$$', '$$$$']


class Restaurant(db.Model):
    __tablename__ = 'restaurants'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)
    name = db.Column(db.String(120), nullable=False)
    image_url = db.Column(db.String(255), nullable=True)
    description = db.Column(db.String, nullable=True)
    delivery_fee = db.Column(db.Numeric(4, 2), nullable=True, default=0)
    cusine_types = db.Column(db.String, nullable=False)
    price_ranges = db.Column(
        db.Enum(name='price_ranges', *price_ranges), default='$')

    # location
    address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(40), nullable=True)
    state = db.Column(db.String(2), nullable=True)
    lat = db.Column(db.Float, nullable=True)
    lng = db.Column(db.Float, nullable=True)

    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now(), onupdate=func.now())

    # one-to-many
    user = db.relationship("User", back_populates="restaurants")
    menuitems = db.relationship(
        "MenuItem", back_populates="restaurant", cascade="all, delete-orphan")
    orders = db.relationship(
        "Order", back_populates="restaurant", cascade="all, delete-orphan")

    # many-to-many
    reviews = db.relationship(
        "Review", back_populates="restaurant", cascade="all, delete-orphan")
    # restaurant_favs = db.relationship(
    #     "User", secondary=favorites, back_populates="user_favs")
    favorites = db.relationship(
        "Favorite", back_populates="restaurant", cascade="all, delete-orphan")

    def avg_rating(self):
        avg_rating = 0
        if len(self.reviews):
            total = sum([review.rating for review in self.reviews])
            avg_rating = total / len(self.reviews)

        return avg_rating

    def num_orders(self):
        return len(self.orders)

    def items(self):
        res = {}
        for item in self.menuitems:
            res[item.id] = item.to_dict()
        return res

    def popularItems(self):
        items = self.items().values()
        popularItems = sorted(
            items, key=lambda item: (
                -float(item.get("like_ratio", 0)),
                -float(item.get("num_likes", 0))
            )
        )[:5]
        popular_items = {str(item["id"]): item for item in popularItems}
        return popularItems

    def to_dict_simple(self, geo=False):
        res = {
            'id': self.id,
            'owner_id': self.owner_id,
            'name': self.name,
            'delivery_fee': float(self.delivery_fee),
            'cusine_types': self.cusine_types,
            'price_ranges': self.price_ranges,
            'image_url': self.image_url,
            'city': self.city,
            'state': self.state,
            'address': self.address,
            'avg_rating': self.avg_rating(),
            'num_orders': self.num_orders()
        }

        if geo:
            res['lat'] = self.lat
            res['lng'] = self.lng

        return res

    def to_dict(self, geo=False):
        res = {
            'id': self.id,
            'owner_id': self.owner_id,
            'name': self.name,
            'description': self.description,
            'delivery_fee': self.delivery_fee,
            'cusine_types': self.cusine_types,
            'price_ranges': self.price_ranges,
            'image_url': self.image_url,
            'city': self.city,
            'state': self.state,
            'address': self.address,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'num_rating': len(self.reviews),
            'avg_rating': self.avg_rating(),
            'num_orders': self.num_orders(),
            'menuitems': self.items(),
            'popular': self.popularItems()
        }

        if geo:
            res['lat'] = self.lat
            res['lng'] = self.lng

        return res
