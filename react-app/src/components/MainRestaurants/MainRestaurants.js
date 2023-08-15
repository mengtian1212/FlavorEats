import "./MainRestaurants.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { fetchAllRestaurantsThunk } from "../../store/restaurants";

import RestaurantsCategories from "./RestaurantsCategories";
import SideShow from "./SideShow";
import SortContainer from "./SortContainer";
import RestaurantsContainer from "./RestaurantsContainer";

function MainRestaurants() {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  let restaurants = Object.values(
    useSelector((state) =>
      state.restaurants.allRestaurants ? state.restaurants.allRestaurants : {}
    )
  );

  const [filterType, setFilterType] = useState("");
  const [filterRestaurants, setFilterRestaurants] = useState(restaurants);
  const [sortBy, setSortBy] = useState("");
  const [priceRanges, setPriceRanges] = useState([]);
  const [dietary, setDietary] = useState([]);

  console.log("filterRestaurants", filterRestaurants);
  console.log("filterType", filterType);
  console.log("sortBy", sortBy);

  useEffect(() => {
    dispatch(fetchAllRestaurantsThunk());
    window.scroll(0, 0);
  }, [dispatch]);

  useEffect(() => {
    let filtered = restaurants;
    if (filterType === "Popular") {
      filtered = restaurants.filter((restaurant) => restaurant.avg_rating >= 4);
      filtered.sort((a, b) => b.avg_rating - a.avg_rating);
    } else if (filterType) {
      filtered = restaurants.filter((restaurant) =>
        restaurant.cusine_types.split("#").includes(filterType)
      );
    }
    setFilterRestaurants(filtered);
    window.scroll(0, 0);
  }, [filterType]);

  return (
    <>
      <RestaurantsCategories
        filterType={filterType}
        setFilterType={setFilterType}
      />
      <SideShow />
      <section className="sec3">
        <div>
          <SortContainer
            filterType={filterType}
            setFilterType={setFilterType}
            sortBy={sortBy}
            setSortBy={setSortBy}
            setPriceRanges={setPriceRanges}
            setDietary={setDietary}
          />
        </div>
        <RestaurantsContainer
          cuisineType={filterType}
          restaurants={filterType ? filterRestaurants : restaurants}
          sortBy={sortBy}
          priceRanges={priceRanges}
          dietary={dietary}
        />
      </section>
    </>
  );
}

export default MainRestaurants;
