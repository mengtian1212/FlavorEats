import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import "./auth.css";

const PleaseLoginPage = () => {
  const user = useSelector((state) => state.session?.user);
  const history = useHistory();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // const timeout = setTimeout(() => {
    //   history.push("/restaurants");
    // }, 3000);
    // window.scroll(0, 0);
    // return () => clearTimeout(timeout);

    const timeout = setTimeout(() => {
      if (countdown > 1) {
        setCountdown(countdown - 1);
      } else {
        history.push("/restaurants");
        window.scroll(0, 0);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [history, countdown]);

  return (
    <>
      {!user && (
        <div className="need-log-in-auth">
          <img
            src="https://tb-static.uber.com/prod/bliss-helpdot/asset/images/Eats.png"
            alt=""
            className="need-log-in-img"
          />
          <div className="need-log-in-title">Please log in</div>
          <div className="need-log-in-text">
            Redirecting to Home page in {countdown} seconds...
          </div>
        </div>
      )}
      {user && <Redirect to="/restaurants" />}
    </>
  );
};

export default PleaseLoginPage;
