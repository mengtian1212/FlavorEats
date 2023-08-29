import "./AddToCartBtn.css";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useState, useEffect, useRef } from "react";

import ItemModal from "./ItemModal";
import { deleteCartItemThunk, updateCartItemThunk } from "../../store/orders";

function AddToCartBtn({ item }) {
  // if there is no current cart for this restaurant, then button should be "+", click to open menuItem modal
  // if there is cart for this restaurant
  //     1.  item not in cart, then button should be "+"
  //     2.  item in cart, 2.1 quantity = 1, then button should be "1", click to open modal: "trashbin 1 + "
  //                       2.2 quantity > 1, then button should be "n", click to open modal: "   -     1 + "
  const dispatch = useDispatch();
  const orderItem = useSelector((state) =>
    state.orders ? state.orders[item.restaurant_id]?.order_items[item.id] : {}
  );

  const [showAddToCartDrop, setShowAddToCartDrop] = useState(false);
  const ulRef = useRef();
  // <OpenModalButton
  //   buttonText={<i className="fa-solid fa-plus item-plus cursor"></i>}
  //   // onItemClick={closeMenu}
  //   modalComponent={<ItemModal item={item} />}
  //   myClass="btn-location"

  const { setModalContent, setModalClass } = useModal();
  const handleClickPlus = () => {
    setModalContent(<ItemModal item={item} />);
    // setModalClass("cart-modal");
  };
  const handleClickQuantity = () => {
    if (showAddToCartDrop) return;
    setShowAddToCartDrop(true);
  };

  const handleClickTrash = async () => {
    await dispatch(
      deleteCartItemThunk(
        orderItem?.order_id,
        orderItem?.item_id,
        item?.restaurant_id
      )
    );
  };

  const handleClickMinus = async () => {
    const updatedOrderItem = {
      id: orderItem?.id,
      order_id: orderItem?.order_id,
      item_id: orderItem?.item_id,
      quantity: parseInt(orderItem?.quantity) - 1,
    };
    await dispatch(updateCartItemThunk(updatedOrderItem));
  };

  const handleClickAdd = async () => {
    if (parseInt(orderItem?.quantity) === 98) return;
    const updatedOrderItem = {
      id: orderItem?.id,
      order_id: orderItem?.order_id,
      item_id: orderItem?.item_id,
      quantity: parseInt(orderItem?.quantity) + 1,
    };
    await dispatch(updateCartItemThunk(updatedOrderItem));
  };

  useEffect(() => {
    if (!showAddToCartDrop) return;

    const closeAddToCartDrop = (e) => {
      if (!ulRef.current || !ulRef.current.contains(e.target)) {
        setShowAddToCartDrop(false);
      }
    };

    document.addEventListener("click", closeAddToCartDrop);

    return () => document.removeEventListener("click", closeAddToCartDrop);
  }, [showAddToCartDrop]);

  return (
    <>
      {orderItem && Object.values(orderItem).length > 0 && (
        <>
          <div className="item-plus1" onClick={handleClickQuantity}>
            {orderItem?.quantity}
          </div>
          <div
            className={
              "profile-dropdown1" + (showAddToCartDrop ? "" : "hidden")
            }
            style={showAddToCartDrop ? { transform: "translateX(-100%)" } : {}}
            ref={ulRef}
          >
            {orderItem?.quantity === 1 ? (
              <i
                className="fa-solid fa-trash-can item-plus2 cursor"
                onClick={handleClickTrash}
              ></i>
            ) : (
              <i
                className="fa-solid fa-minus item-plus2 cursor"
                onClick={handleClickMinus}
              ></i>
            )}
            <div className="middle-q"> {orderItem?.quantity}</div>
            <i
              className="fa-solid fa-plus item-plus2 cursor"
              onClick={handleClickAdd}
            ></i>
          </div>
        </>
      )}
      {!orderItem && (
        <i
          className="fa-solid fa-plus item-plus cursor"
          onClick={handleClickPlus}
        ></i>
      )}
    </>
  );
}

export default AddToCartBtn;
