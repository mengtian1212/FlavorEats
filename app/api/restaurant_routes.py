from app.models import db, Restaurant, Review, Order, Favorite
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from .AWS_helpers import upload_file_to_s3, get_unique_filename
from .auth_routes import validation_errors_to_error_messages

from app.forms.create_restaurant_form import NewRestaurantForm
from app.forms.edit_restaurant_form import EditRestaurantForm
from app.forms.create_review_form import ReviewForm
from sqlalchemy import and_, case, desc
from sqlalchemy.sql import func
import random

restaurant_routes = Blueprint('restaurants', __name__)


@restaurant_routes.route('')
def get_all_restaurants():
    """
    Query for all restaurants and returns them in a list of restaurant dictionaries
    """
    restaurants = Restaurant.query.all()
    # return {"restaurants": {restaurant.id: restaurant.to_dict_simple() for restaurant in restaurants}}

    all_restaurants_data = {}

    for restaurant in restaurants:
        if current_user.is_authenticated:
            # Get the corresponding Favorite record for the restaurant and user
            favorite_record = (
                Favorite.query
                .filter_by(user_id=current_user.id, restaurant_id=restaurant.id)
                .first()
            )

            restaurant_data = restaurant.to_dict_simple()
            # If a Favorite record exists, add "fav_created_at" key with the created_at value
            restaurant_data["is_fav"] = True if favorite_record else False
            restaurant_data["fav_created_at"] = favorite_record.created_at if favorite_record else None
            all_restaurants_data[restaurant.id] = restaurant_data
        else:
            all_restaurants_data[restaurant.id] = restaurant.to_dict_simple()

    return {"restaurants": all_restaurants_data}


@restaurant_routes.route('/newest')
def get_newest_restaurant():
    """
    Query for newest restaurant
    """
    restaurant = Restaurant.query.order_by(
        desc(Restaurant.created_at), desc(Restaurant.id)).first()
    if not restaurant:
        return jsonify({"message": "Restaurant not found"}), 404
    # response = restaurant.to_dict()

    if current_user.is_authenticated:
        # Get the corresponding Favorite record for the restaurant and user
        favorite_record = (
            Favorite.query
            .filter_by(user_id=current_user.id, restaurant_id=restaurant.id)
            .first()
        )

        restaurant_data = restaurant.to_dict()
        # If a Favorite record exists, add "fav_created_at" key with the created_at value
        restaurant_data["is_fav"] = True if favorite_record else False
        restaurant_data["fav_created_at"] = favorite_record.created_at if favorite_record else None
    else:
        restaurant_data = restaurant.to_dict()
    return restaurant_data


@restaurant_routes.route('/<int:restaurantId>')
def get_one_restaurant(restaurantId):
    """
    Query for one restaurant
    """
    restaurant = Restaurant.query.get(restaurantId)
    if not restaurant:
        return jsonify({"message": "Restaurant not found"}), 404
    # response = restaurant.to_dict()

    if current_user.is_authenticated:
        # Get the corresponding Favorite record for the restaurant and user
        favorite_record = (
            Favorite.query
            .filter_by(user_id=current_user.id, restaurant_id=restaurant.id)
            .first()
        )

        restaurant_data = restaurant.to_dict()
        # If a Favorite record exists, add "fav_created_at" key with the created_at value
        restaurant_data["is_fav"] = True if favorite_record else False
        restaurant_data["fav_created_at"] = favorite_record.created_at if favorite_record else None
    else:
        restaurant_data = restaurant.to_dict()
    return restaurant_data


@restaurant_routes.route('/favorites')
@login_required
def get_favorite_restaurants():
    """
    Query for all favorite restaurants and returns them in a list of restaurant dictionaries
    """
    subquery = (
        db.session.query(Favorite.restaurant_id)
        .filter(Favorite.user_id == current_user.id)
        .subquery()
    )

    # Query the Restaurant table to get the favorited restaurants.
    favorited_restaurants = (
        Restaurant.query
        .filter(Restaurant.id.in_(subquery))
        .all()
    )

    favorited_restaurants_data = {}

    for restaurant in favorited_restaurants:
        # Get the corresponding Favorite record for the restaurant and user
        favorite_record = (
            Favorite.query
            .filter_by(user_id=current_user.id, restaurant_id=restaurant.id)
            .first()
        )

        if favorite_record:
            # If a Favorite record exists, add "fav_created_at" key with the created_at value
            restaurant_data = restaurant.to_dict_simple()
            restaurant_data["is_fav"] = True if favorite_record else False
            restaurant_data["fav_created_at"] = favorite_record.created_at
            favorited_restaurants_data[restaurant.id] = restaurant_data

    return {"favorited_restaurants": favorited_restaurants_data}


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
        # <FileStorage: '0035a85284474ee39af8efbdeafa49d8.jpg' ('image/jpeg')>
        print("image_file---------------------------------",
              image_file)

        # 0035a85284474ee39af8efbdeafa49d8.jpg  the aws file name and url name: https://flavoreatsbucket.s3.us-west-2.amazonaws.com/0035a85284474ee39af8efbdeafa49d8.jpg
        print("image_file.filename-------------------------", image_file.filename)

        # <FileStorage: '0035a85284474ee39af8efbdeafa49d8.jpg' ('image/jpeg')>
        print("upload---------------------------------------", image_file)

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
            lat=form.data['lat'],
            lng=form.data['lng'],
        )

        db.session.add(new_restaurant)
        db.session.commit()
        return new_restaurant.to_dict()

    # return {"errors": validation_errors_to_error_messages(form.errors)}, 400
    return {"errors": form.errors}, 400


