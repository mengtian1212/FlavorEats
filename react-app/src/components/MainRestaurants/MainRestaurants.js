import "./MainRestaurants.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { fetchAllRestaurantsThunk } from "../../store/restaurants";

import RestaurantsCategories from "./RestaurantsCategories";
import SideShow from "./SideShow";
import SortContainer from "./SortContainer";
import RestaurantsContainer from "./RestaurantsContainer";

function MainRestaurants() {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();
  let restaurants = Object.values(
    useSelector((state) =>
      state.restaurants.allRestaurants ? state.restaurants.allRestaurants : {}
    )
  );

  // for SortContainer.js
  const [isOne, setIsOne] = useState(false);
  const [isTwo, setIsTwo] = useState(false);
  const [isThree, setIsThree] = useState(false);
  const [isFour, setIsFour] = useState(false);

  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isGluten, setIsGluten] = useState(false);
  const [isHalal, setIsHalal] = useState(false);
  // end for SortContainer.js

  const [filterType, setFilterType] = useState("");
  const [filterRestaurants, setFilterRestaurants] = useState(restaurants);
  const [sortBy, setSortBy] = useState("");
  const [priceRanges, setPriceRanges] = useState([]);
  const [dietary, setDietary] = useState([]);

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

  useEffect(() => {
    // Listen for route changes
    const unlisten = history.listen((location) => {
      if (location.pathname === "/restaurants") {
        // Set filterType to empty string when route changes to "/restaurants"
        setFilterType("");
        setSortBy("");
        setPriceRanges((prev) => []);
        setDietary((prev) => []);
        setIsOne(false);
        setIsTwo(false);
        setIsThree(false);
        setIsFour(false);
        setIsVegetarian(false);
        setIsVegan(false);
        setIsGluten(false);
        setIsHalal(false);
      }
    });

    return () => {
      // Cleanup by removing the listener when the component unmounts
      unlisten();
    };
  }, [history]);

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
            priceRanges={priceRanges}
            setPriceRanges={setPriceRanges}
            setDietary={setDietary}
            isOne={isOne}
            isTwo={isTwo}
            isThree={isThree}
            isFour={isFour}
            setIsOne={setIsOne}
            setIsTwo={setIsTwo}
            setIsThree={setIsThree}
            setIsFour={setIsFour}
            isVegetarian={isVegetarian}
            setIsVegetarian={setIsVegetarian}
            isVegan={isVegan}
            setIsVegan={setIsVegan}
            isGluten={isGluten}
            setIsGluten={setIsGluten}
            isHalal={isHalal}
            setIsHalal={setIsHalal}
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
