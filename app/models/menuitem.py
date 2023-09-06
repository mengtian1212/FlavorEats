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
    price = db.Column(db.Numeric(5, 2), nullable=False)
    image_url = db.Column(db.String(255), nullable=True)
    description = db.Column(db.String, nullable=True)
    item_type = db.Column(db.String, nullable=True)
    calory = db.Column(db.Integer, nullable=True)
    num_likes = db.Column(db.Integer, nullable=False, default=0)
    num_dislikes = db.Column(db.Integer, nullable=False, default=0)

    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now(), onupdate=func.now())

    # one-to-many
    restaurant = db.relationship("Restaurant", back_populates="menuitems")
    orderitems = db.relationship(
        "OrderItem", back_populates="menuitem", cascade="all, delete-orphan")

    # menuitem_likes = db.relationship(
    #     "MenuItemLike", back_populates="menuitem", cascade="all, delete-orphan")

    def calculate_like_dislike_ratio(self):
        # likes_count = sum(1 for like in self.menuitem_likes if like.is_like)
        # dislikes_count = sum(
        #     1 for like in self.menuitem_likes if not like.is_like)

        # total_likes_dislikes = likes_count + dislikes_count
        # like_ratio = likes_count / total_likes_dislikes if total_likes_dislikes > 0 else 0
        # return like_ratio

        total_likes_dislikes = self.num_likes + self.num_dislikes
        like_ratio = self.num_likes / total_likes_dislikes if total_likes_dislikes > 0 else 0
        return like_ratio

    def to_dict(self):
        res = {
            'id': self.id,
            'restaurant_id': self.restaurant_id,
            'item_name': self.item_name,
            'price': self.price,
            'image_url': self.image_url,
            'description': self.description,
            'calory': self.calory,
            'item_type': self.item_type,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'like_ratio': self.calculate_like_dislike_ratio(),
            # 'num_likes': sum(1 for like in self.menuitem_likes if like.is_like)
            'num_likes': self.num_likes,
            'num_dislikes': self.num_dislikes
        }
        return res
