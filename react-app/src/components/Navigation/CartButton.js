import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchCartsThunk } from "../../store/orders";
import OneCartBtn from "../Carts/OneCartBtn/OneCartBtn";
import MultipleCartsBtn from "../Carts/MultipleCartsBtn/MultipleCartsBtn";
import "../Carts/MultipleCartsBtn/MultipleCartsBtn.css";

function CartButton({ user }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const { restaurantId } = useParams();

  const carts = useSelector((state) => (state.orders ? state.orders : {}));
  const currentCart = carts[restaurantId];

  useEffect(() => {
    if (sessionUser) dispatch(fetchCartsThunk());
    window.scroll(0, 0);
  }, [dispatch, sessionUser]);

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
          <div className="one-cart-btn-container">
            {currentCart && <OneCartBtn restaurantId={restaurantId} />}
            {!currentCart && <MultipleCartsBtn restaurantId={restaurantId} />}
          </div>
        </>
      )}
      {!user && (
        <>
          <div className="header-icons">
            <a href="https://www.maggietian.com/" className="header-icon">
              <i className="fa-solid fa-globe header-icon"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/mengtian1212/"
              className="header-icon"
            >
              <i className="fa-brands fa-linkedin header-icon"></i>
            </a>
            <a href="https://github.com/mengtian1212" className="header-icon">
              <i className="fa-brands fa-github header-icon"></i>
            </a>
          </div>
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
