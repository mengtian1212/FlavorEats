import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { fetchCartsThunk } from "../../store/orders";
import OneCartBtn from "../Carts/OneCartBtn/OneCartBtn";
import MultipleCartsBtn from "../Carts/MultipleCartsBtn/MultipleCartsBtn";
import "../Carts/MultipleCartsBtn/MultipleCartsBtn.css";

function CartButton({ user }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const { restaurantId } = useParams();
  console.log("restaurantId", restaurantId);

  const carts = useSelector((state) => (state.orders ? state.orders : {}));
  const num_carts = Object.keys(carts).length;
  const currentCart = carts[restaurantId];
  console.log("currentCart -------------------------------------", currentCart);

  useEffect(() => {
    if (sessionUser) dispatch(fetchCartsThunk());
    window.scroll(0, 0);
  }, [dispatch, sessionUser]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <>
      {user && (
        <>
          <button
            onClick={() => history.push("/orders")}
            className="btn-black cursor"
          >
            Past Orders
          </button>
          <div className="_16"></div>
          {currentCart && <OneCartBtn restaurantId={restaurantId} />}
          {!currentCart && <MultipleCartsBtn restaurantId={restaurantId} />}
        </>
      )}
      {!user && (
        <>
          <button
            onClick={() => history.push("/login")}
            className="btn-white cursor"
          >
            <i className="fa-solid fa-user"></i>
            <div>Log in</div>
          </button>
          <div className="_16"></div>
          <button
            onClick={() => history.push("/signup")}
            className="btn-black cursor"
          >
            Sign up
          </button>
        </>
      )}
    </>
  );
}

export default CartButton;
