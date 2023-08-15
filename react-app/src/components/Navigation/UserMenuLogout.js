import { useHistory } from "react-router-dom";

const UserMenuLogout = ({ closeMenu }) => {
  const history = useHistory();
  const handleClickLogin = (e) => {
    e.preventDefault();
    closeMenu();
    history.push("/login");
  };

  const handleClickSignup = (e) => {
    e.preventDefault();
    closeMenu();
    history.push("/signup");
  };

  return (
    <div className="menu-logout-container">
      <button onClick={handleClickSignup} className="user-signup cursor">
        Sign up
      </button>
      <div className="_16"></div>
      <button
        onClick={handleClickLogin}
        className="user-signup cursor btn-grey"
      >
        Log in
      </button>
      <div className="_16"></div>
      <button className="user-signup cursor btn-grey">
        Log in as Demo User
      </button>
    </div>
  );
};

export default UserMenuLogout;
