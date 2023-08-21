import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import UserButton from "../Navigation/UserButton";
import CartButton from "../Navigation/CartButton";

function Header({ isLoaded, logo }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [logoColor, setLogoColor] = useState(logo || "");
  const [navClass, setNavClass] = useState("");

  const handleClickLogo = () => {
    if (sessionUser) {
      history.push("/restaurants");
      window.scroll(0, 0);
    } else {
      // history.push("/");
      history.push("/restaurants");
      window.scroll(0, 0);
    }
  };

  return (
    <div className={`nav-container ` + navClass}>
      <div className="nav-left">
        <UserButton user={sessionUser} />
        <div className="_32"></div>
        <div className="logo-container cursor" onClick={handleClickLogo}>
          <div className={`logo-flavor` + ` ` + logoColor}>Flavor</div>
          <div className="logo-eats">Eats</div>
        </div>
      </div>
      {/* {!sessionUser && (
        <div className="nav-right">
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
        </div>
      )} */}
    </div>
  );
}

export default Header;
