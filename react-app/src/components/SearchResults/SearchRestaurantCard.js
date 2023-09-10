import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { tns } from "tiny-slider";

import OpenModalButton from "../OpenModalButton";
import ItemModal from "../SingleRestaurant/ItemModal";

function SearchRestaurantCard({ restaurantId }) {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const restaurant = useSelector(
    (state) =>
      state.search?.search_results && state.search?.search_results[restaurantId]
  );

  const percentage = (restaurant?.avg_rating / 5) * 100;
  const resAddress = restaurant?.address.split(",")[0];
  //   const items = useSelector(
  //     (state) =>
  //       restaurant && state.search?.search_results[restaurant.id]?.menuitems
  //   );
  const items = restaurant?.menuitems;

  const [itemsShow, setItemsShow] = useState(items);

  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    setItemsShow(() => restaurant?.menuitems);
    if (restaurant?.menuitems && restaurant?.menuitems.length !== 0) {
      if (!showMenu) return;

      const closeMenu = (e) => {
        if (!ulRef.current || !ulRef.current.contains(e.target)) {
          setShowMenu(false);
        }
      };

      document.addEventListener("click", closeMenu);

      return () => {
        document.removeEventListener("click", closeMenu);
      };
    }
  }, [restaurant, showMenu]);

  return (
    <>
      {restaurant && (
        <div className="search-card-container">
          <div className="search-title-container">
            <img
              src={restaurant?.image_url}
              alt=""
              className="search-res-img cursor"
              onClick={() => history.push(`/restaurants/${restaurant.id}`)}
            />
            <div className="search-resn">
              <div className="search-title">
                <div className="search-rname">
                  {restaurant?.name} ({resAddress})
                </div>
                <div
                  className="vs"
                  onClick={() => history.push(`/restaurants/${restaurant?.id}`)}
                >
                  View store
                </div>
              </div>
              <div className="search-stat">
                <div className="restaurant-card-stars restaurant-delivery">
                  {restaurant?.avg_rating > 0 &&
                    restaurant?.avg_rating.toFixed(1)}
                  {restaurant?.avg_rating > 0 && (
                    <div className="ratings restaurant-delivery">
                      <div className="empty-stars"></div>
                      <div
                        className="full-stars restaurant-delivery"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  )}
                </div>
                {restaurant?.avg_rating > 0 && (
                  <div className="restaurant-delivery"> &nbsp; • &nbsp;</div>
                )}
                <div className="restaurant-delivery">
                  $
                  {restaurant?.delivery_fee === "0.00"
                    ? 0
                    : restaurant?.delivery_fee}{" "}
                  Delivery Fee • {restaurant?.price_ranges}{" "}
                  {sessionUser &&
                    restaurant?.distance <= 1 &&
                    `• ${Math.floor(restaurant?.distance * 1000)}m`}
                  {sessionUser &&
                    restaurant?.distance > 1 &&
                    restaurant?.distance < 1000 &&
                    `• ${restaurant?.distance.toFixed(1)}km`}
                  {sessionUser &&
                    restaurant?.distance >= 1000 &&
                    `• ${Math.floor(restaurant?.distance)}km`}
                </div>
              </div>
            </div>
          </div>
          {itemsShow && itemsShow.length > 0 && (
            <div className="slider-container-near2">
              {itemsShow?.map((item, i) => {
                return (
                  <div key={i}>
                    <div className="slide-outer-near2">
                      <div className="slide-near1 menu-container2">
                        <div className="item-img-container2">
                          <img
                            src={item.image_url}
                            alt=""
                            className="item-img3"
                          />
                          <div className="item-background"></div>
                          <OpenModalButton
                            buttonText="Quick view"
                            onItemClick={closeMenu}
                            modalComponent={<ItemModal item={item} />}
                            myClass="img-quick-view2 cursor"
                          />
                        </div>
                        <div className="item-name-text2">{item.item_name}</div>
                        <div className="price-calory">
                          <div className="item-price">${item.price}</div>
                          {item.calory !== null && (
                            <div className="item-calory">•</div>
                          )}
                          {item.calory !== null && (
                            <div className="item-calory">
                              {parseInt(item.calory)} Cal.
                            </div>
                          )}
                        </div>
                        {item.like_ratio > 0 && (
                          <div className="item-likes-container">
                            <i className="fa-solid fa-thumbs-up"></i>
                            <div>
                              {Math.floor(item.like_ratio.toFixed(2) * 100)}%
                            </div>
                            <div>({item.num_likes > 0 && item.num_likes})</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default SearchRestaurantCard;
