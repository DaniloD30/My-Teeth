import React from 'react';

import { Link } from "react-router-dom";

import { Zoom, ListItem } from "@material-ui/core";

import './SubMenu.scss';

const SubMenu = (props) => {
  const { checked, data, fnClick } = props;
  return (
      <Zoom in={checked} style={{ transitionDelay: checked ? '300ms' : '800ms' }}>
        <div className="SubMenu">
          <div className="headerSubMenu">
            {/* <Typography className="titleSubMenu">
            {data.title}
          </Typography>
          <span className="btnCloseSubMenu" onClick={() => {fnClick(false)} }>
            <CloseIcon height="10px" width="10px" />
          </span> */}
          </div>
          {data.subPaths?.map((item, i) =>
            <Link
              id={item.label.replace(/ de /g, '').replace(/\s/g, '')}
              data-id={item.label.replace(/ de /g, '').replace(/\s/g, '')}
              key={i} to={item.path} className="link">
              <ListItem
                data-id={item.label.replace(/ de /g, '').replace(/\s/g, '')}
                id={item.label.replace(/ de /g, '').replace(/\s/g, '')}
                button
                className={`menuItem subMenuItem`}
                onClick={() => { fnClick(false) }}
              >
                <span>{item.label}</span>
              </ListItem>
            </Link>
          )}
        </div>
      </Zoom>
  );
}

export default SubMenu;
