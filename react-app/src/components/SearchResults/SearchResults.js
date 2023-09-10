import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SortContainer from "../MainRestaurants/SortContainer";
import Navigation from "../Navigation";
import "./SearchResults.css";
import { searchThunk } from "../../store/search";
import NoSearchResults from "./NoSearchResults";
import SearchResContainer from "./SearchResContainer";
import { calculateDistance } from "../../utils/helper-functions";

function SearchResults() {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.search.search_results);
  const numResults = useSelector((state) => state.search.num_results);
  const numRestaurants = useSelector((state) => state.search.num_restaurants);
  const numDishes = useSelector((state) => state.search.num_dishes);

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query");
  console.log("queryParams", queryParams);

  useEffect(() => {
    dispatch(searchThunk(searchQuery));
  }, [searchQuery]);

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

  const [sortBy, setSortBy] = useState("");
  const [priceRanges, setPriceRanges] = useState([]);
  const [dietary, setDietary] = useState([]);

  useEffect(() => {
    // Listen for route changes
    const unlisten = history.listen(() => {
      // Set filterType to empty string when route changes to "/restaurants"
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
    });

    return () => {
      // Cleanup by removing the listener when the component unmounts
      unlisten();
    };
  }, [history]);

  const [resWithDistances, setResWithDistances] = useState([]);
  useEffect(() => {
    if (sessionUser && searchResults) {
      const cald = searchResults;
      Object.values(searchResults).forEach((res) => {
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
      setResWithDistances((prev) => sortedCald);
    } else if (searchResults) {
      setResWithDistances((prev) => Object.values(searchResults));
    }
  }, [searchResults, sessionUser]);

  return (
    <>
      <div className="mw">
        <Navigation />
        <section className="sec3">
          <div>
            <SortContainer
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
              searchQuery={searchQuery}
              numResults={numResults}
              numRestaurants={numRestaurants}
              numDishes={numDishes}
            />
          </div>
          <div className="main-contain">
            <SearchResContainer
              searchResults={resWithDistances}
              sortBy={sortBy}
              priceRanges={priceRanges}
              dietary={dietary}
            />
            {numResults === 0 && <NoSearchResults searchQuery={searchQuery} />}
          </div>
        </section>
      </div>
    </>
  );
}

export default SearchResults;
