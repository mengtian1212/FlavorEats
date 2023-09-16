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
    <>
      {!isLoading && (
        <div className="dash__menu-item-rating-container">
          <div className="dash__title">Total Customers</div>
          <div className="dash_menu-item-num1">
            {returnedCustomersCount + newCustomersCount}
          </div>
          <div>
            <div className="ratings4">
              <div
                className="full-bar1"
                style={{
                  width: `${
                    (returnedCustomersCount + newCustomersCount > 0
                      ? returnedCustomersCount /
                        (returnedCustomersCount + newCustomersCount)
                      : 0) * 100
                  }%`,
                  backgroundColor: `#276ef1`,
                }}
              ></div>
            </div>
          </div>
          <div className="dash_entry3">
            <div className="dash_cum_container">
              <div className="dash_cum_container1">
                <i className="fa-solid fa-square-full dash_cum1"></i>
                <div>Return Customers</div>
              </div>
              <div>{returnedCustomersCount}</div>
            </div>
            <div className="dash_cum_container">
              <div className="dash_cum_container1">
                <i className="fa-solid fa-square-full dash_cum2"></i>
                <div>New Customers</div>
              </div>
              <div>{newCustomersCount}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CustomersInfo;
