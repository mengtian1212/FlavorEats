import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import UserMenuLogin from "./UserMenuLogin";
import UserMenuLogout from "./UserMenuLogout";

function UserButton({ user }) {
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current || !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);
  const closeMenu = () => setShowMenu(false);

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  const location = useLocation();
  const [logoColor, setLogoColor] = useState("");
  useEffect(() => {
    // if (location.pathname === "/business/restaurant-builder") {
    if (location.pathname.startsWith("/business")) {
      setLogoColor("white-logo");
    } else {
      setLogoColor("");
    }
  }, [location]);
  return (
    <>
      <button
        onClick={openMenu}
        className={`bars-icon cursor` + ` ` + logoColor}
      >
        <i className={`fa-solid fa-bars`}></i>
      </button>
      <div className={showMenu ? "modal-background" : ""} />
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <UserMenuLogin closeMenu={closeMenu} />
        ) : (
          <UserMenuLogout closeMenu={closeMenu} />
        )}
        <a
          href="https://github.com/mengtian1212/FlavorEats"
          className="menu-item github0 cursor"
        >
          <i className="fa-brands fa-github"></i>
          <div>Github</div>
        </a>
      </ul>
      {/* </div> */}
    </>
  );
}

export default UserButton;
