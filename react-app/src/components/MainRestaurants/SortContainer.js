import { useState, useEffect } from "react";

function SortContainer({
  filterType,
  setFilterType,
  sortBy,
  setSortBy,
  priceRanges,
  setPriceRanges,
  setDietary,
  isOne,
  isTwo,
  isThree,
  isFour,
  setIsOne,
  setIsTwo,
  setIsThree,
  setIsFour,
  isVegetarian,
  setIsVegetarian,
  isVegan,
  setIsVegan,
  isGluten,
  setIsGluten,
  isHalal,
  setIsHalal,
}) {
  // const [isOne, setIsOne] = useState(false);
  // const [isTwo, setIsTwo] = useState(false);
  // const [isThree, setIsThree] = useState(false);
  // const [isFour, setIsFour] = useState(false);

  // const [isVegetarian, setIsVegetarian] = useState(false);
  // const [isVegan, setIsVegan] = useState(false);
  // const [isGluten, setIsGluten] = useState(false);
  // const [isHalal, setIsHalal] = useState(false);

  const handleClear = () => {
    setIsOne(false);
    setIsTwo(false);
    setIsThree(false);
    setIsFour(false);
    setIsVegetarian(false);
    setIsVegan(false);
    setIsGluten(false);
    setIsHalal(false);
    setSortBy("");
  };

  useEffect(() => {
    const prices = [];
    if (isOne) prices.push("$");
    if (isTwo) prices.push("$$");
    if (isThree) prices.push("$$$");
    if (isFour) prices.push("$$$$");
    setPriceRanges(prices);
  }, [isOne, isTwo, isThree, isFour, setPriceRanges]);

  useEffect(() => {
    const dietary = [];
    if (isVegetarian) dietary.push("Vegetarian");
    if (isVegan) dietary.push("Vegan");
    if (isGluten) dietary.push("Gluten-free");
    if (isHalal) dietary.push("Halal");
    setDietary(dietary);
  }, [isVegetarian, isVegan, isGluten, isHalal, setDietary]);

  return (
    <div className="sort-container">
      <div className="all-res">All Restaurants</div>
      <div className="clear-filter cursor" onClick={handleClear}>
        Clear all
      </div>
      <div className="sort-title">Sort</div>
      <div className="sorts">
        <label className="sort-radio">
          <input
            type="radio"
            value="picked"
            checked={sortBy === "picked"}
            onChange={(e) => setSortBy(e.target.value)}
          />
          <div>Picked for you (default)</div>
        </label>
        <label className="sort-radio">
          <input
            type="radio"
            value="popular"
            checked={sortBy === "popular"}
            onChange={(e) => setSortBy(e.target.value)}
          />
          <div>Most popular</div>
        </label>
        <label className="sort-radio">
          <input
            type="radio"
            value="rating"
            checked={sortBy === "rating"}
            onChange={(e) => setSortBy(e.target.value)}
          />
          <div>Rating</div>
        </label>
      </div>
      <div className="sort-title">Price Range</div>
      <div className="price-range">
        <div
          className={`range-container btn-grey cursor ${
            isOne ? `dollarColor` : ""
          }`}
          onClick={() => setIsOne((prev) => !prev)}
        >
          $
        </div>

        <div
          className={`range-container btn-grey cursor ${
            isTwo ? `dollarColor` : ""
          }`}
          onClick={() => setIsTwo((prev) => !prev)}
        >
          $$
        </div>
        <div
          className={`range-container btn-grey cursor ${
            isThree ? `dollarColor` : ""
          }`}
          onClick={() => setIsThree((prev) => !prev)}
        >
          $$$
        </div>
        <div
          className={`range-container btn-grey cursor ${
            isFour ? `dollarColor` : ""
          }`}
          onClick={() => setIsFour((prev) => !prev)}
        >
          $$$$
        </div>
      </div>
      <div className="sort-title">Dietary</div>
      <div className="dietary-container">
        <div
          className={`range-container1 btn-grey cursor ${
            isVegetarian ? `dollarColor` : ""
          }`}
          onClick={() => setIsVegetarian((prev) => !prev)}
        >
          <i className="fa-solid fa-leaf"></i>
          <div>Vegetarian</div>
        </div>
        <div
          className={`range-container1 btn-grey cursor ${
            isVegan ? `dollarColor` : ""
          }`}
          onClick={() => setIsVegan((prev) => !prev)}
        >
          <i className="fa-solid fa-seedling"></i>
          <div>Vegan</div>
        </div>
        <div
          className={`range-container1 btn-grey cursor ${
            isGluten ? `dollarColor` : ""
          }`}
          onClick={() => setIsGluten((prev) => !prev)}
        >
          <i className="fa-brands fa-pagelines"></i>
          <div>Gluten-free</div>
        </div>
        <div
          className={`range-container1 btn-grey cursor ${
            isHalal ? `dollarColor` : ""
          }`}
          onClick={() => setIsHalal((prev) => !prev)}
        >
          <img
            src="https://img.icons8.com/?size=512&id=ZWxTaXg7BCQr&format=png"
            alt=""
            className="halal-icon"
          />
          <div>Halal</div>
        </div>
      </div>
    </div>
  );
}

export default SortContainer;
