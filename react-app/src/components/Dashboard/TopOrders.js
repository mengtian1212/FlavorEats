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

  function formatDate(inputDateStr) {
    const inputDate = new Date(inputDateStr);
    const dayOfWeek = inputDate.toLocaleDateString("en-US", {
      weekday: "short",
    });
    const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
    const dayOfMonth = inputDate.getDate().toString().padStart(2, "0");
    const year = inputDate.getFullYear();

    return `${dayOfWeek} ${month}/${dayOfMonth}/${year}`;
  }

  return (
    <div className="dash__menu-item-rating-container">
      {!isLoading && (
        <div>
          <div className="dash__title">Top Eats</div>
          <div className="dash__subtitle">Keep track of big orders</div>
          <div className="dash__main">
            {topOrders.length !== 0 &&
              topOrders.map((order, index) => (
                <div key={index} className="dash_entry2">
                  <div className="dash_topleft">
                    <img src={order.user_image_url} alt="" />
                    <div className="dash_oname">
                      {order.user_firstname} {order.user_lastname[0]}
                    </div>
                  </div>

                  <div className="dash_top">
                    <div className="dash_topp1">
                      ${order.total_price.toFixed(2)}
                    </div>
                    <div className="dash_topp2">
                      <div className="dash__subtitle">
                        {" "}
                        {order && formatDate(order?.created_at)}
                      </div>
                      <div className="dash__subtitle">
                        {order.is_pickup
                          ? "Pick up"
                          : order.is_priority
                          ? "Priority delivery"
                          : "Standard delivery"}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            {topOrders.length === 0 && <div className="no-data">No data</div>}
          </div>
        </div>
      )}
    </div>
  );
}

export default TopOrders;
