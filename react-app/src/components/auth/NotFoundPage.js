import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./auth.css";

function NotFoundPage() {
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
    <div className="need-log-in-auth">
      <img
        src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/29ed4bc0793fd578.svg"
        alt=""
        className="need-log-in-img"
      />

      <div className="need-log-in-title">Page Not Found</div>
      {/* <div className="need-log-in-text">
        The page you are looking for doesn't exist.
      </div> */}
      <div className="need-log-in-text">
        Redirecting to Home page in {countdown} seconds...
      </div>
    </div>
  );
}

export default NotFoundPage;
