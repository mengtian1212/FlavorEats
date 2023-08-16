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

function CartButton({ user }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const { restaurantId } = useParams();
  console.log("restaurantId", restaurantId);

  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const carts = useSelector((state) => (state.orders ? state.orders : {}));
  const num_carts = Object.keys(carts).length;
  const currentCart = carts[restaurantId];
  console.log("currentCart -------------------------------------", currentCart);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (sessionUser) dispatch(fetchCartsThunk());
    window.scroll(0, 0);
  }, [dispatch, sessionUser]);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

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
          {/* <ul className={ulClassName} ref={ulRef}></ul> */}
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
