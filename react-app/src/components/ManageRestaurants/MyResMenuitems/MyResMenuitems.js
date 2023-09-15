import "./MyResMenuitems.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { fetchOneRestaurantThunk } from "../../../store/restaurants";
import Header from "../../Header";
import MyOneResSideBar from "../MyOneRestaurant/MyOneResSideBar";
import LoadingPage from "../../auth/LoadingPage";
import { fetchAllDishesThunk } from "../../../store/dishes";
import MyItemEntry from "./MyItemEntry";

function MyResMenuitems() {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const myRestaurant = useSelector((state) =>
    state.restaurants?.singleRestaurant
      ? state.restaurants?.singleRestaurant
      : {}
  );
  const myMenuitems = useSelector((state) =>
    state.dishes?.allDishes ? Object.values(state.dishes?.allDishes) : []
  );
  console.log("my menu items", myMenuitems);
  const [sortedItems, setSortedItems] = useState(myMenuitems || []);
  const [isLoading, setIsLoading] = useState(true);
  const [isSorting, setIsSorting] = useState(true);

  useEffect(() => {
    dispatch(fetchAllDishesThunk(restaurantId))
      .then(() => dispatch(fetchOneRestaurantThunk(restaurantId)))
      .then(() => setIsLoading(false));
    window.scroll(0, 0);
  }, [restaurantId]);

  useEffect(() => {
    myMenuitems.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    setSortedItems(() => myMenuitems);
    setIsSorting(false);
    window.scroll(0, 0);
  }, [myRestaurant]);

  // default sort by updated_at descending order
  const [sortBy, setSortBy] = useState("updatedAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const handleSort = (columnName) => {
    if (sortBy === columnName) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(columnName);
      setSortOrder("asc");
    }
    console.log("sortBy", sortBy, "sortOrder", sortOrder);
  };

  useEffect(() => {
    console.log("useEffect run");
    const sorted = [...sortedItems];
    if (sortBy === "name" && sortOrder === "asc") {
      sorted.sort((a, b) => a.item_name.localeCompare(b.item_name));
    }
    if (sortBy === "name" && sortOrder === "desc") {
      sorted.sort((a, b) => b.item_name.localeCompare(a.item_name));
    }
    if (sortBy === "category" && sortOrder === "asc") {
      sorted.sort((a, b) => a.item_type.localeCompare(b.item_type));
    }
    if (sortBy === "category" && sortOrder === "desc") {
      sorted.sort((a, b) => b.item_type.localeCompare(a.item_type));
    }
    if (sortBy === "price" && sortOrder === "asc") {
      sorted.sort((a, b) => Number(a.price) - Number(b.price));
    }
    if (sortBy === "price" && sortOrder === "desc") {
      sorted.sort((a, b) => Number(b.price) - Number(a.price));
    }
    if (sortBy === "likeRatio" && sortOrder === "asc") {
      sorted.sort((a, b) => a.like_ratio - b.like_ratio);
    }
    if (sortBy === "likeRatio" && sortOrder === "desc") {
      sorted.sort((a, b) => b.like_ratio - a.like_ratio);
    }
    if (sortBy === "likes" && sortOrder === "asc") {
      sorted.sort((a, b) => a.num_likes - b.num_likes);
    }
    if (sortBy === "likes" && sortOrder === "desc") {
      sorted.sort((a, b) => b.num_likes - a.num_likes);
    }
    if (sortBy === "dislikes" && sortOrder === "asc") {
      sorted.sort((a, b) => a.num_dislikes - b.num_dislikes);
    }
    if (sortBy === "dislikes" && sortOrder === "desc") {
      sorted.sort((a, b) => b.num_dislikes - a.num_dislikes);
    }
    if (sortBy === "updatedAt" && sortOrder === "asc") {
      sorted.sort((a, b) => new Date(a.updated_at) - new Date(b.updated_at));
    }
    if (sortBy === "updatedAt" && sortOrder === "desc") {
      sorted.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    }
    setSortedItems(sorted);
    console.log("sortedItems", sortedItems);
  }, [sortBy, sortOrder]);

  return (
    <div className="main-place-holder-container1">
      <div className="black-background">
        <Header logo={"white-logo"} />
      </div>
      {!isLoading && !isSorting && (
        <div className="create-restaurant-background1">
          <div className="manage-left-container">
            <MyOneResSideBar myRestaurant={myRestaurant} />
          </div>
          <div className="manage-right-container">
            <div className="dish-table-head">
              <div className="res-list-title1">
                {sortedItems && sortedItems.length === 1 && "1 Item"}
                {sortedItems &&
                  sortedItems.length !== 1 &&
                  `${sortedItems.length} Items`}
              </div>
              {sortedItems.length !== 0 && (
                <button
                  className="reorder-btn14"
                  onClick={() =>
                    history.push(`/business/${restaurantId}/item-builder`)
                  }
                >
                  <i className="fa-solid fa-plus" />
                  Add new item
                </button>
              )}
            </div>
            {sortedItems.length !== 0 && (
              <div className="dish-table-container">
                <table className="dish-table">
                  <thead>
                    <tr>
                      <th className=""></th>
                      <th
                        className="table-colname table-name"
                        onClick={() => handleSort("name")}
                      >
                        Name
                        {/* <i className="fa-solid fa-arrow-up-long"></i>
                        <i className="fa-solid fa-arrow-down-long"></i> */}
                        <i
                          className={`fa-solid fa-sort ${
                            sortBy === "name" ? "sort-stroke" : ""
                          }`}
                        ></i>
                      </th>
                      <th
                        className="table-colname table-category"
                        onClick={() => handleSort("category")}
                      >
                        Category
                        <i
                          className={`fa-solid fa-sort ${
                            sortBy === "category" ? "sort-stroke" : ""
                          }`}
                        ></i>
                      </th>
                      <th
                        className="table-colname table-price"
                        onClick={() => handleSort("price")}
                      >
                        Price
                        <i
                          className={`fa-solid fa-sort ${
                            sortBy === "price" ? "sort-stroke" : ""
                          }`}
                        ></i>
                      </th>
                      <th
                        className="table-colname table-likeratio"
                        onClick={() => handleSort("likeRatio")}
                      >
                        Like Ratio
                        <i
                          className={`fa-solid fa-sort ${
                            sortBy === "likeRatio" ? "sort-stroke" : ""
                          }`}
                        ></i>
                      </th>
                      <th
                        className="table-colname table-likes"
                        onClick={() => handleSort("likes")}
                      >
                        Likes
                        <i
                          className={`fa-solid fa-sort ${
                            sortBy === "likes" ? "sort-stroke" : ""
                          }`}
                        ></i>
                      </th>
                      <th
                        className="table-colname table-dislikes"
                        onClick={() => handleSort("dislikes")}
                      >
                        Dislikes
                        <i
                          className={`fa-solid fa-sort ${
                            sortBy === "dislikes" ? "sort-stroke" : ""
                          }`}
                        ></i>
                      </th>
                      <th
                        className="table-colname table-updated"
                        onClick={() => handleSort("updatedAt")}
                      >
                        Last Updated
                        <i
                          className={`fa-solid fa-sort ${
                            sortBy === "updatedAt" ? "sort-stroke" : ""
                          }`}
                        ></i>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedItems &&
                      sortedItems?.map((menuitem, index) => (
                        <MyItemEntry key={index} item={menuitem} />
                      ))}
                  </tbody>
                </table>
              </div>
            )}

            {sortedItems.length === 0 && (
              <>
                {/* <div className="need-log-in-auth"> */}
                <div className="no-past-order">
                  <img
                    src="https://cn-geo1.uber.com/static/mobile-content/eats/promo_manager/savings_card_icons/ubereats/grocery@3x.png"
                    alt=""
                    className="need-log-in-img1"
                  />

                  <div className="res-list-title3">
                    The menu is currently empty.
                  </div>
                  {/* <div className="need-log-in-text">
                    Redirecting to Home page in seconds...
                  </div> */}
                  <button
                    className="reorder-btn13"
                    onClick={() =>
                      history.push(`/business/${restaurantId}/item-builder`)
                    }
                  >
                    <i className="fa-solid fa-plus" />
                    Add a new item
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {isLoading && <LoadingPage />}
    </div>
  );
}

export default MyResMenuitems;
