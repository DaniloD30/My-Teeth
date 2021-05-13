import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...props }) => {
  return (
    <Route
      {...props}
      render={(propsRender) =>
        // requireProfile(props.profiles)
        true ? (
          <Component {...propsRender} />
        ) : (
          <Redirect to={"/not-authorized"} />
        )
      }
    />
  );
};

export default withRouter(PrivateRoute);
