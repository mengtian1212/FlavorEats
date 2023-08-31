import "./SingleRestaurant.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOneRestaurantThunk } from "../../store/restaurants";
import { useLayoutEffect } from "react";
import { getMenuItemsByType } from "../../utils/helper-functions";
import Navigation from "../Navigation";
import MenuItems from "./MenuItems";
import ReviewSection from "../ReviewSection";
import { fetchAllReviewsThunk } from "../../store/reviews";
import RestaurantMap from "./RestaurantMap";

function SingleRestaurant() {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const targetRestaurant = useSelector((state) =>
    state.restaurants?.singleRestaurant
      ? state.restaurants?.singleRestaurant
      : {}
  );
  const reviews = useSelector((state) => Object.values(state.reviews));
  let avgRating = 0;
  if (reviews.length > 0) {
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    avgRating = total / reviews.length;
  }

  let groups = targetRestaurant?.cusine_types?.split("#");

  const capitalize = (text) => {
    return text.charAt(0).toUpperCase() + text.substr(1);
  };
  const clamp = (value) => Math.max(0, value);

  const isBetween = (value, floor, ceil) => value >= floor && value <= ceil;
  const useScrollspy = (ids, offset = 0) => {
    const [activeId, setActiveId] = useState("");

    useLayoutEffect(() => {
      const listener = () => {
        const scroll = window.pageYOffset;

        const position = ids
          .map((id) => {
            const element = document.getElementById(id);

            if (!element) return { id, top: -1, bottom: -1 };

            const rect = element.getBoundingClientRect();
            const top = clamp(rect.top + scroll - offset);
            const bottom = clamp(rect.bottom + scroll - offset);

            return { id, top, bottom };
          })
          .find(({ top, bottom }) => isBetween(scroll, top, bottom));

        setActiveId(position?.id || "");
      };

      listener();

      window.addEventListener("resize", listener);
      window.addEventListener("scroll", listener);

      return () => {
        window.removeEventListener("resize", listener);
        window.removeEventListener("scroll", listener);
      };
    }, [ids, offset]);

    return activeId;
  };

  useEffect(() => {
    dispatch(fetchOneRestaurantThunk(restaurantId));
    dispatch(fetchAllReviewsThunk(restaurantId));
    window.scroll(0, 0);
  }, [restaurantId]);

  const items = getMenuItemsByType(
    targetRestaurant?.popular,
    targetRestaurant?.menuitems
  );

  const ids = Object.keys(items);
  const activeId = useScrollspy(ids, 54); // 54 is navigation height
  return (
    <div className="mw">
      <Navigation />
      <div>
        <img
          src={targetRestaurant.image_url}
          alt=""
          className="restaurant-photo"
        />
        <div className="res-title-container">
          <div className="res-name">{targetRestaurant.name}</div>
          <div className="res-stat-container">
            <div className="res-rating-container">
              {avgRating > 0 && <i className="fa-solid fa-star"></i>}
              {avgRating > 0 && avgRating.toFixed(1)}
            </div>
            <div>
              ({reviews.length} {reviews.length === 1 ? "rating" : "ratings"})
            </div>
            <div>• </div>
            <div>{groups && groups[0]}</div>
            <div>• </div>
            <div>{targetRestaurant.price_ranges}</div>
            <div>• </div>
            <a className="read-reviews" href="#reviews-block">
              Read Reviews{" "}
            </a>
            <div>• </div>
            <div>More info</div>
          </div>
          <div className="res-add">{targetRestaurant?.address}</div>
        </div>
      </div>
      <div className="res-bottom-container">
        <div className="header">
          <ul className="menu">
            {ids.map((id) => (
              <li key={`menu-item-${id}`} className="menu-item">
                <a
                  href={`#${id}`}
                  className={`menu-link ${
                    id === activeId ? "menu-link-active" : ""
                  }`}
                >
                  {capitalize(id)}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <main>
          {ids.map((id) => (
            <section key={`section-${id}`} id={id} className="sectionItems">
              <div className="item-type-name">{capitalize(id)}</div>
              <MenuItems type={id} items={items[id]} />
            </section>
          ))}
        </main>
      </div>
      <div id="reviews-block">
        {targetRestaurant && <ReviewSection resName={targetRestaurant?.name} />}
      </div>
      {/* <RestaurantMap /> */}
      {/* {targetRestaurant && (
        <MapContainer lat={targetRestaurant?.lat} lng={targetRestaurant?.lng} />
      )} */}
    </div>
  );
}

export default SingleRestaurant;
