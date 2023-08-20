import { useSelector, useDispatch } from "react-redux";
import {
  deleteCartItemThunk,
  updateCartItemThunk,
} from "../../../store/orders";
import { useModal } from "../../../context/Modal";
import ItemModal from "../../SingleRestaurant/ItemModal";

function ItemInCart({ restaurantId, orderItemId }) {
  const dispatch = useDispatch();

  const orderItem = useSelector((state) =>
    state.orders ? state.orders[restaurantId].order_items[orderItemId] : {}
  );

  const QUANTITYS = [];
  for (let i = 1; i <= 98; i++) {
    QUANTITYS.push(i);
  }

  const handleUpdateQuantity = (e) => {
    if (e.target.value === orderItem.quantity) return;
    if (e.target.value === "0") {
      dispatch(
        deleteCartItemThunk(
          orderItem?.order_id,
          orderItem?.item_id,
          restaurantId
        )
      );
    } else {
      const updatedOrderItem = {
        id: orderItemId,
        order_id: orderItem.order_id,
        item_id: orderItem.item_id,
        quantity: parseInt(e.target.value),
      };
      dispatch(updateCartItemThunk(updatedOrderItem));
    }
  };
  // const { setModalContent, setModalClass } = useModal();
  // const handleClickOrderItem = () => {
  //   setModalContent(<ItemModal item={orderItem} />);
  //   setModalClass("item-modal");
  // };
  return (
    <div className="cart-item">
      <div className="cart-5">
        <div className="cart-2-num">{orderItem?.item_name}</div>
        <div className="i-con">
          <img src={orderItem.image_url} alt="" className="item-img2" />
          <div className="item-background"></div>
        </div>
      </div>
      <div className="cart-6">
        <div className="cart-6-select-container">
          <select
            value={orderItem.quantity}
            onChange={handleUpdateQuantity}
            className="cart-6-select"
          >
            <option value="0">Remove</option>
            {QUANTITYS.map((quantity) => (
              <option key={quantity} value={quantity}>
                {quantity}
              </option>
            ))}
          </select>
        </div>
        <div className="cart-3-num">${orderItem?.item_subtotal.toFixed(2)}</div>
      </div>
      <div className="vert-line"></div>
    </div>
  );
}

export default ItemInCart;
