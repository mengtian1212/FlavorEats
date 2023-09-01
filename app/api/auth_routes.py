from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
import random

auth_routes = Blueprint('auth', __name__)

user_images = [
    "https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/9538c4f1cb0d524a.svg",  # demo     user8
    "https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/544c3c3781e0db92.svg",  # sheldon  user9
    "https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/21f488d3249d6f03.svg",  # penny    user10
    "https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/d590fac5df89924d.svg",  # leonard  user11
    "https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/9f716d4b83f1173e.svg",  # raj      user12
    # amy      user13   user15
    "https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/76cd7fa5fcf22251.svg",
    "https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/d96375ed3fb7384c.svg",  # user7    user14
]


def capitalize_first_char(words):
    processed_word = " ".join(words.strip().split())
    word_arr = processed_word.split(" ")
    res_arr = []
    for word in word_arr:
        new_word = word[0].upper() + word[1:].lower()
        res_arr.append(new_word)
    return " ".join(res_arr)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


def validation_errors_to_error_dict(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = {}
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages[field] = error
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    # return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    return {'errors': form.errors}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            email=form.data['email'],
            password=form.data['password'],
            first_name=capitalize_first_char(form.data['first_name']),
            username=capitalize_first_char(form.data['first_name']),
            last_name=capitalize_first_char(form.data['last_name']),
            image_url=random.choice(user_images),
            address=form.data['address'],
            city=form.data['city'],
            state=form.data['state'],
            zip=form.data['zip'],
            lat=form.data['lat'],
            lng=form.data['lng']
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    print(form.errors)
    # return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    return {'errors': validation_errors_to_error_dict(form.errors)}, 401

    # return {'errors': form.errors}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
