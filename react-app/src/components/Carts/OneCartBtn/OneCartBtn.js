import "./OneCartBtn.css";
import { useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import CartModal from "../CartModal";

function OneCartBtn({ restaurantId }) {
  const currentCart = useSelector((state) =>
    state.orders ? state.orders[restaurantId] : {}
  );

  const { setModalContent, setModalClass } = useModal();
  const handleClickOneCart = () => {
    setModalContent(<CartModal restaurantId={restaurantId} />);
    setModalClass("cart-modal");
  };

  // {hasAuthToEdit && (
  //   <OpenModalButton
  //     buttonText="Edit Board"
  //     onItemClick={closeMenu}
  //     modalComponent={<EditBoard board={singleBoard} />}
  //   />
  // )}

  // function OpenModalButton({
  //   modalComponent, // component to render inside the modal
  //   buttonText, // text of the button that opens the modal
  //   onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  //   onModalClose, // optional: callback function that will be called once the modal is closed
  //   myClass,
  // }) {

  return (
    <button className="btn-black2 cursor">
      <div className="btn-items" onClick={handleClickOneCart}>
        <img
          src={currentCart.restaurant_image}
          alt=""
          className="cart-res-favicon"
        />
        {currentCart.num_items} {currentCart.num_items === 1 ? "item" : "items"}
      </div>
      <div className="seperate-line"></div>
      <div className="btn-carts">
        <i className={`fa-solid fa-cart-shopping`}></i>
        <i className={`fa-solid fa-chevron-down arrow`}></i>
      </div>
    </button>
  );
}

export default OneCartBtn;
