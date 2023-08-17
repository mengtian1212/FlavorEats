import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./ItemModal.css";
import { addCartItemThunk } from "../../store/orders";
import CartModal from "../Carts/CartModal";

function ItemModal({ item }) {
  const dispatch = useDispatch();
  const [isAdded, setIsAdded] = useState(false);

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

  const { setModalContent, setModalClass } = useModal();
  const handleAddItem = (e) => {
    setIsAdded(true);
    const newOrderItemData = {
      item_id: item.id,
      quantity: parseInt(quantity),
    };
    dispatch(addCartItemThunk(newOrderItemData));
    setTimeout(() => {
      closeModal();
      setModalContent(<CartModal restaurantId={item.restaurant_id} />);
      setModalClass("cart-modal");
    }, 1000);
    // in the thunk, need to check if there is
    // already a shopping cart for this restaurant or not.
    // 1. if yes, then check this item is already in the cart or not:
    //            1.1 if not in the cart, just add orderItem.
    //            1.2 if in the cart, update orderItem quantity in the orderItem table.
    // 2. if no, create a new cart, then add orderItem.
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
        {item.calory && (
          <div className="item-c">{parseInt(item.calory)} Cal.</div>
        )}
        <div className="item-p">${item.price}</div>
        <div className="item-d">{item.description}</div>
        {item.like_ratio > 0 && (
          <div className="item-likes-container1">
            <i className="fa-solid fa-thumbs-up"></i>
            <div>{item.like_ratio.toFixed(2) * 100}%</div>
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
          <button className="reorder-btn5" onClick={handleAddItem}>
            Add {quantity} to order · $
            {(item.price * parseInt(quantity)).toFixed(2)}
          </button>
        )}
        {isAdded && (
          <button className={`reorder-btn5 ${isAdded ? "colorg" : ""}`}>
            Adding... · ${(item.price * parseInt(quantity)).toFixed(2)}
          </button>
        )}
      </div>
    </div>
  );
}

export default ItemModal;
