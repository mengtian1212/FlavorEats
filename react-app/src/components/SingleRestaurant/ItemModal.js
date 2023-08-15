import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./ItemModal.css";

function ItemModal({ item }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  return (
    <div className="item-modal-container">
      <div className="left-item-container">
        <img src={item.image_url} alt="" className="item-img1" />
      </div>
      <div className="right-item-container">
        <div className="item-name-text">{item.item_name}</div>
        <div>{item.description}</div>
        <div className="item-price">${item.price}</div>
        {item.like_ratio > 0 && (
          <div className="item-likes-container">
            <i className="fa-solid fa-thumbs-up"></i>
            <div>{item.like_ratio.toFixed(2) * 100}%</div>
            <div>({item.num_likes > 0 && item.num_likes})</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemModal;
