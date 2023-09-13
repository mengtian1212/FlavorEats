import { useModal } from "../../context/Modal";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import UserMenuLogin from "./UserMenuLogin";
import UserMenuLogout from "./UserMenuLogout";

function UserButton({ user }) {
  const { closeModal, setModalContent, setOnModalClose, setModalClass } =
    useModal();
  const handleClickUserMenu = () => {
    setModalContent(
      <>
        {user ? (
          <UserMenuLogin closeMenu={closeModal} />
        ) : (
          <UserMenuLogout closeMenu={closeModal} />
        )}
        <a
          href="https://www.maggietian.com/"
          className="menu-item github0 cursor userhover"
          target="_blank"
          rel="noreferrer"
        >
          <div className="menu-icons">
            <i className="fa-solid fa-globe"></i>
          </div>
          <div>Personal website</div>
        </a>
        <a
          href="https://github.com/mengtian1212/FlavorEats"
          className="menu-item github1 cursor userhover"
          target="_blank"
          rel="noreferrer"
        >
          <div className="menu-icons">
            <i className="fa-solid fa-code"></i>
          </div>
          <div>Project source code</div>
        </a>
        <a
          href="https://www.linkedin.com/in/mengtian1212/"
          className="menu-item github1 cursor userhover"
          target="_blank"
          rel="noreferrer"
        >
          <div className="menu-icons">
            <i className="fa-brands fa-linkedin"></i>
          </div>
          <div>Linkedin</div>
        </a>
        <a
          href="https://github.com/mengtian1212"
          className="menu-item github1 cursor userhover"
          target="_blank"
          rel="noreferrer"
        >
          <div className="menu-icons">
            <i className="fa-brands fa-github"></i>
          </div>
          <div>Github</div>
        </a>
      </>
    );
    setModalClass("profile-dropdown");
  };

  const location = useLocation();
  const [logoColor, setLogoColor] = useState("");
  useEffect(() => {
    if (
      location.pathname.startsWith("/business") ||
      location.pathname === "/login" ||
      location.pathname === "/signup"
    ) {
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
      <i className={`fa-solid fa-bars` + ` ` + logoColor}></i>
    </button>
  );
}

export default UserButton;
