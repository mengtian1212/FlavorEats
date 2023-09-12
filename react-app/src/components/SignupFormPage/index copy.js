import "./SignupForm.css";
import {
  USSTATES,
  capitalizeFirstChar,
  formatAddress,
} from "../../utils/helper-functions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useLocation, useHistory } from "react-router-dom";
import { editUserAddressThunk, login, signUp } from "../../store/session";
import Header from "../Header/Header";
import { getKey } from "../../store/maps";
import { useJsApiLoader } from "@react-google-maps/api";
import NavAddressAutoComplete from "../Navigation/NavAddressAutoComplete";
import SignupAddressAutoComplete from "./SignupAddressAutoComplete";

const libraries = ["places"];

function SignupFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const location = useLocation();
  const landingAddressProp = location.state && location.state.landingAddress;

  const landingAddressData = landingAddressProp?.slice(0, -2).join(", ");
  const landingAddress = landingAddressData
    ? landingAddressData.split(", ").slice(1).join(", ")
    : "";
  const [myAddress, setMyAddress] = useState(landingAddressData || "");

  const [email, setEmail] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState(
    landingAddressProp ? landingAddressProp[1] : ""
  );
  const [city, setCity] = useState(
    landingAddressProp ? landingAddressProp[2] : ""
  );
  const [state, setState] = useState(
    landingAddressProp ? landingAddressProp[3] : ""
  );
  const [zip, setZip] = useState(
    landingAddressProp ? landingAddressProp[4] : ""
  );

  const [visiblepw, setVisiblepw] = useState(false);
  const [visiblepwc, setVisiblepwc] = useState(false);

  const [errors, setErrors] = useState([]);
  const [submitBtn, setSubmitBtn] = useState(false);

  const demoUser = async (e) => {
    e.preventDefault();

    const email = "demo@aa.io";
    const password = "password";

    setErrors({});
    const data = await dispatch(login(email, password));
    if (!landingAddressData) {
      history.push("/restaurants");
      return;
    }

    const formData = {
      address: landingAddressProp?.slice(0, -2).join(", "),
      city: landingAddressProp[2],
      state: landingAddressProp[3],
      zip: landingAddressProp[4],
      lat: landingAddressProp[5],
      lng: landingAddressProp[6],
    };
    await dispatch(editUserAddressThunk(formData, data.id));
    history.push("/restaurants");
  };

  const handleLogin = () => {
    if (!landingAddressData) {
      history.push("/login");
    } else {
      history.push("/login", { landingAddress: landingAddressProp });
    }
  };

  useEffect(() => {
    setErrors({});
    if (
      !email ||
      (email && email.trim().length === 0) ||
      (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) ||
      !first_name ||
      (first_name && first_name.trim().length < 4) ||
      !last_name ||
      (last_name && first_name.trim().length < 2) ||
      !password ||
      (password && password.trim().length < 6) ||
      !confirmPassword ||
      (confirmPassword && confirmPassword.trim().length < 6) ||
      (password && confirmPassword && password !== confirmPassword) ||
      !city ||
      (city && city.trim().length === 0) ||
      !zip ||
      !state ||
      (zip && zip.trim().length === 0)
    ) {
      setSubmitBtn(false);
    } else {
      setSubmitBtn(true);
    }

    const err = {};
    if (
      (email && email.trim().length === 0) ||
      (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
    ) {
      err.email = "Please provide a valid Email";
    }

    if (first_name && first_name.trim().length < 4 && first_name.length > 0) {
      err.first_name = "Please provide a first name with at least 4 characters";
    }

    if (last_name && last_name.trim().length < 2 && last_name.length > 0) {
      err.last_name = "Please provide a last name with at least 2 characters";
    }
    if (password && password.length < 6 && password.length > 0) {
      err.password = "Please provide a password with at least 6 characters";
    }

    if (password !== confirmPassword) {
      err.confirmPassword =
        "Confirm password field must be the same as the password field";
    }

    if (address && address.trim().length === 0)
      err.address = "Address is required";
    if (address && address.trim().length > 255)
      err.address = "Please enter an address less than 255 characters";
    // if (address.includes(",")) {
    //   err.address = "Please enter an address without special characters";
    // }

    if (city && city.trim().length === 0) err.city = "City is required";
    // if (!state) err.state = "State is required";
    if (zip && zip.trim().length !== 5)
      err.zip = "Please enter a 5 digit zipcode";

    setErrors(err);
  }, [
    submitBtn,
    email,
    password,
    confirmPassword,
    first_name,
    last_name,
    // address,
    // city,
    // state,
    // zip,
    myAddress,
  ]);

  const submitBtnClassName = submitBtn ? "enabledBtn cursor" : `disabledBtn`;

  const key = useSelector((state) => state.maps.key);
  const geoKey = useSelector((state) => state.maps.geoKey);

  useEffect(() => {
    if (!key) {
      dispatch(getKey());
    }
  }, [dispatch, key]);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: key,
    libraries: libraries,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const firstNamePayload = capitalizeFirstChar(first_name);
      const lastNamePayload = capitalizeFirstChar(last_name);
      const username = capitalizeFirstChar(first_name);
      const cityPayload = capitalizeFirstChar(city);
      const zipPayload = zip.trim();
      const addressPayload =
        capitalizeFirstChar(address) +
        ", " +
        capitalizeFirstChar(address) +
        ", " +
        cityPayload +
        ", " +
        state +
        " " +
        zip;

      setErrors({});
      const data = await dispatch(
        signUp(
          email,
          password,
          username,
          firstNamePayload,
          lastNamePayload,
          addressPayload,
          cityPayload,
          state,
          zipPayload
        )
      );

      if (data && data.errors) {
        setErrors(data.errors);
      }
    } else {
      setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }
  };

  if (sessionUser) return <Redirect to="/restaurants" />;
  return (
    <>
      <div className="black-background">
        <Header logo={"white-logo"} />
      </div>
      <div className="login-background">
        <div className="login-container1">
          <form className="login-form-c" onSubmit={handleSubmit}>
            {/* step 1  email*/}
            <div className="signup-email-container">
              <h1 className="login-title">
                Step 1: What's your email address?
              </h1>
              <input
                className="login-input"
                placeholder="Please enter email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>

            {/* step 2 first name & last name*/}
            <div className="signup-email-container">
              <h1 className="login-title">Step 2: What's your name?</h1>
              <div>Let us know how to properly address you.</div>
              <input
                className="login-input"
                placeholder="Please enter first name"
                type="text"
                value={first_name}
                onChange={(e) => setFirst_name(e.target.value)}
                required
              />
              {errors.first_name && (
                <p className="error-message">{errors.first_name}</p>
              )}
              <input
                className="login-input"
                placeholder="Please enter last name"
                type="text"
                value={last_name}
                onChange={(e) => setLast_name(e.target.value)}
                required
              />
              {errors.last_name && (
                <p className="error-message">{errors.last_name}</p>
              )}
            </div>

            {/* step 3 password & confirm password*/}
            <div className="signup-email-container">
              <h1 className="login-title">
                Step 3: Create your account password
              </h1>
              <div>Your passwords must be at least 6 characters long.</div>
              <div className="pw-loc">
                <input
                  className="login-input"
                  placeholder="Please enter your password"
                  type={visiblepw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div
                  onClick={() => setVisiblepw(!visiblepw)}
                  className="pwicon"
                >
                  {visiblepw ? (
                    <i className="fa-regular fa-eye"></i>
                  ) : (
                    <i className="fa-regular fa-eye-slash"></i>
                  )}
                </div>
              </div>
              {errors.password && (
                <p className="error-message">{errors.password}</p>
              )}
              <div className="pw-loc">
                <input
                  className="login-input"
                  placeholder="Please confirm password"
                  type={visiblepwc ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <div
                  onClick={() => setVisiblepwc(!visiblepwc)}
                  className="pwicon"
                >
                  {visiblepwc ? (
                    <i className="fa-regular fa-eye"></i>
                  ) : (
                    <i className="fa-regular fa-eye-slash"></i>
                  )}
                </div>
              </div>
              {errors.confirmPassword && (
                <p className="error-message">{errors.confirmPassword}</p>
              )}
            </div>

            {/* step 4 address city state zip*/}
            <div className="signup-email-container">
              {landingAddressData && (
                <div className="login-title">
                  Step 4: Confirm your address to get food delivered to your
                  door
                </div>
              )}
              {!landingAddressData && (
                <div className="login-title">
                  Step 4: Add an address to get food delivered to your door
                </div>
              )}

              <div>
                This will be used as your default delivery address. You can
                always change this later.
              </div>
              <SignupAddressAutoComplete
                apiKey={key}
                geoKey={geoKey}
                onAddressChange={setMyAddress}
              />
              <input
                className="login-input"
                placeholder="Example: 123 Main street"
                type="text"
                value={myAddress[0] + ", " + myAddress[1]}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              {errors.address && (
                <p className="error-message">{errors.address}</p>
              )}

              <input
                className="login-input"
                placeholder="City"
                type="text"
                value={myAddress[2]}
                onChange={(e) => setCity(e.target.value)}
                required
              />

              <select
                id="state-select1"
                className={`${state === "" ? "first-option" : ""} ${
                  errors.state ? "error-bg" : ""
                }`}
                value={myAddress[3]}
                onChange={(e) => setState(e.target.value)}
                required
              >
                <option value="">-- Select State --</option>
                {USSTATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {errors.city && <p className="error-message">{errors.city}</p>}
              {errors.state && <p className="error-message">{errors.state}</p>}

              <input
                className="login-input"
                placeholder="Zipcode"
                type="text"
                value={myAddress[4]}
                onChange={(e) => setZip(e.target.value)}
              />
              {errors.zip && <p className="error-message">{errors.zip}</p>}
            </div>

            <button
              type="submit"
              className={`reorder-btn8 ${submitBtnClassName}`}
              disabled={!submitBtn}
            >
              Create an account
            </button>
          </form>
          <button className={`reorder-btn8`} onClick={handleLogin}>
            Already with Flavor Eats? Log In
          </button>
          <button className={`reorder-btn8`} onClick={demoUser}>
            Log In as Demo User
          </button>
        </div>
      </div>
    </>
  );
}

export default SignupFormPage;
