import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { calculateDistance } from "../../utils/helper-functions";
import { tns } from "tiny-slider";
import "./SideShow.css";
import "./NearestSideShow.css";
import RestaurantCard from "./RestaurantCard";
import { fetchAllRestaurantsThunk } from "../../store/restaurants";

function NearestResSubSection() {
  const sessionUser = useSelector((state) => state.session.user);
  const address = sessionUser && sessionUser.address.split(",")[0];
  const dispatch = useDispatch();

  let restaurants = useSelector((state) =>
    state.restaurants.allRestaurants ? state.restaurants.allRestaurants : {}
  );
  const [resWithDistances, setResWithDistances] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchAllRestaurantsThunk()).then(() => setIsLoading(false));
    window.scroll(0, 0);
  }, [dispatch]);

  useEffect(() => {
    if (sessionUser && restaurants && !isLoading) {
      const cald = restaurants;
      Object.values(restaurants).forEach((res) => {
        const distance = calculateDistance(
          sessionUser.lat,
          sessionUser.lng,
          res?.lat,
          res?.lng
        );
        cald[res.id].distance = distance;
      });
      const sortedCald = Object.values(cald).sort(
        (a, b) => a.distance - b.distance
      );
      setResWithDistances((prev) => sortedCald.slice(0, 10));
    } else if (restaurants) {
      setResWithDistances((prev) => Object.values(restaurants).slice(0, 10));
    }

    if (!isLoading) {
      let slider = tns({
        container: ".my-slider-near",
        slideBy: 4,
        speed: 300,
        nav: false,
        loop: false,
        controlsContainer: ".controller-near",
        items: 4,
        gutter: 0,
      });
    }
  }, [restaurants, sessionUser, isLoading]);

  return (
    <>
      {!isLoading && (
        <div className="near-container">
          <div className="res-list-title">
            {sessionUser
              ? `Popular stores near your location (${address})`
              : "Popular stores near you"}
            <p className="item-dcap">
              Discover local dining options in your neighborhood
            </p>
          </div>
          <div className="slider-container-near">
            <div className="controller-near">
              <button className="previous-near">
                <i className="fa-solid fa-arrow-left side-show-arrow-near"></i>
              </button>
              <button className="next-near">
                <i className="fa-solid fa-arrow-right side-show-arrow-near"></i>
              </button>
            </div>
            <div id="slider">
              <div className="my-slider-near">
                {resWithDistances?.map((slide, i) => {
                  return (
                    <a href={slide.path} key={i}>
                      <div className="slide-outer-near" key={i}>
                        <div className="slide-near">
                          <RestaurantCard
                            restaurant={slide}
                            hasDistance={true}
                          />
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NearestResSubSection;
