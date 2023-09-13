import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";

import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import Footer from "./components/Footer";

import MainRestaurants from "./components/MainRestaurants";
import SingleRestaurant from "./components/SingleRestaurant";
import PastOrders from "./components/PastOrders";
import CheckoutPage from "./components/CheckoutPage/CheckoutPage";
import PlaceOrderPage from "./components/PlaceOrderPage/PlaceOrderPage";
import FavoritePage from "./components/FavoritePage/FavoritePage";
import SearchResults from "./components/SearchResults/SearchResults";

import CreateRestaurant from "./components/ManageRestaurants/CreateRestaurant";
import MyAllRestaurants from "./components/ManageRestaurants/MyAllRestaurants";
import MyOneRestaurant from "./components/ManageRestaurants/MyOneRestaurant/MyOneResturant";
import EditRestaurant from "./components/ManageRestaurants/EditRestaurant/EditRestaurant";

import MyResAllMenuitems from "./components/ManageRestaurants/MyResAllMenuitems/MyResAllMenuitems";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import PleaseLoginPage from "./components/auth/PleaseLoginPage";
import UnauthorizedPage from "./components/auth/UnauthorizedPage";
import NotFoundPage from "./components/auth/NotFoundPage";

// Protection checks:
// Generally,
// for login/signup page, if already have session user, redirect to home page
// need to check for some view, when 0 results, how does it look
// need to check new user experience, each route and view validity
// need to check log out user experience, each route and view validity
// need to check the not protected routes, user experience difference between login and logout
// need to check for certain routes (manage business routes), the user is authorized (session user has authorization to access the page and manage)
// need to check for certain routes (/checkout, /place-order), no active cart existing, redirect to home page
// need to check for certain routes with parameters, the server returns 404 (1000th restaurant non-existing), render not found page, redirecting to home page
// need to check for certain routes with parameters, the parameter type should be integer ()
// for a special component - check nearest restaurant, if no session user, not able to get nearest info, redirecting to /auth - need login

// Route protection pages:
// need log in (ProtectedRoute, <PleaseLoginPage />(component, '/auth')) -> when not session user, render need login page, redirecting to home page
// unauthorized to access page (<UnauthorizedPage />(component, '/unauthorized')) -> when there is session user but session user is not authorized, render unauthorized page, redirecting to home page
// 404 not found page (<NotFoundPage /> component): 1. when not any url matches the route, 2. when server returns nothing, render not found page, redirecting to home page
// loading page (<LoadingPage /> component)-> when component inside state variable isLoading == true and is loading the page information, render spinner and message, show pageview afterwards

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
          <ProtectedRoute
            exact
            path="/orders"
            message="Please log in to check past orders"
          >
            <PastOrders />
          </ProtectedRoute>
          <ProtectedRoute
            exact
            path="/favorites"
            message="Please log in to check favorited restaurants"
          >
            <FavoritePage />
          </ProtectedRoute>
          <ProtectedRoute
            exact
            path="/search"
            message="Please log in to check search results"
          >
            <SearchResults />
          </ProtectedRoute>
          <ProtectedRoute
            exact
            path="/checkout"
            message="Please log in to place order"
          >
            <CheckoutPage />
          </ProtectedRoute>
          <ProtectedRoute
            exact
            path="/place-order"
            message="Please log in to place order"
          >
            <PlaceOrderPage />
          </ProtectedRoute>

          {/* manage restaurant */}
          <ProtectedRoute
            exact
            path="/business/restaurant-builder"
            message="Please log in to create a restaurant"
          >
            <CreateRestaurant />
          </ProtectedRoute>
          <ProtectedRoute
            exact
            path="/business/restaurants"
            message="Please log in to manage restaurants"
          >
            <MyAllRestaurants />
          </ProtectedRoute>

          {/* !! remember to check authentication for business routes with restaurantId */}
          <ProtectedRoute
            exact
            path="/business/:restaurantId"
            message="Please log in to manage restaurants"
          >
            <MyOneRestaurant />
          </ProtectedRoute>
          <ProtectedRoute
            exact
            path="/business/:restaurantId/edit"
            message="Please log in to manage restaurants"
          >
            <EditRestaurant />
          </ProtectedRoute>

          {/* manage menu */}
          <ProtectedRoute
            exact
            path="/business/:restaurantId/items"
            message="Please log in to manage restaurants"
          >
            <MyResAllMenuitems />
          </ProtectedRoute>
          <ProtectedRoute
            exact
            path="/business/:restaurantId/items/new"
            message="Please log in to manage restaurants"
          >
            <Navigation isLoaded={isLoaded} />
            {/* <CreateMyMenuitem /> */}
          </ProtectedRoute>
          <ProtectedRoute
            exact
            path="/business/:restaurantId/items/:itemId"
            message="Please log in to manage restaurants"
          >
            <Navigation isLoaded={isLoaded} />
            {/* <MyResOneMenuItem /> */}
          </ProtectedRoute>
          <ProtectedRoute
            exact
            path="/business/:restaurantId/items/:itemId/edit"
            message="Please log in to manage restaurants"
          >
            <Navigation isLoaded={isLoaded} />
            {/* <EditMyResOneMenuItem /> */}
          </ProtectedRoute>

          <Route exact path="/auth">
            <PleaseLoginPage />
          </Route>
          <Route exact path="/unauthorized">
            <UnauthorizedPage />
          </Route>
          <Route exact path="/not-found">
            <NotFoundPage />
          </Route>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      )}
      {/* <Footer /> */}
    </>
  );
}

export default App;
