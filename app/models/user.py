from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.sql import func
# from .favorite import favorites


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=True)
    phone_number = db.Column(db.String(255), nullable=True)
    image_url = db.Column(db.String(255), nullable=True)
    city = db.Column(db.String(40), nullable=True)
    state = db.Column(db.String(2), nullable=True)
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now(), onupdate=func.now())

    # one-to-many
    restaurants = db.relationship("Restaurant", back_populates="user")
    orders = db.relationship(
        "Order", back_populates="user", cascade="all, delete-orphan")

    # many-to-many
    reviews = db.relationship(
        "Review", back_populates="user", cascade="all, delete-orphan")
    menuitem_likes = db.relationship(
        "MenuItemLike", back_populates="user", cascade="all, delete-orphan")
    # user_favs = db.relationship(
    #     "Restaurant", secondary=favorites, back_populates="restaurant_favs")
    favorites = db.relationship(
        "Favorite", back_populates="user", cascade="all, delete-orphan")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'phone_number': self.phone_number,
            'image_url': self.image_url,
            'city': self.city,
            'state': self.state,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
