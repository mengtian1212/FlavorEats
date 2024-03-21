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
import Dashbaord from "../../Dashboard/Dashboard";

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
  const percentage = (myRestaurant.avg_rating / 5) * 100;
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
              <section className="my-one-res-head">
                <img
                  src={myRestaurant.image_url}
                  alt=""
                  className="my-one-res-photo cursor"
                  onClick={() =>
                    history.push(`/restaurants/${myRestaurant.id}`)
                  }
                />
                <div className="my-one-res-head-sub">
                  <div className="res-list-title2">
                    {myRestaurant.name}
                    {myRestaurant.avg_rating >= 4 && (
                      <img
                        src="https://d4p17acsd5wyj.cloudfront.net/bazaar/badge_top_eats.png"
                        alt=""
                        className="info-bestoverall2"
                      />
                    )}
                  </div>

                  <div className="my-res-address-container">
                    <i className="fa-solid fa-location-dot my-res-loc"></i>
                    <div className="res-add">{myRestaurant?.address}</div>
                  </div>

                  <div className="res-stat-container">
                    <div className="res-add">{groups.join(" • ")}</div>
                  </div>

                  <div className="my-res-rating-stat">
                    <div className="ratings">
                      <div className="empty-stars"></div>
                      <div
                        className="full-stars"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="res-add">
                      {myRestaurant.avg_rating.toFixed(1)} (
                      {myRestaurant.num_rating}{" "}
                      {myRestaurant.num_rating === 1 ? "rating" : "ratings"})
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <div className="my-one-edit-btns">
                  <button
                    className="reorder-btn6"
                    onClick={() =>
                      history.push(`/restaurants/${myRestaurant.id}`)
                    }
                  >
                    View store page
                  </button>
                  <button
                    className="reorder-btn6"
                    onClick={() =>
                      history.push(`/business/${myRestaurant.id}/edit`)
                    }
                  >
                    Edit store profile
                  </button>
                  <OpenModalButton
                    buttonText="Delete store"
                    modalComponent={
                      <DeleteResModal restaurant={myRestaurant} />
                    }
                    myClass="reorder-btn6"
                  />
                </div>
                {myRestaurant?.menuitems &&
                  Object.values(myRestaurant?.menuitems).length === 0 && (
                    <div className="taking-order-container">
                      <div className="taking-order-left">
                        <div className="res-list-title2">
                          Your store is almost ready for orders.
                        </div>
                        <div className="create-p">
                          Set up menu to start receiving orders.
                        </div>
                        <button
                          className="reorder-btn12"
                          onClick={() =>
                            history.push(
                              `/business/${restaurantId}/item-builder`
                            )
                          }
                        >
                          <i className="fa-solid fa-plus" />
                          Add first menu item
                        </button>
                      </div>
                      <img
                        // src="https://media.discordapp.net/attachments/1220221548531548173/1220265536512856104/26._you_store_ready_pic_copy.PNG"
                        src="https://flavoreatsbucket.s3.us-west-2.amazonaws.com/26._you_store_ready_pic_copy.PNG"
                        alt=""
                        className="walking-order"
                      />
                    </div>
                  )}
              </section>
              <Dashbaord restaurant={myRestaurant} />
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
