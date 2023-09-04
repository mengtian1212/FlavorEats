import { useState } from "react";

function RestaurantsCategories({ filterType, setFilterType }) {
  const selectedCuisineTypes = [
    {
      name: "Pizza",
      photo:
        "https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/pizza.png",
    },
    {
      name: "American",
      photo:
        "https://duyt4h9nfnj50.cloudfront.net/new_search_home_eats_icon/American_BrowseHome@3x.png",
    },
    {
      name: "Mexican",
      photo:
        "https://duyt4h9nfnj50.cloudfront.net/new_search_home_eats_icon/Mexican_BrowseHome@3x.png",
    },
    {
      name: "Asian",
      photo:
        "https://duyt4h9nfnj50.cloudfront.net/new_search_home_eats_icon/Asian_BrowseHome@3x.png",
    },
    {
      name: "Fast Food",
      photo:
        "https://duyt4h9nfnj50.cloudfront.net/new_search_home_eats_icon/FastFood_BrowseHome@3x.png",
    },
    {
      name: "Sushi",
      photo:
        "https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/sushi.png",
    },
    {
      name: "Italian",
      photo:
        "https://duyt4h9nfnj50.cloudfront.net/new_search_home_eats_icon/Italian_BrowseHome@3x.png",
    },
    {
      name: "Healthy",
      photo:
        "https://duyt4h9nfnj50.cloudfront.net/new_search_home_eats_icon/Healthy_BrowseHome@3x.png",
    },
    {
      name: "Chinese",
      photo:
        "https://duyt4h9nfnj50.cloudfront.net/new_search_home_eats_icon/Chinese_BrowseHome@3x.png",
    },
    {
      name: "Indian",
      photo:
        "https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/indian.png",
    },
    {
      name: "Seafood",
      photo:
        "https://duyt4h9nfnj50.cloudfront.net/new_search_home_eats_icon/Seafood_BrowseHome@3x.png",
    },
    {
      name: "Coffee & Tea",
      photo:
        "https://duyt4h9nfnj50.cloudfront.net/new_search_home_eats_icon/CoffeeTea_BrowseHome@3x.png",
    },
    {
      name: "Breakfast",
      photo:
        "https://duyt4h9nfnj50.cloudfront.net/new_search_home_eats_icon/Breakfast_BrowseHome@3x.png",
    },
    {
      name: "Dessert",
      photo:
        "https://duyt4h9nfnj50.cloudfront.net/new_search_home_eats_icon/IceCreamYogurt_BrowseHome@3x.png",
    },
  ];

  const handleClick = (cuisineType) => {
    setFilterType((prev) => cuisineType.name);
  };

  return (
    <section className="cuisine-types-container">
      <div className={`single-cuisine-type cursor`}>
        <div
          className="cuisine-type-img-container"
          onClick={() => {
            setFilterType((prev) => "");
          }}
        >
          <img
            src="https://duyt4h9nfnj50.cloudfront.net/new_search_home_eats_icon/Deals_BrowseHome@3x.png"
            alt=""
            className={`cuisine-type-img ${
              filterType === "" ? "cuisine-focus" : ""
            }`}
          />
        </div>
        <div>All</div>
      </div>
      <div
        className="single-cuisine-type cursor"
        onClick={() => setFilterType((prev) => "Popular")}
      >
        <div className="cuisine-type-img-container">
          <img
            src="https://d4p17acsd5wyj.cloudfront.net/shortcuts/top_eats.png"
            alt=""
            className={`cuisine-type-img ${
              filterType === "Popular" ? "cuisine-focus" : ""
            }`}
          />
        </div>
        <div>Popular</div>
      </div>
      {selectedCuisineTypes.map((cuisineType, index) => (
        <div
          key={index}
          className={`single-cuisine-type cursor`}
          onClick={() => handleClick(cuisineType)}
        >
          <div className="cuisine-type-img-container">
            <img
              src={cuisineType.photo}
              alt=""
              className={`cuisine-type-img ${
                filterType === cuisineType.name ? "cuisine-focus" : ""
              }`}
            />
          </div>
          <div>{cuisineType.name}</div>
        </div>
      ))}
    </section>
  );
}

export default RestaurantsCategories;
