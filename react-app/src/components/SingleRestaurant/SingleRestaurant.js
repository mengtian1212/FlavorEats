import "./SingleRestaurant.css";
import "../MainRestaurants/MainRestaurants.css";
import { useEffect, useState } from "react";
import { useLayoutEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import {
  addFavoriteThunk,
  deleteFavThunk,
  fetchAllRestaurantsThunk,
  fetchFavRestaurantsThunk,
  fetchNewestRestaurantThunk,
  fetchOneRestaurantThunk,
} from "../../store/restaurants";
import { getMenuItemsByType } from "../../utils/helper-functions";
import Navigation from "../Navigation";
import MenuItems from "./MenuItems";
import ReviewSection from "../ReviewSection";
import { fetchAllReviewsThunk } from "../../store/reviews";
import RestaurantMap from "./RestaurantMap";
import StoreMapInfoModal from "./StoreMapInfoModal";
import NotFoundPage from "../auth/NotFoundPage";
import LoadingPage from "../auth/LoadingPage";

function SingleRestaurant() {
  const { restaurantId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const sessionUser = useSelector((state) => state.session.user);
  const { setModalContent, setModalClass, closeModal } = useModal();

  const targetRestaurant = useSelector((state) =>
    state.restaurants?.singleRestaurant && !isLoading
      ? state.restaurants?.singleRestaurant
      : {}
  );
  const [hasMenu, setHasMenu] = useState(true);

  const reviews = useSelector((state) => Object.values(state.reviews));
  let avgRating = 0;
  if (reviews.length > 0) {
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    avgRating = total / reviews.length;
  }

  let groups = targetRestaurant?.cusine_types?.split("#");

  // for favorite/unfavorite restaurant
  const [sentenceText, setSentenceText] = useState("");
  const [heartIcon, setHeartIcon] = useState("");
  const [slideEffect, setSlideEffect] = useState("");

  const [isFavorite, setIsFavorite] = useState(targetRestaurant.is_fav);
  const [isHover, setIsHover] = useState(false);
  const handleToggleFavorite = async (e) => {
    e.stopPropagation();
    if (isFavorite) {
      setIsFavorite(false);
      setSlideEffect("slide-in");
      setSentenceText("Removed from favorites");
      setHeartIcon("regular");
      await dispatch(deleteFavThunk(targetRestaurant.id));
      await dispatch(fetchFavRestaurantsThunk());
      await dispatch(fetchAllRestaurantsThunk());
      await dispatch(fetchNewestRestaurantThunk());
    } else {
      setIsFavorite(true);
      setSlideEffect("slide-in");
      setSentenceText("Added to favorites");
      setHeartIcon("solid");
      await dispatch(addFavoriteThunk(targetRestaurant.id));
      await dispatch(fetchAllRestaurantsThunk());
      await dispatch(fetchFavRestaurantsThunk());
      await dispatch(fetchNewestRestaurantThunk());
    }

    setTimeout(() => {
      setSlideEffect("slide-out");
    }, 1000);
  };

  useEffect(() => {
    dispatch(fetchOneRestaurantThunk(restaurantId)).then(() => {
      setIsLoading(false);
    });
    dispatch(fetchAllReviewsThunk(restaurantId));
    window.scroll(0, 0);
  }, [restaurantId]);

  useEffect(() => {
    setIsFavorite(targetRestaurant.is_fav);
    setHasMenu(
      !isLoading &&
        targetRestaurant &&
        targetRestaurant?.menuitems &&
        Object.values(targetRestaurant?.menuitems).length
    );
  }, [targetRestaurant]);
  // end for favorite/unfavorite restaurant

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

  const items = getMenuItemsByType(
    targetRestaurant?.popular,
    targetRestaurant?.menuitems
  );

  const ids = Object.keys(items);
  const activeId = useScrollspy(ids, 54); // 54 is navigation height

  // Example: restaurantId === 1000 || abc
  if (
    (restaurantId && !Number.isInteger(parseInt(restaurantId))) ||
    (!isLoading &&
      targetRestaurant &&
      Object.values(targetRestaurant).length === 0)
  ) {
    return <NotFoundPage />;
  }

  return (
    <>
      <div className={`fav-notice-container ${slideEffect}`}>
        <i className={`fa-${heartIcon} fa-heart fasize`}></i>
        <div>{sentenceText}</div>
      </div>

      <div className="mw">
        <Navigation />
        {!isLoading && (
          <>
            <div>
              <div className="restaurant-photo-container">
                {/* <div className="heart-container"></div> */}
                <img
                  src={targetRestaurant.image_url}
                  alt=""
                  className="restaurant-photo"
                />
                {sessionUser && (
                  <>
                    <i
                      className={`fa-${
                        isFavorite
                          ? `solid solidred`
                          : isHover
                          ? `solid`
                          : `regular`
                      } fa-heart fav favsingle`}
                      onClick={handleToggleFavorite}
                      onMouseEnter={() => setIsHover(true)}
                      onMouseLeave={() => setIsHover(false)}
                    ></i>
                  </>
                )}
              </div>
              <div className="res-title-container">
                <div className="res-name">{targetRestaurant?.name}</div>
                <div className="res-stat-best">
                  {avgRating >= 4 && (
                    <img
                      src="https://d4p17acsd5wyj.cloudfront.net/bazaar/badge_top_eats.png"
                      alt=""
                      className="info-bestoverall1"
                    />
                  )}
                  <div>
                    <div className="res-stat-container">
                      <div className="res-rating-container">
                        <i className="fa-solid fa-star"></i>
                        {avgRating > 0 ? avgRating.toFixed(1) : "0"}
                      </div>
                      <div>
                        ({reviews.length}{" "}
                        {reviews.length === 1 ? "rating" : "ratings"})
                      </div>
                      <div>• </div>
                      <div>{groups && groups[0]}</div>
                      {targetRestaurant.price_ranges && <div>• </div>}
                      <div>{targetRestaurant.price_ranges}</div>
                      <div>• </div>
                      <a
                        className="read-reviews view-receipt"
                        href="#reviews-block"
                      >
                        Read Reviews{" "}
                      </a>
                      <div>• </div>
                      <div
                        className="view-receipt"
                        onClick={() => {
                          setModalContent(
                            <StoreMapInfoModal
                              restaurantId={targetRestaurant.id}
                            />
                          );
                          setModalClass("storeinfomodal");
                        }}
                      >
                        View Map
                      </div>
                    </div>
                    <div className="res-add">{targetRestaurant?.address}</div>
                  </div>
                </div>
              </div>
            </div>
            {hasMenu ? (
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
                    <section
                      key={`section-${id}`}
                      id={id}
                      className="sectionItems"
                    >
                      <div className="item-type-name">{capitalize(id)}</div>
                      <MenuItems type={id} items={items[id]} />
                    </section>
                  ))}
                </main>
              </div>
            ) : (
              <div className="no-past-order1">
                <div className="no-past-title">
                  Stay tuned, menu is coming soon!
                </div>
              </div>
            )}
            {!isLoading && (
              <div id="reviews-block">
                <ReviewSection resName={targetRestaurant?.name} />
              </div>
            )}
            {/* <RestaurantMap /> */}
            {/* {targetRestaurant && (
            <MapContainer
              lat={targetRestaurant?.lat}
              lng={targetRestaurant?.lng}
            />
          )} */}
          </>
        )}
        {isLoading && <LoadingPage />}
      </div>
    </>
  );
}

export default SingleRestaurant;
