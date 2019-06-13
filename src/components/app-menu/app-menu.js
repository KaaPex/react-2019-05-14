import React, { Component } from "react";
import { Menu } from "antd";
import "../../App.css";

class AppMenu extends Component {
  render() {
    return (
      <Menu theme="dark" mode="horizontal" style={{ lineHeight: "64px" }}>
        {this.props.children}
      </Menu>
    );
  }
}

export default AppMenu;
