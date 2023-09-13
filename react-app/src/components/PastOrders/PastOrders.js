import "./PastOrders.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PastOrderCard from "./PastOrderCard";
import { fetchPastOrdersThunk } from "../../store/pastOrders";
import Navigation from "../Navigation";
import LoadingPage from "../auth/LoadingPage";

function PastOrders() {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  let pastOrders = Object.values(
    useSelector((state) =>
      state.pastOrders.all_past_orders ? state.pastOrders.all_past_orders : {}
    )
  );

  useEffect(() => {
    dispatch(fetchPastOrdersThunk()).then(() => setIsLoading(false));
    window.scroll(0, 0);
  }, [dispatch]);

  pastOrders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const handleStartShop = () => {
    history.push("/restaurants");
    window.scroll(0, 0);
  };

  return (
    <>
      <div className="mw">
        <Navigation />
        {!isLoading && (
          <div className="past-orders-container">
            <div id="past-orders-title">Past Orders</div>
            {Object.values(pastOrders).length !== 0 ? (
              <>
                {pastOrders.map((pastOrder, index) => (
                  <PastOrderCard
                    key={index}
                    index={index}
                    pastOrder={pastOrder}
                  />
                ))}
              </>
            ) : (
              <div className="no-past-order">
                <img
                  src="https://d1a3f4spazzrp4.cloudfront.net/receipt_v3/uber_one_eats.png"
                  alt=""
                  className="avocado-img1 no-past-gap"
                />
                <div className="no-past-title">
                  You haven't placed any orders yet
                </div>
                <div className="no-past-shop" onClick={handleStartShop}>
                  Click here to start shopping
                </div>
              </div>
            )}
          </div>
        )}
        {isLoading && <LoadingPage />}
      </div>
    </>
  );
}

export default PastOrders;