@restaurant_routes.route('/<int:restaurantId>/edit', methods=["PUT"])
@login_required
def edit_restaurant(restaurantId):
    form = EditRestaurantForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        targetRestaurant = Restaurant.query.get(restaurantId)
        if not targetRestaurant:
            return {"errors": "Restaurant not found,"}, 404

        if not targetRestaurant.owner_id == current_user.id:
            return {"errors": "Unauthorized"}, 401

        image_file = form.data["image"]
        print("update restaurant data pass validation in the backend!", image_file)
        if image_file:
            image_file.filename = get_unique_filename(image_file.filename)
            upload = upload_file_to_s3(image_file)
            if "url" not in upload:
                return {"errors": upload}, 400
            targetRestaurant.image_url = upload["url"]

        targetRestaurant.name = form.data['name']
        # targetRestaurant.image_url = upload["url"]
        targetRestaurant.cusine_types = form.data['cusine_types']
        targetRestaurant.address = form.data['address'] + \
            ', ' + form.data['city'] + ', ' + form.data['state']
        targetRestaurant.city = form.data['city']
        targetRestaurant.state = form.data['state']

        targetRestaurant.lat = form.data['lat']
        targetRestaurant.lng = form.data['lng']

        targetRestaurant.delivery_fee = form.data['delivery_fee']
        targetRestaurant.price_ranges = form.data['price_ranges']
        targetRestaurant.description = form.data['description']

        db.session.commit()
        return targetRestaurant.to_dict()

    # return {"errors": validation_errors_to_error_messages(form.errors)}, 400
    return {"errors": form.errors}, 400


@restaurant_routes.route('/<int:restaurantId>/delete', methods=["DELETE"])
@login_required
def delete_restaurant(restaurantId):
    targetRestaurant = Restaurant.query.get(restaurantId)
    db.session.delete(targetRestaurant)
    db.session.commit()
    return {"id": targetRestaurant.id}


@restaurant_routes.route('/<int:restaurantId>/reviews')
def get_restaurant_reviews_by_restaurantId(restaurantId):
    targetRestaurant = Restaurant.query.get(restaurantId)
    if not targetRestaurant:
        return jsonify({"errors": "Restaurant not found"}), 404
    reviews = Review.query.join(Restaurant).filter(
        Restaurant.id == restaurantId)
    reviews_list = []
    print(targetRestaurant)
    for review in reviews:
        review_dict = review.to_dict()
        review_dict["reviewer"] = {
            "image_url": review.user.image_url, "first_name": review.user.first_name, "last_name": review.user.last_name}
        reviews_list.append(review_dict)
    return reviews_list


@restaurant_routes.route('/<int:restaurantId>/reviews', methods=['POST'])
@login_required
def add_review_to_restaurant(restaurantId):
    targetRestaurant = Restaurant.query.get(restaurantId)
    if not targetRestaurant:
        return jsonify({"errors": "Restaurant not found"}), 404
    form = ReviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        new_review = Review(
            restaurant_id=restaurantId,
            reviewer_id=current_user.id,
            message=form.data["message"],
            rating=form.data["rating"]
        )
        db.session.add(new_review)
        db.session.commit()

        if "order_id" in form.data:
            order = Order.query.get(form.data["order_id"])
            if order:
                order.review_id = new_review.id
                db.session.commit()

        response = new_review.to_dict()
        print("fdfdfddf", new_review.user.image_url)
        response["reviewer"] = {"image_url": new_review.user.image_url,
                                "first_name": new_review.user.first_name,
                                "last_name": new_review.user.last_name}
        return response

    if form.errors:
        return form.errors
