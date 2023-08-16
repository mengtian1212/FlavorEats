import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./AddToCartBtn.css";

import OpenModalButton from "../OpenModalButton";
import ItemModal from "./ItemModal";

function AddToCartBtn({ item }) {
  // if there is no current cart for this restaurant, then button should be "+", click to open menuItem modal
  // if there is cart for this restaurant
  //     1.  item not in cart, then button should be "+"
  //     2.  item in cart, 2.1 quantity = 1, then button should be "1", click to open modal: "trashbin 1 + "
  //                       2.2 quantity > 1, then button should be "n", click to open modal: "   -     1 + "
  const dispatch = useDispatch();
  const { setModalContent, setModalClass } = useModal();
  const orderItem = useSelector((state) =>
    state.orders ? state.orders[item.restaurant_id]?.order_items[item.id] : {}
  );
  console.log("orderItem:", orderItem);
  // <OpenModalButton
  //   buttonText={<i className="fa-solid fa-plus item-plus cursor"></i>}
  //   // onItemClick={closeMenu}
  //   modalComponent={<ItemModal item={item} />}
  //   myClass="btn-location"

  return (
    <>
      {orderItem && Object.values(orderItem).length > 0 && (
        <div className="item-plus1">{orderItem?.quantity}</div>
      )}
    </>
  );
}

export default AddToCartBtn;
