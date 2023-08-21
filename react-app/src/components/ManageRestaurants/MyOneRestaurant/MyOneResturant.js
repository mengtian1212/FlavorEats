import "./MyOneRestaurant.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { fetchOneRestaurantThunk } from "../../../store/restaurants";
import Header from "../../Header";
import MyOneResSideBar from "./MyOneResSideBar";
import SingleRestaurant from "../../SingleRestaurant";

function MyOneRestaurant() {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);
  const myRestaurant = useSelector((state) =>
    state.restaurants?.singleRestaurant
      ? state.restaurants?.singleRestaurant
      : {}
  );
  let groups = myRestaurant?.cusine_types?.split("#");

  const [showOverview, setShowOverview] = useState(true);
  const [showMenus, setShowMenus] = useState(false);

  useEffect(() => {
    dispatch(fetchOneRestaurantThunk(restaurantId));
    window.scroll(0, 0);
  }, [restaurantId]);

  if (!sessionUser) {
    setTimeout(() => history.push("/restaurants"), 3000);
    window.scroll(0, 0);
    return (
      <div className="need-log-in">
        <div className="">Please log in to manage restaurants</div>
        <div>Redirect to Home page...</div>
      </div>
    );
  }

  return (
    <div className="main-place-holder-container1">
      <div className="black-background">
        <Header logo={"white-logo"} />
      </div>
      <div className="create-restaurant-background1">
        <div className="manage-left-container">
          <MyOneResSideBar
            myRestaurant={myRestaurant}
            showOverview={showOverview}
            setShowOverview={setShowOverview}
            showMenus={showMenus}
            setShowMenus={setShowMenus}
          />
        </div>
        <div className="manage-right-container">
          <div>
            <img
              src={myRestaurant.image_url}
              alt=""
              className="restaurant-photo"
            />
            <div className="res-title-container">
              <div className="res-name">{myRestaurant.name}</div>
              <div className="res-stat-container">
                <div className="res-rating-container">
                  {myRestaurant.avg_rating > 0 && (
                    <i className="fa-solid fa-star"></i>
                  )}
                  {myRestaurant.avg_rating > 0 &&
                    myRestaurant.avg_rating.toFixed(1)}
                </div>
                <div>
                  ({myRestaurant.num_rating}{" "}
                  {myRestaurant.num_rating === 1 ? "rating" : "ratings"})
                </div>
                <div>• </div>
                <div>{groups && groups[0]}</div>
                <div>• </div>
                <div>{myRestaurant.price_ranges}</div>
                <div>• </div>
                <div>Read Reviews </div>
                <div>• </div>
                <div>More info</div>
              </div>
              <div className="res-add">{myRestaurant?.address}</div>
            </div>
          </div>
          <div className="my-one-edit-btns">
            <button className="reorder-btn6">Edit restaurant profile</button>
            <button className="reorder-btn6">Delete restaurant</button>
          </div>
          {/* <div>Top Selling Items</div>
          <div>Menu Item Feedback</div>
          <div>Customer reviews</div>
          <div>Orders received last 24 hours</div> */}
        </div>
      </div>
    </div>
  );
}

export default MyOneRestaurant;
