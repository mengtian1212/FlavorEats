import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

// const ProtectedRoute = (props) => {
//   const user = useSelector((state) => state.session.user);
//   return (
//     <Route {...props}>
//       {user ? props.children : <Redirect to="/restaurants" />}
//     </Route>
//   );
// };

// export default ProtectedRoute;

const DelayedRedirect = () => {
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

const ProtectedRoute = (props) => {
  const user = useSelector((state) => state.session.user);

  return (
    <Route {...props}>{user ? props.children : <DelayedRedirect />}</Route>
  );
};

export default ProtectedRoute;
