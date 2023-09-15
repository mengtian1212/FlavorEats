import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./ItemModal.css";
import { addCartItemThunk } from "../../store/orders";
import CartModal from "../Carts/CartModal";
import { useDeliveryMethod } from "../../context/DeliveryMethodContext";

function ItemModal({ item }) {
  const dispatch = useDispatch();
  const [isAdded, setIsAdded] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [showLoginNotice, setShowLoginNotice] = useState(false);

  const { closeModal } = useModal();

  const [isHovered, setIsHovered] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const img = e.currentTarget;
    const boundingRect = img.getBoundingClientRect();

    const offsetX = e.clientX - boundingRect.left;
    const offsetY = e.clientY - boundingRect.top;

    const x = (offsetX / img.offsetWidth) * 100;
    const y = (offsetY / img.offsetHeight) * 100;

    setZoomPosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // setZoomPosition({ x: 0, y: 0 });
  };

  const [quantity, setQuantity] = useState(1);
  const handleDecrement = () => {
    if (quantity <= 1) return;
    setQuantity((prev) => prev - 1);
  };
  const handleIncrement = () => {
    if (quantity >= 98) return;
    setQuantity((prev) => prev + 1);
  };

  const { isDeliveryT, setIsDeliveryT } = useDeliveryMethod();
  // delivery method could be set only when user add a item to a new cart (create a new cart)
  // user can change the delivery method again during checkout
  // before checkout, toggle delivery/pickup will have no effect to current order
  // will only apply to new order
  const { setModalContent, setModalClass } = useModal();
  const handleAddItem = async (e) => {
    if (sessionUser) {
      setIsAdded(true);
      const newOrderItemData = {
        item_id: item.id,
        quantity: parseInt(quantity),
        is_delivery: isDeliveryT,
      };
      await dispatch(addCartItemThunk(newOrderItemData));
      setTimeout(() => {
        // closeModal();
        if (
          location.pathname === "/restaurants" ||
          location.pathname.startsWith("/search")
        ) {
          history.push(`/restaurants/${item.restaurant_id}`);
        }
        setModalContent(<CartModal restaurantId={item.restaurant_id} />);
        setModalClass("cart-modal");
      }, 300);
      // in the thunk, need to check if there is
      // already a shopping cart for this restaurant or not.
      // 1. if yes, then check this item is already in the cart or not:
      //            1.1 if not in the cart, just add orderItem.
      //            1.2 if in the cart, update orderItem quantity in the orderItem table.
      // 2. if no, create a new cart, then add orderItem.
    } else {
      setShowLoginNotice(true);
      setTimeout(() => {
        setShowLoginNotice(false);
      }, 1000);
    }
  };

  return (
    <div className="item-modal-container">
      <div className="xmark-container" onClick={closeModal}>
        <i className="fa-solid fa-xmark"></i>
      </div>
      <div
        id="left-item-container"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={item.image_url}
          alt=""
          className="item-img1"
          style={{
            transform: `scale(${isHovered ? 1.6 : 1})`,
            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
            transition: "transform 300ms ease 0s",
          }}
        />
      </div>
      <div className="right-item-container">
        <div className="item-n">{item.item_name}</div>
        {item.calory !== null && (
          <div className="item-c">{parseInt(item.calory)} Cal.</div>
        )}
        <div className="item-p">${item.price}</div>
        <div className="item-d">{item.description}</div>
        {item.like_ratio > 0 && (
          <div className="item-likes-container1">
            <i className="fa-solid fa-thumbs-up"></i>
            <div>{Math.floor(item.like_ratio.toFixed(2) * 100)}%</div>
            <div>({item.num_likes > 0 && item.num_likes})</div>
          </div>
        )}
        <div className="add-item-container">
          <i
            className="fa-solid fa-minus cursor item-plus3"
            onClick={handleDecrement}
          ></i>
          <div className="middle-q1">{quantity}</div>
          <i
            className="fa-solid fa-plus cursor item-plus3"
            onClick={handleIncrement}
          ></i>
        </div>
        {!isAdded && (
          <button
            className={`reorder-btn5 ${
              location.pathname.includes("business") ? "btn-dis" : ""
            }`}
            onClick={handleAddItem}
            disabled={location.pathname.includes("business")}
          >
            Add {quantity} to order • $
            {(item.price * parseInt(quantity)).toFixed(2)}
          </button>
        )}
        {isAdded && (
          <button className={`reorder-btn5 ${isAdded ? "colorg" : ""}`}>
            Adding... • ${(item.price * parseInt(quantity)).toFixed(2)}
          </button>
        )}
        {showLoginNotice && (
          <div className="error-message1">Please sign in to add food</div>
        )}
        {location.pathname.includes("business") && (
          <div className="error-message3">
            Preview only. Please visit store page for ordering.
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemModal;
