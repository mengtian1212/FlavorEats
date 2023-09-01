from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db
from .auth_routes import validation_errors_to_error_messages
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
        target_user.address = form.data["address"]
        target_user.city = form.data["city"]
        target_user.state = form.data["state"]
        target_user.zip = form.data["zip"]
        target_user.lat = form.data["lat"]
        target_user.lng = form.data["lng"]
        db.session.commit()
        response = target_user.to_dict()
        return response

    return {"errors": 'Invalid format : e.g. Address name, 123 main street, New York, NY 10000'}, 400
