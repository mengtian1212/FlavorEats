import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteCartThunk, reorderThunk } from "../../store/orders";
import CartModal from "../Carts/CartModal";
import React, { useState } from "react";
import { useDeliveryMethod } from "../../context/DeliveryMethodContext";

function NewCartModal({ pastOrder, currCart }) {
  const dispatch = useDispatch();
  const { setModalContent, setModalClass, closeModal } = useModal();
  const [isAdded, setIsAdded] = useState(false);

  const restaurantTitle =
    pastOrder?.restaurant_name +
    " (" +
    pastOrder?.restaurant_address.split(",")[0] +
    ")";

  const { isDeliveryT } = useDeliveryMethod();
  const handleDeleteCreateCart = async () => {
    setIsAdded(true);
    await dispatch(deleteCartThunk(currCart?.id));
    const newCart = await dispatch(reorderThunk(pastOrder.id, isDeliveryT));
    setTimeout(() => {
      closeModal();
      setModalContent(<CartModal restaurantId={newCart?.restaurant_id} />);
      setModalClass("cart-modal");
    }, 1000);
  };

  return (
    <div className="new-cart-modal">
      <div className="xmark-container2" onClick={closeModal}>
        <i className="fa-solid fa-xmark"></i>
      </div>
      <img
        src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/7ad7d24ce676b316.svg"
        alt=""
      />
      <div className="new-cart-container">
        <div className="new-cart-t">Start a new cart</div>
        <div className="new-cart-text">
          You already have a cart at {restaurantTitle}. Would you like to add
          items to a new cart? (Your current cart will be replaced)
        </div>
        {!isAdded && (
          <button className="reorder-btn2" onClick={handleDeleteCreateCart}>
            Continue
          </button>
        )}
        {isAdded && (
          <button className={`reorder-btn2 ${isAdded ? "colorg" : ""}`}>
            Reordering...
          </button>
        )}

        {!isAdded && (
          <button className="reorder-btn9" onClick={closeModal}>
            Cancel
          </button>
        )}
        {isAdded && (
          <button
            className={`reorder-btn9 ${isAdded ? "colorg" : ""}`}
            onClick={closeModal}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

export default NewCartModal;
