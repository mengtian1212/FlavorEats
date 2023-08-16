import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteCartItemThunk } from "../../../store/orders";

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
      dispatch(deleteCartItemThunk(orderItem?.order_id, orderItem?.item_id));
    } else {
      const updatedOrderItem = {
        id: orderItemId,
        order_id: orderItem.order_id,
        item_id: orderItem.item_id,
        quantity: parseInt(e.target.value),
      };
      //   dispatch(updateCartItemThunk(updatedOrderItem));
    }
  };

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
        <select
          value={orderItem.quantity}
          onChange={handleUpdateQuantity}
          className=""
        >
          <option value="0">Remove</option>
          {QUANTITYS.map((quantity) => (
            <option key={quantity} value={quantity}>
              {quantity}
            </option>
          ))}
        </select>
        <div className="cart-2-num">${orderItem?.item_subtotal}</div>
      </div>
      <div className="vert-line"></div>
    </div>
  );
}

export default ItemInCart;
