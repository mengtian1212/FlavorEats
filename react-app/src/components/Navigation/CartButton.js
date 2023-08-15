import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function CartButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

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
          <button className="btn-black cursor">
            <i className="fa-solid fa-cart-shopping"></i>n carts
          </button>
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
