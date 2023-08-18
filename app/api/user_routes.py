from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db
from app.forms.edit_user_address_form import EditUserAddressForm

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:userId>/address', methods=["PUT"])
@login_required
def update_user_address(userId):
    form = EditUserAddressForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    target_user = User.query.get(userId)
    if not target_user:
        return jsonify({"message": "User not found"}), 404

    if form.validate_on_submit():
        target_user.address = form.data["updatedAddress"]
        parts = target_user.address.split(', ')
        building_name = parts[0]
        street_address = parts[1]
        city = parts[2]

        state_zip = parts[3].split(' ')
        state = state_zip[0]
        zip = state_zip[1]
        target_user.city = city
        target_user.state = state
        target_user.zip = zip
        target_user.lat = None
        target_user.lng = None
        db.session.commit()
        response = target_user.to_dict()
        return response
    if form.errors:
        return form.errors
