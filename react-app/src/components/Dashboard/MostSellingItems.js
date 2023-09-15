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
          most selling items
          {mostSellingItems?.map((item, index) => (
            <div key={index}>
              <div>{item[2]}</div>
              <div>{item[1]}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default MostSellingItems;
