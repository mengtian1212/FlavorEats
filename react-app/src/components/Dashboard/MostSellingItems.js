import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopSellingItemsThunk } from "../../store/restaurants";

function MostSellingItems({ restaurantId }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const mostSellingItems = useSelector(
    (state) => state.restaurants.topSellingItems
  );
  useEffect(() => {
    dispatch(fetchTopSellingItemsThunk(restaurantId)).then(() =>
      setIsLoading(false)
    );
    window.scroll(0, 0);
  }, [restaurantId]);

  return (
    <>
      {!isLoading && (
        <div className="dash__menu-item-rating-container">
          <div className="dash__title">Top Selling Items</div>
          <div className="dash__subtitle">Ranked by order volume</div>
          <div className="dash__main">
            {mostSellingItems?.map((item, index) => (
              <div key={index} className="dash_entry">
                <div className="dash_sell">
                  <div className="dash__index">0{index + 1}</div>
                  <div className="dash_sellq">{item[2]}</div>
                </div>
                <div className="dash_sellq">{item[1]}</div>
              </div>
            ))}
            {mostSellingItems.length === 0 && (
              <div className="no-data">No data</div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default MostSellingItems;
