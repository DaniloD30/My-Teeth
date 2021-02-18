import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import _ from "lodash";
import MatBreadcrumbs from "@material-ui/core/Breadcrumbs";
import routes from "~/config/routes/routes";
import "./breadcrumbs.scss";

const Breadcrumbs = (props) => {
  const authenticatedRoutes = _.filter(routes, (r) => r.onlyAuthorized || r.onlyAuthorized === "both");

  return (
    <div className="breadcrumbs">
      <Switch>
        {authenticatedRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={() => (
              <div className="">
                <span className="title">
                  <route.title />
                </span>
                <MatBreadcrumbs separator="|">
                  <Link key={"010"} to={"/"} className="link">Home</Link>
                  {route?.breadcrumbs?.map((path, idx) => (
                    <Link key={idx} to={path.url ? path.url : "#"} className="link">{path.label}</Link>
                  ))}
                </MatBreadcrumbs>
              </div>
            )}
          />
        ))}
      </Switch>
    </div>
  );
};

export default Breadcrumbs;
