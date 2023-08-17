import "./CheckoutPage.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

function CheckoutPage() {
  const { restaurantId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const userAddress =
    sessionUser.address.split(",")[0] + "," + sessionUser.address.split(",")[1];
  const currentCart = useSelector((state) =>
    state.orders ? state.orders[restaurantId] : {}
  );
  const orderItems = currentCart && Object.values(currentCart?.order_items);
  console.log(restaurantId);
  return "checkkkkkkiung out";
}

export default CheckoutPage;
