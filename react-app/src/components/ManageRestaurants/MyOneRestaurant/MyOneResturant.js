import "./MyOneRestaurant.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { fetchOneRestaurantThunk } from "../../../store/restaurants";
import Header from "../../Header";
import MyOneResSideBar from "./MyOneResSideBar";

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

  const [showOverview, setShowOverview] = useState(true);
  const [showMenus, setShowMenus] = useState(false);

  useEffect(() => {
    dispatch(fetchOneRestaurantThunk(restaurantId));
    window.scroll(0, 0);
  }, [restaurantId]);

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
          {/* <div className="my-res-cards-container">
            {myRestaurants &&
              myRestaurants?.map((myRes, index) => (
                <MyOneResCard
                  key={index}
                  restaurant={myRes}
                  handleClickOne={handleClickOne}
                />
              ))}
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default MyOneRestaurant;
