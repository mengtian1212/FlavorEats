
from app.models import db, Review, Order
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms.create_review_form import ReviewForm

review_routes = Blueprint('reviews', __name__)


@review_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_comment_for_restaurant(id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    target_review = Review.query.get(id)
    if not target_review:
        return jsonify({"message": "Review not found"}), 404
    if (current_user.id != target_review.reviewer_id):
        return {"errors": "Unauthorized"}, 401

    if form.validate_on_submit():
        target_review.rating = form.data["rating"]
        target_review.message = form.data["message"]
        db.session.commit()

        response = target_review.to_dict()
        print("fdfdfddf", target_review.user.image_url)
        response["reviewer"] = {"image_url": target_review.user.image_url,
                                "first_name": target_review.user.first_name,
                                "last_name": target_review.user.last_name}
        return response

    if form.errors:
        return form.errors


@review_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_review(id):
    target_review = Review.query.get(id)
    if not target_review:
        return jsonify({"message": "Review not found"}), 404
    if (current_user.id != target_review.reviewer_id):
        return {"errors": "Unauthorized"}, 401
    db.session.delete(target_review)
    db.session.commit()
    return {"id": target_review.id}
