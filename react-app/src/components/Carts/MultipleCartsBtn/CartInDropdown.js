import { useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import CartModal from "../CartModal";

function CartInDropdown({ restaurantId, setShowMenu }) {
  const sessionUser = useSelector((state) => state.session.user);
  const userAddress =
    sessionUser.address.split(",")[0] + "," + sessionUser.address.split(",")[1];
  const targetCart = useSelector((state) =>
    state.orders ? state.orders[restaurantId] : {}
  );
  const { setModalContent, setModalClass } = useModal();
  const handleClickOneCart = () => {
    setModalContent(<CartModal restaurantId={restaurantId} />);
    setModalClass("cart-modal");
    setShowMenu(false);
  };

  return (
    <div className="single-cart cursor" onClick={handleClickOneCart}>
      <div className="single-cart-left">
        <img
          src={targetCart?.restaurant_image}
          alt=""
          className="cart-res-preview"
        />
        <div className="cart-content-container">
          <div className="cart-n">{targetCart?.restaurant_name}</div>
          <div className="cart-sub">${targetCart?.subtotal.toFixed(2)}</div>
          {!targetCart?.is_pickup && (
            <div className="cart-sub">Deliver to {userAddress}</div>
          )}
          {targetCart?.is_pickup && (
            <div className="cart-sub">
              Pickup at {targetCart?.restaurant_address}
            </div>
          )}
        </div>
      </div>
      <div className="single-cart-right">
        <div className="nitems">{targetCart?.num_items}</div>
        <i className="fa-solid fa-angle-right"></i>
      </div>
    </div>
  );
}

export default CartInDropdown;
