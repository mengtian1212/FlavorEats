from app.models import db, Restaurant
from flask import Blueprint, jsonify

restaurant_routes = Blueprint('restaurants', __name__)


@restaurant_routes.route('')
def get_all_restaurants():
    """
    Query for all restaurants and returns them in a list of restaurant dictionaries
    """
    restaurants = Restaurant.query.all()
    return {"restaurants": {restaurant.id: restaurant.to_dict_simple() for restaurant in restaurants}}


@restaurant_routes.route('/<int:restaurantId>')
def get_one_restaurant(restaurantId):
    """
    Query for one restaurant
    """
    restaurant = Restaurant.query.get(restaurantId)
    if not restaurant:
        return jsonify({"message": "Restaurant not found"}), 404
    response = restaurant.to_dict()
    return response
