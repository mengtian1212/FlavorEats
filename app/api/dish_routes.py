from app.models import db, Restaurant, Review, Order
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user

dish_routes = Blueprint('dishes', __name__)


@dish_routes.route('/recommend')
def get_recommend_dishes():
    """
    Query for recommended dishes and returns them in a list of dishes dictionaries
    """
    restaurants = Restaurant.query.all()

    top_rated_items = []
    for restaurant in restaurants:
        menu_items = restaurant.menuitems
        menu_items.sort(
            key=lambda item: (-item.calculate_like_dislike_ratio(), -item.num_likes, item.num_dislikes))
        top_items = menu_items[:2]
        top_items = [item.to_dict() for item in top_items]
        top_rated_items.extend(top_items)

    top_rated_items.sort(
        key=lambda item: (-item['like_ratio'], -item["num_likes"], item["num_dislikes"]))
    top_15_dishes = top_rated_items[:15]

    return {"dishes": {dish["id"]: dish for dish in top_15_dishes}}
