import "./MyAllRestaurants.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../Header";
import { fetchAllRestaurantsThunk } from "../../../store/restaurants";
import { useHistory } from "react-router-dom";
import MyOneResCard from "./MyOneResCard";
import LoadingPage from "../../auth/LoadingPage";

function MyAllRestaurants() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  const restaurants = Object.values(
    useSelector((state) =>
      state.restaurants?.allRestaurants ? state.restaurants?.allRestaurants : {}
    )
  );
  const myRestaurants = restaurants?.filter(
    (res) => res.owner_id === sessionUser?.id
  );
  myRestaurants?.sort(
    (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
  );

  const hasRes = myRestaurants?.length > 0;

  useEffect(() => {
    dispatch(fetchAllRestaurantsThunk()).then(() => setIsLoading(false));
    window.scroll(0, 0);
  }, [dispatch]);

  const handleClickAll = () => {
    history.push(`/business/restaurants`);
  };

  const handleClickOne = (id) => {
    history.push(`/business/${id}`);
  };

  const handleClickAdd = (id) => {
    history.push(`/business/restaurant-builder`);
  };

  return (
    <div className="main-place-holder-container1">
      <div className="black-background">
        <Header logo={"white-logo"} />
      </div>
      {!isLoading && (
        <div className="create-restaurant-background1">
          <div className="manage-left-container">
            <div className="menu-item2 cursor lih" onClick={handleClickAll}>
              <i className="fa-solid fa-house menu-icons pb4 lih2"></i>
              <div className="_16"></div>
              <div className="lih2">Manage my restaurants</div>
            </div>
            <div className="menu-item2 lih">
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
            <div className="menu-item2 cursor lih" onClick={handleClickAdd}>
              <i className="fa-solid fa-circle-plus pb4"></i>
              <div className="_16"></div>
              <div className="lih">Add a new restaurant</div>
            </div>
          </div>
          <div className="manage-right-container">
            <div className="res-list-title1">
              {myRestaurants.length}{" "}
              {myRestaurants.length === 1 ? "restaurant" : "restaurants"}
            </div>
            <div className="my-res-cards-container">
              {myRestaurants &&
                myRestaurants?.map((myRes, index) => (
                  <MyOneResCard
                    key={index}
                    restaurant={myRes}
                    handleClickOne={handleClickOne}
                  />
                ))}
            </div>
          </div>
        </div>
      )}
      {isLoading && <LoadingPage />}
    </div>
  );
}

export default MyAllRestaurants;
