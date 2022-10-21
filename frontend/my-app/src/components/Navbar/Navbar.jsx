import React from "react";
import './Navbar.css'
import { SidebarData } from './NavbarData'

function Sidebar() {
  return (<div className="Sidebar">
    <ul className="SidebarList">
      {SidebarData.map((val, key) => {
        return (
          <li
            key={key}
            className="row"
            id={window.location.pathname === val.link ? "active" : ""}
            onClick={() => { window.location.pathname = val.link }}>
            <div id="icon">{val.icon}</div>{" "}
            <div id="title">{val.title}</div>
          </li>
        );
      })}</ul>
  </div>
  )
}

export default Sidebar;