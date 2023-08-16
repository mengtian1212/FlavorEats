import "./CartModal.css";
import { useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import ItemInCart from "./ItemInCart";

function CartModal({ restaurantId }) {
  const currentCart = useSelector((state) =>
    state.orders ? state.orders[restaurantId] : {}
  );
  const orderItems = Object.values(currentCart?.order_items);
  const { closeModal } = useModal();

  return (
    <>
      <div className="xmark-container1" onClick={closeModal}>
        <i className="fa-solid fa-xmark"></i>
      </div>
      <div className="cart-modal-container">
        <div className="cart-title-container">
          <div className="cart-tleft">
            <div className="cart-rr cursor">{currentCart.restaurant_name}</div>
            <div className="cart-dd">
              Deliver to {currentCart.delivery_address.split(",")[0]}
            </div>
          </div>
          <div className="cart-tright">
            <i className="fa-solid fa-ellipsis cursor btn-grey btn-grey2"></i>
          </div>
        </div>
        <div className="cart-2">
          <div className="cart-2-num">
            {currentCart.num_items}{" "}
            {currentCart.num_items === 1 ? "item" : "items"}
          </div>
          <div className="cart-2-sub">
            <div className="cart-2-subtotal">Subtotal:</div>
            <div className="cart-2-num">${currentCart?.subtotal}</div>
          </div>
        </div>

        <div className="cart-items-container">
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
          <div className="cart-3-sub">${currentCart.subtotal}</div>
        </div>
        <div className="sti">
          <div className="cart-4">
            <button className="reorder-btn2">Go to checkout</button>
            <button className="reorder-btn3">Add items</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartModal;
