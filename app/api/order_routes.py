from app.models import db, Order, OrderItem, MenuItem
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy import and_

order_routes = Blueprint('orders', __name__)


@order_routes.route('/past')
@login_required
def get_all_past_orders():
    past_orders = Order.query.filter(and_(Order.is_complete == True, Order.user_id == current_user.id)).order_by(
        Order.updated_at.desc()).all()
    return {"past_orders": {order.id: order.to_dict() for order in past_orders}}


@order_routes.route('/past/<int:orderId>')
@login_required
def get_single_past_order(orderId):
    single_past_order = Order.query.get(orderId)
    if not single_past_order:
        return jsonify({"message": "Order not found"}), 404
    return {"single_past_order": single_past_order.to_dict()}


@order_routes.route('/past/latest')
@login_required
def get_last_past_order():
    last_past_order = Order.query.filter(
        Order.user_id == current_user.id).order_by(Order.updated_at.desc()).first()
    if not last_past_order:
        return jsonify({"message": "Order not found"}), 404
    return {"last_past_order": last_past_order.to_dict()}


@order_routes.route('/current')
@login_required
def get_all_current_orders():
    current_orders = Order.query.filter(and_(Order.is_complete == False, Order.user_id == current_user.id)).order_by(
        Order.updated_at.desc()).all()
    return {"current_orders": {order.restaurant_id: order.to_dict() for order in current_orders}}


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

    if not targetOrder.orderitems:
        db.session.delete(targetOrder)
        db.session.commit()
        return jsonify({"message": "Cart is empty so it is deleted"}), 200

    return {"targetOrder": targetOrder.to_dict()}, 200


@order_routes.route('/<int:orderId>/items/<int:itemId>', methods=['PUT'])
@login_required
def update_item_in_cart(orderId, itemId):
    updatedOrderQuantity = request.json
    targetOrder = Order.query.get(orderId)
    if not targetOrder:
        return jsonify({"message": "Order not found"}), 404
    targetOrderItem = OrderItem.query.filter_by(
        order_id=orderId, item_id=itemId).first()
    if not targetOrderItem:
        return jsonify({"message": "Item not found in this cart"}), 404

    targetOrderItem.quantity = updatedOrderQuantity["quantity"]
    db.session.commit()
    return {"targetOrder": targetOrder.to_dict(), "targetOrderItem": targetOrderItem.to_dict()}, 200


@order_routes.route('/<int:orderId>', methods=['DELETE'])
@login_required
def delete_cart(orderId):
    targetOrder = Order.query.get(orderId)
    if not targetOrder:
        return jsonify({"message": "Order not found"}), 404

    db.session.delete(targetOrder)
    db.session.commit()
    return {"targetOrderResId": targetOrder.restaurant_id}

# in the backend, need to check if there is
# already a shopping cart for this restaurant or not.
# 1. if yes, then check this item is already in the cart or not:
#            1.1 if not in the cart, just add orderItem.
#            1.2 if in the cart, update orderItem quantity in the orderItem table.
# 2. if no, create a new cart, then add orderItem.


@order_routes.route('/new_item', methods=['POST'])
@login_required
def add_item_to_cart():
    newOrderItemData = request.json
    targetMenuItem = MenuItem.query.get(newOrderItemData["item_id"])
    if not targetMenuItem:
        return jsonify({"message": "MenuItem not found in this restaurant"}), 404

    targetOrder = Order.query.filter(
        and_(Order.is_complete == False, Order.user_id == current_user.id, Order.restaurant_id == targetMenuItem.restaurant_id)).first()

    # targetOrder not found => create a new cart
    if not targetOrder:
        # create a new cart - order, then query the new cart order, need its cart id
        newOrder = Order(user_id=current_user.id,
                         restaurant_id=targetMenuItem.restaurant_id,
                         is_pickup=not newOrderItemData["is_delivery"],
                         is_complete=False)
        db.session.add(newOrder)
        db.session.commit()

        targetOrder = Order.query.filter_by(
            user_id=current_user.id).order_by(Order.id.desc()).first()

    targetOrderItem = OrderItem.query.filter_by(
        order_id=targetOrder.id, item_id=newOrderItemData["item_id"]).first()
    if not targetOrderItem:
        newOrderItem = OrderItem(order_id=targetOrder.id,
                                 item_id=newOrderItemData["item_id"],
                                 quantity=newOrderItemData["quantity"])
        db.session.add(newOrderItem)
        db.session.commit()
    else:
        targetOrderItem.quantity += newOrderItemData["quantity"]
        db.session.commit()

    targetOrderItem = OrderItem.query.filter_by(
        order_id=targetOrder.id, item_id=newOrderItemData["item_id"]).first()
    return {"targetOrder": targetOrder.to_dict(), "targetOrderItem": targetOrderItem.to_dict()}, 200


@order_routes.route('/<int:orderId>/checkout', methods=['PUT'])
@login_required
def checkout_cart(orderId):
    orderPlaced = request.json
    print(orderPlaced)
    target_order = Order.query.filter(
        and_(Order.is_complete == False, Order.user_id == current_user.id, Order.id == orderId)).first()

    if not target_order:
        return jsonify({"message": "Active cart not found for this restaurant"}), 404

    if not target_order.user_id == current_user.id:
        return {"errors": "Unauthorized"}, 403

    target_order.tip = float(orderPlaced["tip"])
    target_order.is_pickup = orderPlaced["is_pickup"]
    target_order.is_priority = orderPlaced["is_priority"]
    target_order.is_complete = orderPlaced["is_complete"]
    target_order.delivery_address = orderPlaced["delivery_address"]
    target_order.delivery_lat = orderPlaced["delivery_lat"]
    target_order.delivery_lng = orderPlaced["delivery_lng"]

    db.session.commit()
    new_past_order = Order.query.get(orderId)
    return {"new_past_order": new_past_order.to_dict()}, 200


@order_routes.route('/<int:orderId>/reorder', methods=['POST'])
@login_required
def reorder(orderId):
    isDeliveryT = request.json

    pastOrder = Order.query.get(orderId)
    print(pastOrder)
    if pastOrder:
        copied_order_items = []
        for order_item in pastOrder.orderitems:
            new_orderitem = OrderItem(
                item_id=order_item.item_id,
                quantity=order_item.quantity
            )
            copied_order_items.append(new_orderitem)

        newOrder = Order(user_id=current_user.id,
                         restaurant_id=pastOrder.restaurant_id,
                         is_pickup=not isDeliveryT,
                         is_complete=False,
                         orderitems=copied_order_items)
        db.session.add(newOrder)
        db.session.commit()
        return newOrder.to_dict()

    # targetOrder = Order.query.filter_by(
    #     user_id=current_user.id).order_by(Order.id.desc()).first()

    # for cart_item in requestBody["cartItems"]:
    #     targetOrder.orderitems.append({
    #         "item_id": cart_item.item_id,
    #         "quantity": cart_item.quantity
    #     })
    # db.session.commit()
