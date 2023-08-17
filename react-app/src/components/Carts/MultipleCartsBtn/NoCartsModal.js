import "./NoCartsModal.css";
import { useModal } from "../../../context/Modal";
import { useHistory } from "react-router-dom";

function NoCartsModal() {
  const { closeModal } = useModal();
  const history = useHistory();
  const handleStartShop = () => {
    closeModal();
    history.push("/restaurants");
    window.scroll(0, 0);
  };

  return (
    <>
      <div className="xmark-container1" onClick={closeModal}>
        <i className="fa-solid fa-xmark"></i>
      </div>
      <div className="empty-cart-container">
        <img
          src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/a023a017672c2488.svg"
          alt=""
          className="empty-cart-img"
        />
        <div className="empty-cart-title">Add items to start a cart</div>
        <div className="empty-cart-desc">
          Once you add items from a restaurant or store, your cart will appear
          here.
        </div>
        <button
          className="empty-cart-start-shop cursor"
          onClick={handleStartShop}
        >
          Start shopping
        </button>
      </div>
    </>
  );
}

export default NoCartsModal;
