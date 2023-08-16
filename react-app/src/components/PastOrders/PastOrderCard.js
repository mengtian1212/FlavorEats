import { useHistory } from "react-router-dom";
import { formatDate } from "../../utils/helper-functions";

function OrderItem({ order_item }) {
  return (
    <div className="single-item-container">
      <div className="single-item-quantity">{order_item.quantity}</div>
      <div className="single-item-name">{order_item.item_name}</div>
    </div>
  );
}

function PastOrderCard({ pastOrder }) {
  const history = useHistory();
  const order_items = Object.values(pastOrder?.order_items);
  const handleClickRestaurant = () => {
    history.push(`/restaurants/${pastOrder?.restaurant_id}`);
  };

  return (
    <div className="single-order-container">
      <div className="order-left-container">
        <div className="order-resimg-container">
          <img
            src={pastOrder?.restaurant_image}
            alt=""
            className="past-order-res-img cursor"
            onClick={handleClickRestaurant}
          ></img>
          <button
            className="img-quick-view1 cursor"
            onClick={handleClickRestaurant}
          >
            View store
          </button>
        </div>
        <div className="order-content-container">
          <div className="order-name cursor" onClick={handleClickRestaurant}>
            {pastOrder?.restaurant_name}
          </div>
          <div className="order-stat">
            <div>
              {pastOrder?.num_items} items for ${pastOrder?.total_price}
            </div>
            <div>· </div>
            <div>{formatDate(pastOrder?.updated_at)}</div>
            <div>· </div>
            <div>View receipt</div>
          </div>
          <div className="order-item-container">
            {pastOrder?.order_items &&
              order_items.map((order_item, index) => (
                <OrderItem key={index} index={index} order_item={order_item} />
              ))}
          </div>
        </div>
      </div>
      <div className="order-right-container">
        <div className="reorder-btn">
          <div>Reorder</div>
        </div>
        <div className="reorder-btn1">
          <div>Rate your order</div>
        </div>
      </div>
    </div>
  );
}

export default PastOrderCard;
