import React from "react";
import './Navbar.css'
import { SidebarData } from './NavbarData'
import IconButton from '@mui/material/IconButton';

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
            <button className = "icon-button" id="icon" >{val.icon}</button>
          </li>
        );
      })}</ul>
  </div>
  )
}

export default Sidebar;