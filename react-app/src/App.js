import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import MainRestaurants from "./components/MainRestaurants";
import SingleRestaurant from "./components/SingleRestaurant";
import PastOrders from "./components/PastOrders";
import CheckoutPage from "./components/CheckoutPage/CheckoutPage";
import PlaceOrderPage from "./components/PlaceOrderPage/PlaceOrderPage";
import MyAllRestaurants from "./components/ManageRestaurants/MyAllRestaurants";
import CreateRestaurant from "./components/ManageRestaurants/CreateRestaurant";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {/* <Navigation isLoaded={isLoaded} /> */}
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <Navigation isLoaded={isLoaded} />
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <Navigation isLoaded={isLoaded} />
            <SignupFormPage />
          </Route>
          <Route exact path="/restaurants/:restaurantId">
            <SingleRestaurant />
          </Route>
          <Route exact path="/restaurants">
            <MainRestaurants />
          </Route>
          <Route exact path="/orders">
            <PastOrders />
          </Route>
          <Route exact path="/checkout">
            <CheckoutPage />
          </Route>
          <Route exact path="/place-order">
            <PlaceOrderPage />
          </Route>
          <Route exact path="/business/restaurant-builder">
            <CreateRestaurant />
          </Route>
          <Route exact path="/business/restaurants">
            <MyAllRestaurants />
          </Route>
          <Route exact path="/business/:restaurantId">
            <Navigation isLoaded={isLoaded} />
            {/* <MyOneRestaurant /> */}
          </Route>
          <Route exact path="/business/:restaurantId/edit">
            <Navigation isLoaded={isLoaded} />
            {/* <EditMyOneRestaurant /> */}
          </Route>
          <Route exact path="/business/:restaurantId/items">
            <Navigation isLoaded={isLoaded} />
            {/* <MyRestaurantAllMenuitems /> */}
          </Route>
          <Route exact path="/business/:restaurantId/items/new">
            <Navigation isLoaded={isLoaded} />
            {/* <CreateMyMenuitem /> */}
          </Route>
          <Route exact path="/business/:restaurantId/items/:itemId">
            <Navigation isLoaded={isLoaded} />
            {/* <MyRestaurantOneMenuItem /> */}
          </Route>
          <Route exact path="/business/:restaurantId/items/:itemId/edit">
            <Navigation isLoaded={isLoaded} />
            {/* <EditMyRestaurantOneMenuItem /> */}
          </Route>
          <Route exact path="/">
            <Navigation isLoaded={isLoaded} />
            <LandingPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
