import "./CartModal.css";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { deleteCartThunk } from "../../../store/orders";
import ItemInCart from "./ItemInCart";

function CartModal({ restaurantId }) {
  const sessionUser = useSelector((state) => state.session.user);
  const userAddress =
    sessionUser.address.split(",")[0] + "," + sessionUser.address.split(",")[1];
  const history = useHistory();
  const dispatch = useDispatch();
  const currentCart = useSelector((state) =>
    state.orders ? state.orders[restaurantId] : {}
  );
  const orderItems = currentCart && Object.values(currentCart?.order_items);
  const { closeModal } = useModal();
  const handleClickResName = (e) => {
    closeModal();
    history.push(`/restaurants/${currentCart?.restaurant_id}`);
    window.scroll(0, 0);
  };
  const handleDeleteCart = async () => {
    await dispatch(deleteCartThunk(currentCart?.id));
    closeModal();
    window.scroll(0, 0);
  };
  const handleCheckoutCart = () => {
    history.push(`/checkout`, { currentCart: currentCart });
    closeModal();
    window.scroll(0, 0);
  };

  useEffect(() => {
    if (!currentCart) {
      closeModal();
    }
  }, [currentCart, closeModal]);

  return (
    <>
      {currentCart && orderItems?.length > 0 && (
        <>
          <div className="xmark-container1" onClick={closeModal}>
            <i className="fa-solid fa-xmark"></i>
          </div>
          <div className="cart-modal-container">
            <div className="cart-title-container">
              <div className="cart-tleft">
                <div className="cart-rr cursor" onClick={handleClickResName}>
                  {currentCart?.restaurant_name} (
                  {currentCart?.restaurant_address.split(",")[0]})
                </div>
                {!currentCart?.is_pickup && (
                  <div className="cart-dd">Deliver to {userAddress}</div>
                )}
                {currentCart?.is_pickup && (
                  <div className="cart-dd">
                    Pickup at {currentCart?.restaurant_address.trim()}
                  </div>
                )}
              </div>
              {/* <div className="cart-tright">
                <i className="fa-solid fa-ellipsis cursor btn-grey btn-grey2"></i>
              </div> */}
            </div>
            <div className="cart-2">
              <div className="cart-2-num">
                {currentCart?.num_items}{" "}
                {currentCart?.num_items === 1 ? "item" : "items"}
              </div>
              <div className="cart-2-sub">
                <div className="cart-2-subtotal">Subtotal:</div>
                <div className="cart-2-num">
                  ${currentCart?.subtotal.toFixed(2)}
                </div>
              </div>
            </div>

            <div className="cart-items-container">
              <div className="vert-line"></div>
              {orderItems &&
                orderItems?.map((orderItem, index) => (
                  <ItemInCart
                    restaurantId={restaurantId}
                    orderItemId={orderItem?.item_id}
                    key={index}
                  />
                ))}
            </div>

            <div className="cart-3">
              <div>
                <div className="cart-3-sub">Subtotal</div>
                <div className="cart-3-des">Fees applied at Checkout</div>
              </div>
              <div className="cart-3-sub">
                ${currentCart.subtotal.toFixed(2)}
              </div>
            </div>
            <div className="sti">
              <div className="cart-4">
                <button className="reorder-btn2" onClick={handleCheckoutCart}>
                  Go to Checkout
                </button>
                <button className="reorder-btn3" onClick={handleClickResName}>
                  Add Items
                </button>
                <button className="reorder-btn4" onClick={handleDeleteCart}>
                  <i className="fa-solid fa-trash-can"></i>
                  <div>Clear Cart</div>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default CartModal;
