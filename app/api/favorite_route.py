from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Restaurant, Favorite

favorite_routes = Blueprint('favorites', __name__)


@favorite_routes.route('/<int:restaurantId>', methods=['POST'])
@login_required
def favorite_restaurant(restaurantId):
    target_restaurant = Restaurant.query.get(restaurantId)
    if not target_restaurant:
        return jsonify({"error": "Restaurant not found"}), 404

    favorite = Favorite.query.filter_by(
        restaurant_id=restaurantId, user_id=current_user.id).first()
    if favorite:
        return jsonify({"error": "You already favorited this restaurant"}), 408

    new_favorite = Favorite(
        restaurant_id=restaurantId, user_id=current_user.id)
    db.session.add(new_favorite)
    db.session.commit()

    response = new_favorite.to_dict()
    return response


@favorite_routes.route('/<int:restaurantId>', methods=['DELETE'])
@login_required
def unfavorite_restaurant(restaurantId):
    fav_restaurant = Favorite.query.filter_by(
        restaurant_id=restaurantId, user_id=current_user.id).first()

    if fav_restaurant:
        db.session.delete(fav_restaurant)
        db.session.commit()
        # return {"Response": "Successfully unfavorited this pin"}
        return {"restaurant_id": restaurantId, "user_id": current_user.id}
    else:
        return {"Response": "Could not unfavorite this restaurant as you never favorited it"}
