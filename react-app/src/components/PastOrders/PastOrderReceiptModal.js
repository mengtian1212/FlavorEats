import "./PastOrderReceiptModal.css";
import { useModal } from "../../context/Modal";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSinglePastOrderThunk } from "../../store/pastOrders";

export function OrderItem({ order_item }) {
  return (
    <div className="single-item-container">
      <div className="receipt-item">
        <div className="sing-item-qn1">
          <div className="single-item-quantity">{order_item.quantity}</div>
          <div className="single-item-name">{order_item.item_name}</div>
        </div>
        <div className="single-item-name">
          ${parseFloat(order_item.item_subtotal).toFixed(2)}
        </div>
      </div>
    </div>
  );
}

function PastOrderReceiptModal({ pastOrderId, restaurantId, resName }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [isLoading, setIsLoading] = useState(true);

  let orderJustPlaced = useSelector((state) =>
    state.pastOrders?.single_past_order
      ? state.pastOrders?.single_past_order
      : {}
  );
  useEffect(() => {
    dispatch(fetchSinglePastOrderThunk(pastOrderId)).then(() =>
      setIsLoading(false)
    );
    window.scroll(0, 0);
  }, []);

  const inputDate = new Date(orderJustPlaced.created_at);

  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = inputDate.toLocaleDateString(undefined, options);

  return (
    <>
      {!isLoading && (
        <div className="receipt-outer">
          <div className="xmark-container1" onClick={closeModal}>
            <i className="fa-solid fa-xmark"></i>
          </div>

          <section
            className="receipt-sec1"
            style={{ backgroundColor: "rgb(255, 242, 217)" }}
          >
            <div className="logo-container">
              <div className="logo-flavor">Flavor</div>
              <div className="logo-eats1">Eats</div>
            </div>
            <div className="receipt-t0">
              <div className="receipt-total">
                <div>Total</div>
                <div className="receipt-totals">
                  ${parseFloat(orderJustPlaced.total_price).toFixed(2)}
                </div>
              </div>
              <div>{formattedDate}</div>
            </div>
          </section>

          <section
            className="receipt-sec2"
            style={{ backgroundColor: "rgb(255, 242, 217)" }}
          >
            <div className="receipt-thank0">Thanks for tipping, </div>
            <div className="receipt-thank">{sessionUser.first_name}</div>
            <div className="receipt-thank1">
              Here's your receipt for {orderJustPlaced.restaurant_name} (
              {orderJustPlaced.restaurant_city}).
            </div>
          </section>

          <section className="receipt-sec3">
            <img
              src="https://d1a3f4spazzrp4.cloudfront.net/emails/2017/01/receipt_18_headerbg.png"
              alt=""
              className="receipt-back"
              style={{ backgroundColor: "rgb(255, 242, 217)" }}
            />
            <img
              src="https://d1a3f4spazzrp4.cloudfront.net/receipt_v3/uber_one_eats.png"
              alt=""
              className="avocado-img2"
            />
          </section>

          <section className="receipt-sec4">
            <div className="checkout-t">Order Details</div>
          </section>

          <div class="vert-line1"></div>
          <div className="order-item-container1">
            {orderJustPlaced?.order_items &&
              Object.values(orderJustPlaced?.order_items).map(
                (order_item, index) => (
                  <OrderItem
                    key={index}
                    index={index}
                    order_item={order_item}
                  />
                )
              )}
          </div>

          <div class="vert-line1"></div>
          <div className="receipt-fees">
            <div className="single-fee-container">
              <div className="receipt-sub">Subtotal</div>
              <div className="receipt-sub">
                ${parseFloat(orderJustPlaced?.subtotal).toFixed(2)}
              </div>
            </div>
            {!orderJustPlaced?.is_pickup && (
              <div className="single-fee-container">
                <div>Delivery Fee</div>
                <div>
                  ${parseFloat(orderJustPlaced.delivery_fee).toFixed(2)}
                </div>
              </div>
            )}
            {!orderJustPlaced?.is_pickup && orderJustPlaced?.is_priority && (
              <div className="single-fee-container">
                <div>Priority Delivery</div>
                <div>$2.99</div>
              </div>
            )}
            <div className="single-fee-container">
              <div>Tip</div>
              <div>${parseFloat(orderJustPlaced.tip).toFixed(2)}</div>
            </div>
          </div>
          <div class="vert-line1"></div>

          <section className="receipt-sec5">
            <div className="checkout-t">Total</div>
            <div className="checkout-t">
              ${parseFloat(orderJustPlaced.total_price).toFixed(2)}
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default PastOrderReceiptModal;
