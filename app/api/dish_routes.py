from app.models import db, Restaurant, MenuItem, Review, Order, Favorite
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from .AWS_helpers import upload_file_to_s3, get_unique_filename
from .auth_routes import validation_errors_to_error_dict

from app.forms.create_dish_form import NewDishForm
from sqlalchemy import and_, case, desc
from sqlalchemy.sql import func

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


@dish_routes.route('/<int:dishId>', methods=["PUT"])
@login_required
def edit_dish(dishId):
    form = NewDishForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        targetDish = MenuItem.query.get(dishId)
        if not targetDish:
            return {"errors": "Dish not found,"}, 404

        if not targetDish.restaurant.owner_id == current_user.id:
            return {"errors": "Unauthorized"}, 401

        image_file = form.data["image"]
        if image_file:
            image_file.filename = get_unique_filename(image_file.filename)
            upload = upload_file_to_s3(image_file)
            if "url" not in upload:
                return {"errors": upload}, 400

            targetDish.image_url = upload["url"]
            targetDish.item_name = form.data['item_name']
            targetDish.price = form.data['price']
            targetDish.description = form.data['description']
            targetDish.item_type = form.data['item_type']
            targetDish.calory = form.data['calory']

            db.session.commit()
            return targetDish.to_dict()

    return {"errors": validation_errors_to_error_dict(form.errors)}, 400


@dish_routes.route('/<int:dishId>/delete', methods=["DELETE"])
@login_required
def delete_dish(dishId):
    targetDish = MenuItem.query.get(dishId)
    if not targetDish:
        return {"errors": "Dish not found,"}, 404

    if not targetDish.restaurant.owner_id == current_user.id:
        return {"errors": "Unauthorized"}, 401

    db.session.delete(targetDish)
    db.session.commit()
    return {"id": targetDish.id}
