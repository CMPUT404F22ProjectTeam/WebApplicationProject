import React from "react";
import './Navbar.css'
import { SidebarData } from './NavbarData'

function Sidebar() {
  return (
  <div className="Sidebar">
    <ul className="SidebarList">
      {SidebarData.map((val, key) => {
        return (
          <li
            key={key}
            className="row"
            onClick={() => { window.location.pathname = val.link }}>
            <button className="icon-button" id={window.location.pathname === val.link ? "active" : ""} >{val.icon}</button>
          </li>
        );
      })}</ul>
  </div>
  )
}

export default Sidebar;