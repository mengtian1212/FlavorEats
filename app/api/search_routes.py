from app.models import db, Restaurant, MenuItem
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy import or_, and_

search_routes = Blueprint('search', __name__)


@search_routes.route('', methods=["POST"])
def search_all():
    search_phrase = request.json
    search_words = search_phrase.split()
    num_search = 0
    num_restaurants = 0
    num_dishes = 0
    # Option1: requires restaurants to match all specified criteria(word).
    # or_clauses = []
    # for word in search_words:
    #     or_clauses.append(Restaurant.name.ilike(f'%{word}%'))
    #     or_clauses.append(Restaurant.cusine_types.ilike(f'%{word}%'))
    #     or_clauses.append(Restaurant.description.ilike(f'%{word}%'))
    #     or_clauses.append(Restaurant.price_ranges == word)

    # print(or_clauses)
    # restaurants = Restaurant.query.filter(or_(*or_clauses)).all()
    # return {'search': [restaurant.to_dict() for restaurant in restaurants]}

    # Option2: allows restaurants to match any of the specified criteria(word).
    res_or_clauses = []
    for word in search_words:
        res_or_clauses.append(or_(Restaurant.name.ilike(f'%{word}%'), Restaurant.cusine_types.ilike(
            f'%{word}%'), Restaurant.description.ilike(f'%{word}%'), Restaurant.price_ranges == word))

    # consider change to and_  if it is and_, then this restaurant must contain each search word in any of its fields
    res_clauses = or_(*res_or_clauses)

    dish_or_clauses = []
    for word in search_words:
        dish_or_clauses.append(or_(MenuItem.item_name.ilike(f'%{word}%'),
                                   #    MenuItem.description.ilike(f'%{word}%'),
                                   MenuItem.item_type.ilike(f'%{word}%')))

    dish_clauses = or_(*dish_or_clauses)   # consider change to and_

    # Query all restaurants matching any of criteria and get their ids
    matching_restaurants = Restaurant.query.filter(res_clauses).all()
    matching_restaurant_ids = [
        restaurant.id for restaurant in matching_restaurants]

    # Query all menuitems matching any of criteria and get their restaurant_ids
    menuitems = MenuItem.query.filter(dish_clauses).all()
    matching_res_ids = [item.restaurant_id for item in menuitems]

    # Get all restaurants with either matching restaurant info or its dishes info, remove duplicates
    combined_res_ids = list(set(matching_res_ids + matching_restaurant_ids))
    search_restaurants = Restaurant.query.filter(
        Restaurant.id.in_(combined_res_ids)).all()
    num_search += len(combined_res_ids)
    num_restaurants += len(combined_res_ids)

    # for each restaurant
    search_results = []
    for restaurant in search_restaurants:
        menuitem_or_clauses = []
        for word in search_words:
            menuitem_or_clauses.append(or_(MenuItem.item_name.ilike(f'%{word}%'),
                                           #    MenuItem.description.ilike(
                                           #        f'%{word}%'),
                                           MenuItem.item_type.ilike(f'%{word}%')))
        menuitem_clauses = or_(*menuitem_or_clauses)
        matching_menuitems = MenuItem.query.filter(
            MenuItem.restaurant_id == restaurant.id).filter(menuitem_clauses).all()
        num_search += len(matching_menuitems)
        num_dishes += len(matching_menuitems)

        # Create a simplified dictionary representation of the restaurant
        simplified_restaurant = {
            **restaurant.to_dict_simple(),
            "menuitems": [menuitem.to_dict() for menuitem in matching_menuitems]
        }

        search_results.append(simplified_restaurant)

    return {'search_results': {simplified_restaurant["id"]: simplified_restaurant for simplified_restaurant in search_results},
            'num_results': num_search, 'num_restaurants': num_restaurants, 'num_dishes': num_dishes}
    # return {'search': [restaurant.to_dict_simple() for restaurant in search_restaurants]}
