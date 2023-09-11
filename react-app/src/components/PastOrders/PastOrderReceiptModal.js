import "./PastOrderReceiptModal.css";
import { useModal } from "../../context/Modal";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSinglePastOrderThunk } from "../../store/pastOrders";

function PastOrderReceiptModal({ pastOrderId, restaurantId, resName }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  let orderJustPlaced = useSelector((state) =>
    state.pastOrders?.single_past_order
      ? state.pastOrders?.single_past_order
      : {}
  );
  useEffect(() => {
    console.log("pastOrderId useEffect", pastOrderId);
    dispatch(fetchSinglePastOrderThunk(pastOrderId));
    window.scroll(0, 0);
  }, []);
  console.log("orderJustPlaced", orderJustPlaced);
  return (
    <div>
      <div className="xmark-container1" onClick={closeModal}>
        <i className="fa-solid fa-xmark"></i>
      </div>
      receipt
      {}
    </div>
  );
}

export default PastOrderReceiptModal;
