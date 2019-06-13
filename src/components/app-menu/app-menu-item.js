import React from "react";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";
import "../../App.css";

export function AppMenuItem(props) {
  return (
    <Menu.Item>
      <NavLink to={props.to} activeStyle={{ color: "lightgrey" }}>
        {props.children}
      </NavLink>
    </Menu.Item>
  );
}
