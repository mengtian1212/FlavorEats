import "./OneCartBtn.css";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import CartModal from "../CartModal";
import CartInDropdown from "../MultipleCartsBtn/CartInDropdown";

function OneCartBtn({ restaurantId }) {
  const currentCart = useSelector((state) =>
    state.orders ? state.orders[restaurantId] : {}
  );

  const { setModalContent, setModalClass } = useModal();
  const handleClickOneCart = () => {
    setModalContent(<CartModal restaurantId={restaurantId} />);
    setModalClass("cart-modal open");
  };

  const carts = useSelector((state) => (state.orders ? state.orders : {}));
  const cartsArr = carts && Object.values(carts);

  const ulRef = useRef();
  const [showMenu, setShowMenu] = useState(false);
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  const closeMenu = () => setShowMenu(false);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current || !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

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
      <div className="btn-carts-container">
        <div className="btn-carts" onClick={openMenu}>
          <i className={`fa-solid fa-cart-shopping`}></i>
          <i className={`fa-solid fa-chevron-down arrow`}></i>
        </div>
        <div
          className={`shopping-dropdown1` + (showMenu ? "" : " hidden")}
          ref={ulRef}
        >
          {cartsArr &&
            cartsArr?.map((cart, index) => (
              <CartInDropdown
                restaurantId={cart.restaurant_id}
                key={index}
                setShowMenu={setShowMenu}
              />
            ))}
        </div>
      </div>
    </button>
  );
}

export default OneCartBtn;
