import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import { useHistory } from "react-router-dom";

const UserMenuLogin = ({ user, closeMenu }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const handleOrders = (e) => {
    e.preventDefault();
    history.push("/orders");
    closeMenu();
  };

  const handleFavorites = (e) => {
    e.preventDefault();
    history.push("/favorites");
    closeMenu();
  };

  const handleMyRestaurants = (e) => {
    e.preventDefault();
    history.push("/my-restaurants");
    closeMenu();
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/");
    closeMenu();
  };

  return (
    <>
      <div className="user-profile">
        <img
          src="https://d1w2poirtb3as9.cloudfront.net/default.jpeg?Expires=1692030869&Signature=x7XbvRLTYfm4Ox9EC0vCq2cdK18metzKvdBvY~ys37~xgONWOaRkfGvgOutKSOs4Hb~fXzDAG8fH2kLTQP2l8ke89H~85XkktfwgMxFiiVJhXmkhsqoouK~GyH9yE4H5gLUwHHPL74qaYKnm-CErWsRufM9iV4rGVmDx-EtK57YmhLKOmJHfRYxN7KuiHcmw6G1ydJeD-B2bgGWAOfC6~b-o44AIrv6bLKtUO-b0-iHQ3lOiqr8rEHLCdXFrsFSlfuC2mHQHMCoZ~UVxKpi1OHdFv47jjwnYCY0AH7Oe~nqFcd9dQ~8GHdxKxMaR8xg0YUiw9cb3l7WaPZS1xOQqKA__&Key-Pair-Id=K36LFL06Z5BT10"
          alt=""
          className="user-img"
        ></img>
        <div className="_16"></div>
        <div>
          <div>{sessionUser.username}</div>
          <div className="manage-account">Manage account</div>
        </div>
      </div>
      <div className="menu-item cursor" onClick={handleOrders}>
        <div className="menu-icons">
          <i className="fa-solid fa-receipt"></i>
        </div>
        <div className="_16"></div>
        <div>Orders</div>
      </div>
      <div className="menu-item cursor" onClick={handleFavorites}>
        <div className="menu-icons">
          <i className="fa-solid fa-heart"></i>
        </div>
        <div className="_16"></div>
        <div>Favorites</div>
      </div>
      <div className="menu-item cursor" onClick={handleMyRestaurants}>
        <div className="menu-icons">
          <i className="fa-solid fa-store"></i>
        </div>
        <div className="_16"></div>
        <div>Manage Restaurants</div>
      </div>
      <div onClick={handleLogout} className="menu-item cursor">
        <div className="sign-out">Sign out</div>
      </div>
    </>
  );
};

export default UserMenuLogin;
