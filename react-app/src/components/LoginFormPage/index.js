import React, { useState, useEffect } from "react";
import { editUserAddressThunk, login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import "./LoginForm.css";
import Header from "../Header/Header";
import {
  capitalizeFirstChar,
  formatAddress,
} from "../../utils/helper-functions";

function LoginFormPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const landingAddressProp = location.state && location.state.landingAddress;
  console.log(landingAddressProp, landingAddressProp?.split(", ")[0]);

  const landingAddressData = landingAddressProp
    ? formatAddress(
        landingAddressProp?.split(", ")[0] + ", " + landingAddressProp,
        "string"
      )
    : "";
  const landingAddress = landingAddressData
    ? landingAddressData.split(", ").slice(1).join(", ")
    : "";

  console.log("landingAddress in login page", landingAddress);
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visiblepw, setVisiblepw] = useState(false);

  const [errors, setErrors] = useState([]);
  const [submitBtn, setSubmitBtn] = useState(false);

  useEffect(() => {
    setErrors({});
    if (
      !email ||
      (email && email.trim().length === 0) ||
      (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) ||
      password.length < 6 ||
      (password && password.trim().length === 0)
    ) {
      setSubmitBtn(false);
    } else {
      setSubmitBtn(true);
    }

    const err = {};
    if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      err.email = "Please provide a valid Email";
    }
    if (
      password.length < 6 &&
      password.length > 0 &&
      password.trim().length === 0
    ) {
      err.password = "Please provide a password with at least 6 characters";
    }

    setErrors(err);
  }, [submitBtn, email, password]);

  if (sessionUser) return <Redirect to="/restaurants" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const data = await dispatch(login(email, password));
    if (data && data.errors) {
      setErrors(data.errors);
    } else {
      if (!landingAddressData) return;

      const addressFormatedList = formatAddress(landingAddressData, "list");
      console.log("addressFormatedList", addressFormatedList);
      const formData = {
        address: landingAddressData,
        city: addressFormatedList[2],
        state: addressFormatedList[3],
        zip: addressFormatedList[4],
      };
      console.log(formData);
      return await dispatch(editUserAddressThunk(formData, data.id));
    }
  };

  const demoUser = async (e) => {
    e.preventDefault();

    const email = "demo@aa.io";
    const password = "password";

    setErrors({});
    await dispatch(login(email, password));
  };

  const submitBtnClassName = submitBtn ? "enabledBtn" : `disabledBtn`;
  return (
    <>
      <div className="black-background">
        <Header logo={"white-logo"} />
      </div>
      <div className="login-background">
        <div className="login-container">
          {landingAddress && (
            <div className="login-title0">
              Welcome back. Discover food near{" "}
              <span
                style={{ color: "rgb(4, 136, 72)" }}
                className="login-title0"
              >
                {landingAddress}
              </span>{" "}
              after log in.
            </div>
          )}
          <h1 className="login-title">What's your email and password?</h1>
          <form onSubmit={handleSubmit} className="login-form-c">
            <ul>
              {/* {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))} */}
            </ul>

            {/* input email  */}
            <div>
              <input
                className="login-input"
                placeholder="Enter email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>
            {/* input password  */}
            <div className="login-password">
              <input
                className="login-input"
                placeholder="Enter password"
                type={visiblepw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div onClick={() => setVisiblepw(!visiblepw)} className="pwicon">
                {visiblepw ? (
                  <i className="fa-regular fa-eye"></i>
                ) : (
                  <i className="fa-regular fa-eye-slash"></i>
                )}
              </div>
              {errors.password && (
                <p className="error-message">{errors.password}</p>
              )}
            </div>
            {/* login button  */}
            <button
              type="submit"
              disabled={!submitBtn}
              className={`reorder-btn8 ${submitBtnClassName}`}
            >
              Log In
            </button>
          </form>

          <div className="login-or-box">
            <span className="login-or">or</span>
          </div>
          <button onClick={demoUser} className={`reorder-btn8`}>
            Log in as Demo User
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              history.push("/signup");
            }}
            className={`reorder-btn8`}
          >
            Create an account
          </button>
        </div>
      </div>
    </>
  );
}

export default LoginFormPage;
