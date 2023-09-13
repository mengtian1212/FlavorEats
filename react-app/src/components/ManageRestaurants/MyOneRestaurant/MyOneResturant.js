import "./MyOneRestaurant.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { fetchOneRestaurantThunk } from "../../../store/restaurants";
import Header from "../../Header";
import MyOneResSideBar from "./MyOneResSideBar";
import SingleRestaurant from "../../SingleRestaurant";
import OpenModalButton from "../../OpenModalButton";
import DeleteResModal from "../DeleteResModal/DeleteResModal";
import UnauthorizedPage from "../../auth/UnauthorizedPage";
import LoadingPage from "../../auth/LoadingPage";
import NotFoundPage from "../../auth/NotFoundPage";

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

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchOneRestaurantThunk(restaurantId)).then(() =>
      setIsLoading(false)
    );
    window.scroll(0, 0);
  }, [restaurantId]);

  // Example: restaurantId === 1000 || abc
  if (
    (restaurantId && !Number.isInteger(parseInt(restaurantId))) ||
    (!isLoading && myRestaurant && Object.values(myRestaurant).length === 0)
  ) {
    return <NotFoundPage />;
  }

  // Check if the current user is the restaurant owner
  if (
    sessionUser &&
    !isLoading &&
    myRestaurant &&
    Object.values(myRestaurant).length &&
    sessionUser.id !== myRestaurant.owner_id
  ) {
    return <UnauthorizedPage />;
  }

  return (
    <>
      <div className="main-place-holder-container1">
        <div className="black-background">
          <Header logo={"white-logo"} />
        </div>
        {!isLoading && (
          <div className="create-restaurant-background1">
            <div className="manage-left-container">
              <MyOneResSideBar myRestaurant={myRestaurant} />
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
                      <i className="fa-solid fa-star"></i>
                      {myRestaurant.avg_rating > 0
                        ? myRestaurant.avg_rating.toFixed(1)
                        : "0"}
                    </div>
                    <div>
                      ({myRestaurant.num_rating}{" "}
                      {myRestaurant.num_rating === 1 ? "rating" : "ratings"})
                    </div>
                    <div>• </div>
                    <div>{groups && groups[0]}</div>
                    <div>• </div>
                    <div>{myRestaurant.price_ranges}</div>
                  </div>
                  <div className="res-add">{myRestaurant?.address}</div>
                </div>
              </div>
              <div className="my-one-edit-btns">
                <button
                  className="reorder-btn6"
                  onClick={() =>
                    history.push(`/business/${myRestaurant.id}/edit`)
                  }
                >
                  Edit restaurant profile
                </button>
                <OpenModalButton
                  buttonText="Delete restaurant"
                  modalComponent={<DeleteResModal restaurant={myRestaurant} />}
                  myClass="reorder-btn6"
                />
                <button
                  className="reorder-btn6"
                  onClick={() =>
                    history.push(`/restaurants/${myRestaurant.id}`)
                  }
                >
                  View store page
                </button>
              </div>
              {/* <div>Top Selling Items</div>
          <div>Menu Item Feedback</div>
          <div>Customer reviews</div>
          <div>Orders received last 24 hours</div> */}
            </div>
          </div>
        )}
        {isLoading && <LoadingPage />}
      </div>
    </>
  );
}

export default MyOneRestaurant;
