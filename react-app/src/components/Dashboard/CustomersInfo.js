import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchCustomersInfoThunk } from "../../store/restaurants";

function CustomersInfo({ restaurantId }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const returnedCustomersCount = useSelector(
    (state) => state.restaurants.returnedCustomersCount
  );
  const newCustomersCount = useSelector(
    (state) => state.restaurants.newCustomersCount
  );

  useEffect(() => {
    dispatch(fetchCustomersInfoThunk(restaurantId)).then(() =>
      setIsLoading(false)
    );
    window.scroll(0, 0);
  }, [restaurantId]);

  return (
    <div className="dash__menu-item-rating-container">
      {!isLoading && (
        <div>
          customers info returnedCustomersCount:{returnedCustomersCount}
          newCustomersCount:{newCustomersCount}
        </div>
      )}
    </div>
  );
}

export default CustomersInfo;
