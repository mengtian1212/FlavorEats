import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { formatDate } from "../../utils/helper-functions";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useDeliveryMethod } from "../../context/DeliveryMethodContext";
import CartModal from "../Carts/CartModal";
import NewCartModal from "./NewCartModal";
import { reorderThunk } from "../../store/orders";

function OrderItem({ order_item }) {
  return (
    <div className="single-item-container">
      <div className="single-item-quantity">{order_item.quantity}</div>
      <div className="single-item-name">{order_item.item_name}</div>
    </div>
  );
}

function PastOrderCard({ pastOrder }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const order_items = Object.values(pastOrder?.order_items);
  const handleClickRestaurant = () => {
    history.push(`/restaurants/${pastOrder?.restaurant_id}`);
  };

  // for reorder
  // first get all current carts.
  // check if this reorder restaurant is already a current cart
  const carts = useSelector((state) => (state.orders ? state.orders : {}));
  const { setModalContent, setModalClass, closeModal } = useModal();
  const { isDeliveryT, setIsDeliveryT } = useDeliveryMethod();
  const [isAdded, setIsAdded] = useState(false);
  const handleReorder = async (pastOrder) => {
    console.log("hererer");
    const currCart = carts[pastOrder.restaurant_id];
    if (currCart) {
      console.log("currCart exists");
      // current cart exist.
      // popup modal to ask to start a new cart or cancel.
      // if start a new cart: then dispatch thunk to create a new order and add new items, after that popup cart modal
      // if cancel: close modal
      setModalContent(
        <NewCartModal pastOrder={pastOrder} currCart={currCart} />
      );
    } else {
      // current cart doesn't exist.
      // directly dispatch thunk to create a new order and add new items, after that popup cart modal
      setIsAdded(true);
      const newCart = await dispatch(reorderThunk(pastOrder.id, isDeliveryT));
      setTimeout(() => {
        closeModal();
        setModalContent(<CartModal restaurantId={newCart?.restaurant_id} />);
        setModalClass("cart-modal");
        setIsAdded(false);
      }, 1000);
    }
  };

  return (
    <>
      <div className="single-order-container">
        <div className="order-left-container">
          <div className="order-resimg-container">
            <img
              src={pastOrder?.restaurant_image}
              alt=""
              className="past-order-res-img cursor"
              onClick={handleClickRestaurant}
            ></img>
            <button
              className="img-quick-view1 cursor"
              onClick={handleClickRestaurant}
            >
              View store
            </button>
          </div>
          <div className="order-content-container">
            <div className="order-name cursor" onClick={handleClickRestaurant}>
              {pastOrder?.restaurant_name}
            </div>
            <div className="order-stat">
              <div>
                {pastOrder?.num_items} items for $
                {parseFloat(pastOrder?.total_price).toFixed(2)}
              </div>
              <div>• </div>
              <div>{formatDate(pastOrder?.updated_at)}</div>
              <div>• </div>
              <div>View receipt</div>
            </div>
            <div className="order-item-container">
              {pastOrder?.order_items &&
                order_items.map((order_item, index) => (
                  <OrderItem
                    key={index}
                    index={index}
                    order_item={order_item}
                  />
                ))}
            </div>
          </div>
        </div>
        <div className="order-right-container">
          {sessionUser && !isAdded && (
            <div
              className={`reorder-btn ${isAdded ? "colorg" : ""}`}
              onClick={() => handleReorder(pastOrder)}
            >
              <div>Reorder</div>
            </div>
          )}
          {sessionUser && isAdded && (
            <div className={`reorder-btn ${isAdded ? "colorg" : ""}`}>
              <div>Reordering</div>
            </div>
          )}
          {sessionUser && (
            <div className="reorder-btn1">
              <div>Rate your order</div>
            </div>
          )}
        </div>
      </div>
      <div className="vert-line"></div>
    </>
  );
}

export default PastOrderCard;
