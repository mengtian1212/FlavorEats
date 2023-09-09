import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

const PleaseLoginPage = (props) => {
  const user = useSelector((state) => state.session.user);
  const history = useHistory();

  useEffect(() => {
    const timeout = setTimeout(() => {
      history.push("/restaurants");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [history]);

  return (
    <div className="need-log-in">
      <div>Please log in</div>
      <div>Redirecting to Home page...</div>
    </div>
  );
};

export default PleaseLoginPage;
