import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopOrdersThunk } from "../../store/restaurants";

function TopOrders({ restaurantId }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const topOrders = useSelector((state) => state.restaurants.topOrders);
  useEffect(() => {
    dispatch(fetchTopOrdersThunk(restaurantId)).then(() => setIsLoading(false));
    window.scroll(0, 0);
  }, [restaurantId]);

  return (
    <div className="dash__menu-item-rating-container">
      {!isLoading && (
        <div>
          Top Eats{" "}
          {topOrders.length !== 0 &&
            topOrders.map((order, index) => (
              <div key={index} className="dash__menu-item-rating">
                <div>{order.total_price}</div>
                <div>{order.created_at}</div>
                <img src={order.user_image_url} alt="" />
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default TopOrders;
