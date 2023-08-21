import { useHistory } from "react-router-dom";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";

const UserMenuLogout = ({ closeMenu }) => {
  const dispatch = useDispatch();
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

  const demoUser = async (e) => {
    e.preventDefault();

    const email = "demo@aa.io";
    const password = "password";
    closeMenu();
    await dispatch(login(email, password));
    history.push("/restaurants");
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
      <button className="user-signup cursor btn-grey" onClick={demoUser}>
        Log in as Demo User
      </button>
    </div>
  );
};

export default UserMenuLogout;
