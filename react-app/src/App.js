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
import MyOneRestaurant from "./components/ManageRestaurants/MyOneRestaurant/MyOneResturant";
import MyResAllMenuitems from "./components/ManageRestaurants/MyResAllMenuitems/MyResAllMenuitems";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import NotFound from "./components/NotFound/NotFound";

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
            <LoginFormPage />
          </Route>
          <Route path="/signup">
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
          <ProtectedRoute exact path="/checkout">
            {/* <Route exact path="/checkout"> */}
            <CheckoutPage />
            {/* </Route> */}
          </ProtectedRoute>
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
            <MyOneRestaurant />
          </Route>
          <Route exact path="/business/:restaurantId/edit">
            <Navigation isLoaded={isLoaded} />
            {/* <EditMyOneRestaurant /> */}
          </Route>
          <Route exact path="/business/:restaurantId/items">
            <MyResAllMenuitems />
          </Route>
          <Route exact path="/business/:restaurantId/items/new">
            <Navigation isLoaded={isLoaded} />
            {/* <CreateMyMenuitem /> */}
          </Route>
          <Route exact path="/business/:restaurantId/items/:itemId">
            <Navigation isLoaded={isLoaded} />
            {/* <MyResOneMenuItem /> */}
          </Route>
          <Route exact path="/business/:restaurantId/items/:itemId/edit">
            <Navigation isLoaded={isLoaded} />
            {/* <EditMyResOneMenuItem /> */}
          </Route>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
