import "./MultipleCartsBtn.css";
import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import CartInDropdown from "./CartInDropdown";

function MultipleCartsBtn({ restaurantId }) {
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
  return (
    <div className="multi-carts-container">
      <button className="btn-black3 cursor" onClick={openMenu}>
        <i className="fa-solid fa-cart-shopping"></i>
        {cartsArr?.length} {cartsArr?.length === 1 ? "cart" : "carts"}{" "}
        <i className={`fa-solid fa-chevron-down arrow`}></i>
      </button>
      <div
        className={`shopping-dropdown` + (showMenu ? "" : " hidden")}
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
  );
}

export default MultipleCartsBtn;
