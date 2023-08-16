import "./MultipleCartsBtn.css";
import { useSelector } from "react-redux";

function MultipleCartsBtn({ restaurantId }) {
  const carts = useSelector((state) => (state.orders ? state.orders : {}));
  const cartsArr = carts && Object.values(carts);

  return (
    <button className="btn-black3 cursor">
      <i className="fa-solid fa-cart-shopping"></i>
      {cartsArr?.length} {cartsArr?.length === 1 ? "cart" : "carts"}{" "}
      <i className={`fa-solid fa-chevron-down arrow`}></i>
    </button>
  );
}

export default MultipleCartsBtn;
