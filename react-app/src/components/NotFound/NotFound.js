import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

function NotFound() {
  const history = useHistory();

  useEffect(() => {
    const timeout = setTimeout(() => {
      history.push("/restaurants");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [history]);

  return (
    <div className="need-log-in">
      <div>404 - Page Not Found</div>
      <div>The page you are looking for doesn't exist.</div>
    </div>
  );
}

export default NotFound;
