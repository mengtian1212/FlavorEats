from app.models import db, Restaurant
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from .AWS_helpers import upload_file_to_s3, get_unique_filename
from .auth_routes import validation_errors_to_error_messages

from app.forms.create_restaurant_form import NewRestaurantForm
from app.models import Restaurant
from sqlalchemy import and_, case
from sqlalchemy.sql import func

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


@restaurant_routes.route('/new', methods=["POST"])
@login_required
def new_restaurant():
    print('Backend now!!!!!!!', current_user)
    form = NewRestaurantForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        print("new restaurant data pass validation in the backend!")
        image_file = form.data["image"]
        image_file.filename = get_unique_filename(image_file.filename)
        upload = upload_file_to_s3(image_file)
        if "url" not in upload:
            return {"errors": upload}, 400

        new_restaurant = Restaurant(
            owner_id=current_user.id,
            name=form.data['name'],
            image_url=upload["url"],
            cusine_types=form.data['cusine_types'],
            address=form.data['address'] + ', ' +
            form.data['city'] + ', ' + form.data['state'],
            city=form.data['city'],
            state=form.data['state'],
        )

        db.session.add(new_restaurant)
        db.session.commit()
        return new_restaurant.to_dict()

    return {"errors": validation_errors_to_error_messages(form.errors)}, 400
