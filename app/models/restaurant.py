from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from .favorite import favorites

price_ranges = ['$', '$$', '$$$', '$$$$']


class Restaurant(db.Model):
    __tablename__ = 'restaurants'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    image_url = db.Column(db.String(255), nullable=True)
    description = db.Column(db.String, nullable=True)
    delivery_fee = db.Column(db.Float, nullable=True, default=0)
    cusine_types = db.Column(db.String(255), nullable=False)
    price_ranges = db.Column(
        db.Enum(name='price_ranges', *price_ranges), default='$')

    # location
    city = db.Column(db.String(40), nullable=True)
    state = db.Column(db.String(2), nullable=True)
    lat = db.Column(db.Integer, nullable=True)
    lng = db.Column(db.Integer, nullable=True)
    address = db.Column(db.String(255), nullable=False)

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
    restaurant_favs = db.relationship(
        "User", secondary=favorites, back_populates="user_favs", cascade="all, delete-orphan")

    def to_dict(self, geo=False):
        res = {
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
            'updated_at': self.updated_at
        }

        if geo:
            res['lat'] = self.lat
            res['lng'] = self.lng

        return res
