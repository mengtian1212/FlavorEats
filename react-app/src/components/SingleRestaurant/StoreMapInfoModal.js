import "./StoreMapInfoModal.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchOneRestaurantThunk } from "../../store/restaurants";
import { fetchAllReviewsThunk } from "../../store/reviews";
import StoreDirectionMapContainer from "./Maps";

function StoreMapInfoModal({ restaurantId }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [isLoading, setIsLoading] = useState(true);
  const restaurant = useSelector((state) =>
    state.restaurants?.singleRestaurant && !isLoading
      ? state.restaurants?.singleRestaurant
      : {}
  );

  // function calculateDistance(lat1, lng1, lat2, lng2) {
  //   const earthRadius = 6371; // Earth's radius in kilometers

  //   const dLat = (lat2 - lat1) * (Math.PI / 180);
  //   const dLng = (lng2 - lng1) * (Math.PI / 180);

  //   const a =
  //     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  //     Math.cos(lat1 * (Math.PI / 180)) *
  //       Math.cos(lat2 * (Math.PI / 180)) *
  //       Math.sin(dLng / 2) *
  //       Math.sin(dLng / 2);

  //   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  //   const distance = earthRadius * c;
  //   return distance; // Distance in kilometers
  // }

  // const distance = calculateDistance(
  //   sessionUser?.lat,
  //   sessionUser?.lng,
  //   restaurant?.lat,
  //   restaurant?.lng
  // );
  // console.log("distance", distance);

  useEffect(() => {
    dispatch(fetchOneRestaurantThunk(restaurantId)).then(() =>
      setIsLoading(false)
    );
  }, [restaurantId]);

  return (
    <>
      {!isLoading && (
        <div>
          <div className="store-map-container">
            {/* <div className="store-map-cover info-item">{distance}mi</div> */}
            <StoreDirectionMapContainer
              delivery_add={
                sessionUser && sessionUser?.address
                  ? sessionUser?.address?.split(",")[0]
                  : null
              }
              deliveryLat={
                sessionUser && sessionUser?.lat ? sessionUser?.lat : null
              }
              deliveryLng={
                sessionUser && sessionUser?.lng ? sessionUser?.lng : null
              }
              resName={restaurant?.name}
              resLat={restaurant?.lat}
              resLng={restaurant?.lng}
            />
          </div>
          <section className="store-info-wrap">
            <section className="info-sec1">
              <div className="res-name"> {restaurant.name}</div>
              <div className="res-add">
                {restaurant.cusine_types.split("#").join(" • ")}
                {restaurant.price_ranges && " • "}
                {restaurant.price_ranges || ""}
              </div>
            </section>
            <div className="vert-line2"></div>
            <section className="info-sec">
              <div className="info-entry">
                <div className="info-icon">
                  <i className="fa-solid fa-location-dot loc-dot1"></i>
                </div>
                <div className="info-item">{restaurant.address}</div>
              </div>
            </section>
            <div className="vert-line3"></div>
            <section className="info-sec">
              {restaurant.delivery_fee !== null && (
                <div className="info-entry">
                  <div className="info-icon">
                    <i className="fa-solid fa-truck loc-dot1"></i>
                  </div>
                  <div className="info-item">
                    $
                    {restaurant.delivery_fee === "0.00"
                      ? 0
                      : parseFloat(restaurant.delivery_fee).toFixed(2)}{" "}
                    Delivery Fee
                  </div>
                </div>
              )}
            </section>

            {restaurant.avg_rating >= 4 && <div className="vert-line2"></div>}
            {restaurant.avg_rating >= 4 && (
              // <section className="info-sec">
              <div className="info-entry">
                <div className="info-icon">
                  <img
                    src="https://d4p17acsd5wyj.cloudfront.net/bazaar/badge_top_eats.png"
                    alt=""
                    className="info-bestoverall"
                  />
                </div>
                <div className="info-item">
                  <div>Best overall</div>
                  <div className="res-add">
                    One of the best spots on Flavor Eats
                  </div>
                </div>
              </div>
              // </section>
            )}

            {restaurant.description && <div className="vert-line2"></div>}
            {/* <section className="info-sec"> */}
            <div className="info-entry">
              <div className="info-icon">
                <i className="fa-solid fa-book-open loc-dot1"></i>
              </div>
              <div className="info-item1">{restaurant.description}</div>
            </div>
            {/* </section> */}

            {restaurant.avg_rating !== 0 && <div className="vert-line2"></div>}
            {restaurant.avg_rating !== 0 && (
              <section className="info-sec">
                <div className="info-entry">
                  <div className="info-icon">
                    <i className="fa-solid fa-star loc-dot1"></i>
                  </div>
                  <div className="info-item">
                    {parseFloat(restaurant.avg_rating).toFixed(1)} (
                    {restaurant.num_rating} ratings)
                  </div>
                </div>
              </section>
            )}
          </section>
        </div>
      )}
    </>
  );
}

export default StoreMapInfoModal;
