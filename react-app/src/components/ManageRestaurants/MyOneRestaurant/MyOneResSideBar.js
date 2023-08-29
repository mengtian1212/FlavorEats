import { useHistory, useLocation } from "react-router-dom";

function MyOneResSideBar({
  myRestaurant,
  showOverview,
  setShowOverview,
  showMenus,
  setShowMenus,
}) {
  const history = useHistory();
  const location = useLocation();

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
  return (
    <>
      <div className="menu-item2 cursor lih" onClick={handleClickAll}>
        <i className="fa-solid fa-house menu-icons lih"></i>
        <div className="_16"></div>
        <div className="lih">Manage my restaurants</div>
      </div>
      <div className="menu-item3">
        Current restaurant <div className="_16"></div>
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
