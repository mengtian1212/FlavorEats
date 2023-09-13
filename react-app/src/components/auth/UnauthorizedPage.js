import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./auth.css";

const UnauthorizedPage = () => {
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
      <div className="need-log-in-auth">
        <img
          src="https://img.cdn4dd.com/s/managed/consumer/search/NoResult.svg"
          alt=""
          className="need-log-in-img"
        />
        <div className="need-log-in-title">Unauthorized</div>
        <div className="need-log-in-text">
          Redirecting to Home page in {countdown} seconds...
        </div>
      </div>
    </>
  );
};

export default UnauthorizedPage;
