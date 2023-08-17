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
          <Route exact path="/">
            <Navigation isLoaded={isLoaded} />
            <LandingPage />
          </Route>
          <Route exact path="/restaurants/:restaurantId">
            <Navigation isLoaded={isLoaded} />
            <SingleRestaurant />
          </Route>
          <Route exact path="/restaurants">
            <Navigation isLoaded={isLoaded} />
            <MainRestaurants />
          </Route>
          <Route exact path="/orders">
            <Navigation isLoaded={isLoaded} />
            <PastOrders />
          </Route>
          <Route exact path="/checkout/restaurants/:restaurantId">
            <CheckoutPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
