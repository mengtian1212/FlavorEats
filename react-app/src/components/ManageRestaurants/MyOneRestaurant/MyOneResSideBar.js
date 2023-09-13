import { useHistory, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function MyOneResSideBar({ myRestaurant }) {
  const history = useHistory();
  const location = useLocation();
  const [showOverview, setShowOverview] = useState(true);
  const [showMenus, setShowMenus] = useState(false);

  const handleClickAll = () => {
    setShowOverview(false);
    setShowMenus(false);
    history.push(`/business/restaurants`);
  };

  const handleClickMyOne = () => {
    setShowOverview(true);
    setShowMenus(false);
    history.push(`/business/${myRestaurant.id}`);
  };

  const handleClickMenu = () => {
    setShowOverview(false);
    setShowMenus(true);
    history.push(`/business/${myRestaurant.id}/items`);
  };

  useEffect(() => {
    const overViewPathRegex = /^\/business\/\d+$/;
    if (overViewPathRegex.test(location.pathname)) {
      setShowOverview(true);
      setShowMenus(false);
    }

    const itemsPathRegex = /^\/business\/\d+\/items$/;
    if (itemsPathRegex.test(location.pathname)) {
      setShowOverview(false);
      setShowMenus(true);
    }
  }, [location]);

  return (
    <>
      <div className="menu-item2 cursor lih" onClick={handleClickAll}>
        <i className="fa-solid fa-house menu-icons lih"></i>
        <div className="_16"></div>
        <div className="lih">Back to Managing Platform</div>
      </div>
      <div className="menu-item3">
        Current restaurant <div className="_4"></div>
        <i className={`fa-solid fa-chevron-down`}></i>
      </div>
      <div className="man">
        <div className="">{myRestaurant.name}</div>
      </div>
      <div className="menu-item2 cursor lih" onClick={handleClickMyOne}>
        <i
          className={`fa-solid fa-chart-line pb4 ${
            showOverview ? "underfocus" : ""
          }`}
        ></i>
        <div className="_16"></div>
        <div className={`lih ${showOverview ? "underfocus" : ""}`}>
          Overview
        </div>
      </div>
      <div
        className={`menu-item2 cursor lih  ${showMenus ? "underfocus" : ""}`}
        onClick={handleClickMenu}
      >
        <i
          className={`fa-solid fa-utensils pb4  ${
            showMenus ? "underfocus" : ""
          }`}
        ></i>
        <div className="_16"></div>
        <div className={`lih ${showMenus ? "underfocus" : ""}`}>Menu</div>
      </div>
    </>
  );
}

export default MyOneResSideBar;
