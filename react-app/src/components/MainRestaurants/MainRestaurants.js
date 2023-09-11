import "./MainRestaurants.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { fetchAllRestaurantsThunk } from "../../store/restaurants";

import RestaurantsCategories from "./RestaurantsCategories";
import SideShow from "./SideShow";
import SortContainer from "./SortContainer";
import RestaurantsContainer from "./RestaurantsContainer";
import Navigation from "../Navigation";
import NewRestaurantSubSection from "./NewRestaurantSubSection";
import NearestResSubSection from "./NearestResSubSection";
import RecommendDishes from "./RecommendDishes";

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
  const [isLoading, setIsLoading] = useState(true);

  const [showSubSection, setShowSubSection] = useState(true);

  useEffect(() => {
    dispatch(fetchAllRestaurantsThunk()).then(() => setIsLoading(false));
    window.scroll(0, 0);
  }, [dispatch]);

  useEffect(() => {
    let filtered = restaurants;
    if (filterType === "Popular") {
      filtered = restaurants.filter((restaurant) => restaurant.avg_rating >= 4);
      filtered.sort((a, b) => b.avg_rating - a.avg_rating);
      setShowSubSection(false);
    } else if (filterType) {
      filtered = restaurants.filter((restaurant) =>
        restaurant.cusine_types.split("#").includes(filterType)
      );
      setShowSubSection(false);
    }
    setFilterRestaurants(filtered);
    window.scroll(0, 0);
  }, [filterType]);

  useEffect(() => {
    if (
      filterType === "" &&
      sortBy === "" &&
      priceRanges.length === 0 &&
      dietary.length === 0
    ) {
      setShowSubSection(true);
    } else {
      setShowSubSection(false);
    }
    window.scroll(0, 0);
  }, [filterType, sortBy, priceRanges, dietary]);

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
        setShowSubSection(true);
      }
    });

    return () => {
      // Cleanup by removing the listener when the component unmounts
      unlisten();
    };
  }, [history]);

  return (
    <>
      {!isLoading && (
        <div className="mw">
          <Navigation />
          <RestaurantsCategories
            filterType={filterType}
            setFilterType={setFilterType}
          />
          <div className="cuisine-types-underline"></div>
          <SideShow setFilterType={setFilterType} />
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
            <div className="main-contain">
              {showSubSection && <NearestResSubSection />}
              {showSubSection && <NewRestaurantSubSection />}
              {showSubSection && <RecommendDishes />}
              <RestaurantsContainer
                cuisineType={filterType}
                restaurants={filterType ? filterRestaurants : restaurants}
                sortBy={sortBy}
                priceRanges={priceRanges}
                dietary={dietary}
              />
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default MainRestaurants;
