from app.models import db, Order, OrderItem
from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from sqlalchemy import and_

order_routes = Blueprint('orders', __name__)


@order_routes.route('/past')
@login_required
def get_all_past_orders():
    past_orders = Order.query.filter(and_(Order.is_complete == True, Order.user_id == current_user.id)).order_by(
        Order.updated_at.desc()).all()
    return {"past_orders": {order.id: order.to_dict() for order in past_orders}}


@order_routes.route('/current')
@login_required
def get_all_current_orders():
    current_orders = Order.query.filter(and_(Order.is_complete == False, Order.user_id == current_user.id)).order_by(
        Order.updated_at.desc()).all()
    return {"current_orders": {order.id: order.to_dict() for order in current_orders}}


@order_routes.route('/<int:orderId>/items/<int:itemId>', methods=['DELETE'])
@login_required
def delete_item_from_cart(orderId, itemId):
    targetOrder = Order.query.get(orderId)
    if not targetOrder:
        return jsonify({"message": "Order not found"}), 404
    targetOrderItem = OrderItem.query.filter_by(
        order_id=orderId, item_id=itemId).first()
    if not targetOrderItem:
        return jsonify({"message": "Item not found in this cart"}), 404
    db.session.delete(targetOrderItem)
    db.session.commit()

    # if not targetOrder.orderitems:
    #     db.session.delete(targetOrder)
    #     db.session.commit()
    #     return jsonify({"message": "Cart is empty so it is deleted"}), 200

    return {"targetOrder": targetOrder.to_dict()}, 200
