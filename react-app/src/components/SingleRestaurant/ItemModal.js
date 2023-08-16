import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./ItemModal.css";

function ItemModal({ item }) {
  const dispatch = useDispatch();
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

  const [quantity, setQuantity] = useState(0);

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
          <button>-</button>
          <span>{quantity}</span>
          <button>+</button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
