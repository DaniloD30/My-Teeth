import React, { useState } from "react";

import { withRouter } from "react-router";

import {
  ClickAwayListener,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

import SubMenu from "~/components/app/menu/subMenu/SubMenu";

import routes from "~/config/routes/routes";

import "./Menu.scss";

const Menu = (props) => {
  const [subMenuActive, setSubMenu] = useState(false);
  const [subMenuData, setSubMenuData] = useState([]);

  const actualRoute = props.location.pathname;

  function isActualRoute(route, isSubMenu, routeSubMenu) {
    if (route === actualRoute) {
      return "active";
    }
    if (isSubMenu && actualRoute?.includes(routeSubMenu)) {
      return "active";
    }
    return undefined;
  }

  function activeSubMenu(hasSubMenu, title, subRoutes) {
    if (hasSubMenu) {
      setSubMenu(true); // !subMenuActive
      setSubMenuData({
        title: title,
        subPaths: subRoutes,
      });
    } else {
      setSubMenu(false);
    }
  }

  return (
    <ClickAwayListener
      onClickAway={() => {
        setSubMenu(false);
      }}
    >
      <div className="ceabs-menu-list">
        {subMenuActive && (
          <SubMenu
            checked={subMenuActive}
            data={subMenuData}
            fnClick={setSubMenu}
          />
        )}
        <List>
          {routes
            .filter((r) => r.showOnMenu)
            .map((route, index) => (
              <ListItem
                id={(route.menu())}
                key={index}
                button
                onClick={() => {
                  props.history.push(route.path);
                  activeSubMenu(
                    route.subMenu,
                    (route.menu()),
                    route.subRoutes
                  );
                }}
                className={`menuItem ${isActualRoute(
                  route.path,
                  route.subMenu,
                  route.pathMenu
                )}`}
              >
                <ListItemIcon style={{ minWidth: "auto" }}>
                  {route.icon ?   <img
                    src={route.icon}
                    style={{ height: "auto", width: 20 }}
                    alt={(route.menu())}
                  /> : route.iconMaterial}
                
                  {/* <route.icon style={{ height: "auto", width: 20 }} alt={t(route.menu())} /> */}
                </ListItemIcon>
                <ListItemText primary={(route.menu())} />
              </ListItem>
            ))}
        </List>
      </div>
    </ClickAwayListener>
  );
};

export default withRouter(Menu);
