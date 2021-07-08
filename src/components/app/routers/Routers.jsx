import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import _ from "lodash";
import PrivateRoute from "~/components/app/routers/PrivateRoute";
import routes from "~/config/routes/routes";
// import NotFound from "../../../views/notFound/NotFound";
// import Utils from "~/helpers/Utils";

export const Authenticated = (props) => {
  const authenticatedRoutes = _.filter(
    routes,
    (r) => r.onlyAuthorized || r.onlyAuthorized === "both"
  );

  // console.log("routes ->", routes)
  return (
    <Switch>
      {authenticatedRoutes.map(
        (route, index) =>
          route.path && (
            <PrivateRoute
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.view}
              profiles={route.profilesAuthorized}
            />
          )
      )}
      <Route
        path="/login"
        exact
        component={() => <Redirect to={routes.find((r) => r.mainPage).path} />}
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export const Anonymous = (props) => {
  const anonymousRoutes = _.filter(
    routes,
    (r) => !r.onlyAuthorized || r.onlyAuthorized === "both"
  );
  return (
    <Switch>
      {anonymousRoutes.map(
        (route, index) =>
          route.path && (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.view}
            />
          )
      )}
      <Redirect to="/login" />
      {/* <Redirect to="/not-found" exact={true} component={<NotFound/>} /> */}
    </Switch>
  );
};

const routers = {
  Authenticated,
  Anonymous,
};
export default routers;
