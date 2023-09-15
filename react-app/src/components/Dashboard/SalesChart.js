import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSalesThunk } from "../../store/restaurants";

function SalesChart({ restaurantId }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  let sales = useSelector((state) =>
    state.restaurants.sales ? state.restaurants.sales : {}
  );

  useEffect(() => {
    if (restaurantId)
      dispatch(fetchSalesThunk(restaurantId)).then(() => setIsLoading(false));
  }, [dispatch, restaurantId]);
  return (
    <>
      {!isLoading && (
        <div className="dash__menu-item-rating-container">
          sales chart
          <div>{Object.values(sales)[0]}</div>
        </div>
      )}
    </>
  );
}

export default SalesChart;
