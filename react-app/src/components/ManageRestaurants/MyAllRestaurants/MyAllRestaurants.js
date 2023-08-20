import "./MyAllRestaurants.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../Header";
import { fetchAllRestaurantsThunk } from "../../../store/restaurants";
import { useHistory } from "react-router-dom";

function MyAllRestaurants() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();

  const restaurants = Object.values(
    useSelector((state) =>
      state.restaurants.allRestaurants ? state.restaurants.allRestaurants : {}
    )
  );
  const myRestaurants = restaurants.filter(
    (res) => res.owner_id === sessionUser?.id
  );
  const hasRes = myRestaurants.length > 0;

  useEffect(() => {
    dispatch(fetchAllRestaurantsThunk());
    window.scroll(0, 0);
  }, [dispatch]);

  const handleClickAll = () => {
    history.push(`/business/restaurants`);
  };

  const handleClickOne = (id) => {
    history.push(`/business/restaurants/${id}`);
  };

  const handleClickAdd = (id) => {
    history.push(`/business/restaurant-builder`);
  };

  console.log("my restaurants", myRestaurants);
  return (
    <div className="main-place-holder-container1">
      <div className="black-background">
        <Header logo={"white-logo"} />
      </div>
      <div className="create-restaurant-background1">
        <div className="manage-left-container">
          <div className="menu-item2 cursor" onClick={handleClickAll}>
            <i className="fa-solid fa-house menu-icons"></i>
            <div className="_16"></div>
            <div>Home</div>
          </div>
          <div className="menu-item2">
            <i className="fa-solid fa-store"></i>
            <div className="_16"></div>
            My restaurants <div className="_16"></div>
            {hasRes && <i className={`fa-solid fa-chevron-down`}></i>}
          </div>
          <div className="man">
            {myRestaurants &&
              myRestaurants?.map((myRes, index) => (
                <div
                  key={index}
                  className="cursor lih"
                  onClick={() => handleClickOne(myRes.id)}
                >
                  {myRes.name}
                </div>
              ))}
          </div>
          <div className="menu-item2 cursor" onClick={handleClickAdd}>
            <i className="fa-solid fa-circle-plus"></i>
            <div className="_16"></div>
            <div>Add a new restaurant</div>
          </div>
        </div>
        <div className="manage-right-container">
          <div>
            {myRestaurants.length}{" "}
            {myRestaurants.length === 1 ? "restaurant" : "restaurants"}
          </div>
          {myRestaurants &&
            myRestaurants?.map((myRes, index) => (
              // <div
              //   key={index}
              //   className="cursor lih"
              //   onClick={() => handleClickOne(myRes.id)}
              // >
              //   {myRes.name}
              // </div>
              <MyOneResCard key={index} myRes={myRes} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default MyAllRestaurants;
