import { useModal } from "../../context/Modal";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import UserMenuLogin from "./UserMenuLogin";
import UserMenuLogout from "./UserMenuLogout";

function UserButton({ user }) {
  const { closeModal, setModalContent, setModalClass } = useModal();
  const handleClickUserMenu = () => {
    setModalContent(
      <>
        {user ? (
          <UserMenuLogin closeMenu={closeModal} />
        ) : (
          <UserMenuLogout closeMenu={closeModal} />
        )}
        <a
          href="https://github.com/mengtian1212/FlavorEats"
          className="menu-item github0 cursor"
        >
          <i className="fa-brands fa-github"></i>
          <div>Github</div>
        </a>
      </>
    );
    setModalClass("profile-dropdown");
  };

  const location = useLocation();
  const [logoColor, setLogoColor] = useState("");
  useEffect(() => {
    if (location.pathname.startsWith("/business")) {
      // if (location.pathname === "/business/restaurant-builder") {
      setLogoColor("white-logo");
    } else {
      setLogoColor("");
    }
  }, [location]);

  return (
    <button
      onClick={handleClickUserMenu}
      className={`bars-icon cursor` + ` ` + logoColor}
    >
      <i className={`fa-solid fa-bars`}></i>
    </button>
  );
}

export default UserButton;
