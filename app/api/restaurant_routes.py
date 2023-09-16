from app.models import db, Restaurant, Review, Order, Favorite, MenuItem, OrderItem
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from .AWS_helpers import upload_file_to_s3, get_unique_filename
from .auth_routes import validation_errors_to_error_messages
from .auth_routes import validation_errors_to_error_dict

from app.forms.create_restaurant_form import NewRestaurantForm
from app.forms.edit_restaurant_form import EditRestaurantForm
from app.forms.create_review_form import ReviewForm
from app.forms.create_dish_form import NewDishForm
from sqlalchemy import and_, case, desc, or_
from sqlalchemy.sql import func, extract
from datetime import datetime, timedelta
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


@restaurant_routes.route('/<int:restaurantId>/dishes')
def get_restaurant_dishes_by_restaurantId(restaurantId):
    targetRestaurant = Restaurant.query.get(restaurantId)
    if not targetRestaurant:
        return jsonify({"errors": "Restaurant not found"}), 404
    dishes = MenuItem.query.filter(
        MenuItem.restaurant_id == restaurantId).all()
    # return {"dishes": {dish.id: dish.to_dict() for dish in dishes}}
    return [dish.to_dict() for dish in dishes]


@restaurant_routes.route('/<int:restaurantId>/dishes', methods=["POST"])
@login_required
def new_dish(restaurantId):
    form = NewDishForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        image_file = form.data["image"]
        image_file.filename = get_unique_filename(image_file.filename)
        upload = upload_file_to_s3(image_file)
        if "url" not in upload:
            return {"errors": upload}, 400

        new_dish = MenuItem(
            image_url=upload["url"],
            item_name=form.data['item_name'],
            price=form.data['price'],
            description=form.data['description'],
            item_type=form.data['item_type'],
            calory=form.data['calory'],
            restaurant_id=form.data['restaurant_id']
        )

        db.session.add(new_dish)
        db.session.commit()
        return new_dish.to_dict()

    return {"errors": validation_errors_to_error_dict(form.errors)}, 400


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


@restaurant_routes.route('/<int:restaurantId>/orders')
@login_required
def get_sales_by_restaurantId(restaurantId):
    twelve_months_ago = datetime.now() - timedelta(days=365)
    past_orders = Order.query.filter(and_(Order.is_complete == True, Order.restaurant_id == restaurantId, Order.created_at >= twelve_months_ago)).order_by(
        Order.created_at.desc()).all()
    # return {"restaurant_orders": {order.id: order.to_dict() for order in past_orders}}

    monthly_totals = {}
    # Iterate over the orders and calculate the monthly totals
    for order in past_orders:
        year = order.created_at.year
        month = order.created_at.month
        order_dollar_volume = order.calculate_total_price()

        if (year, month) in monthly_totals:
            monthly_totals[(year, month)] += order_dollar_volume
        else:
            monthly_totals[(year, month)] = order_dollar_volume

    # Sort the monthly totals by year and month
    sorted_monthly_totals = sorted(monthly_totals.items())
    result = [
        {"yearMonth": str(year) + '/' + str(month),
         "year": year, "month": month, "value": total, "valueK": f'{total/1000:.1f}k'}
        for (year, month), total in sorted_monthly_totals
    ]

    return {"monthly_totals": result}


@restaurant_routes.route('/<int:restaurantId>/customers')
@login_required
def get_customers_info_by_restaurantId(restaurantId):
    past_orders = Order.query.filter(and_(Order.is_complete == True, Order.restaurant_id == restaurantId)).order_by(
        Order.created_at.desc()).all()

    customer_tracking = {}

    for order in past_orders:
        user_id = order.user_id

        if user_id in customer_tracking:
            customer_tracking[user_id] = True  # returning customer
        else:
            customer_tracking[user_id] = False  # new customer

    # Initialize counters for returning and new customers
    returning_customers_count = 0
    new_customers_count = 0

    # Count the number of returning and new customers
    for is_returning in customer_tracking.values():
        if is_returning:
            returning_customers_count += 1
        else:
            new_customers_count += 1
    return {"returning_customers_count": returning_customers_count, "new_customers_count": new_customers_count}


@restaurant_routes.route('/<int:restaurantId>/top-orders')
@login_required
def get_top_orders_by_restaurantId(restaurantId):
    past_orders = Order.query.filter(and_(Order.is_complete == True, Order.restaurant_id == restaurantId)).order_by(
        Order.created_at.desc()).all()
    sorted_orders = sorted(
        past_orders, key=lambda order: order.calculate_total_price(), reverse=True)[0:5]

    return {"top_orders": [order.to_dict_simple() for order in sorted_orders]}


@restaurant_routes.route('/<int:restaurantId>/top-selling-items')
@login_required
def get_top_selling_items_by_restaurantId(restaurantId):
    # past_orders = Order.query.filter(and_(Order.is_complete == True, Order.restaurant_id == restaurantId)).order_by(
    #     Order.created_at.desc()).all()

    order_items = OrderItem.query.filter(
        OrderItem.order.has(restaurant_id=restaurantId)).all()

    item_quantities = {}
    # Calculate the total quantity sold for each item
    for order_item in order_items:
        item_id = order_item.item_id
        quantity = order_item.quantity
        if item_id in item_quantities:
            item_quantities[item_id] += quantity
        else:
            item_quantities[item_id] = quantity

    sorted_items = sorted(item_quantities.items(),
                          key=lambda x: x[1], reverse=True)

    top_selling_items = sorted_items[:5]
    result_list = []
    for item_id, quantity in top_selling_items:
        item = OrderItem.query.filter_by(item_id=item_id).first()
        item_name = item.menuitem.item_name
        result_list.append([item_id, quantity, item_name])

    return {"top_selling_items": result_list}


@restaurant_routes.route('/<int:restaurantId>/recent-reviewed-items')
@login_required
def get_recent_reviewed_items_by_restaurantId(restaurantId):
    # past_orders = Order.query.filter(and_(Order.is_complete == True, Order.restaurant_id == restaurantId)).order_by(
    #     Order.created_at.desc()).all()

    orderItems = OrderItem.query.join(OrderItem.order).filter(
        Order.restaurant_id == restaurantId)

    # Filter the orderItems to get those that are liked or disliked
    res = orderItems.filter(
        or_(OrderItem.is_like == True, OrderItem.is_dislike == True)).order_by(OrderItem.updated_at.desc()).all()

    return {"recent_reviewed_items": [{"item_name": item.menuitem.item_name,
                                       "is_like": item.is_like,
                                       "is_dislike": item.is_dislike,
                                       "updated_at": item.updated_at,
                                       } for item in res]}
