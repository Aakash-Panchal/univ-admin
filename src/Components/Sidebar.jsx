import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../Univlogo.png";
import { RxDoubleArrowLeft, RxExit } from "react-icons/rx";
import { BiBadgeCheck } from "react-icons/bi";
import { RiHome3Line } from "react-icons/ri";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <div className="sidebar_logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="sidebar_btn">
          <RxDoubleArrowLeft />
        </div>
      </div>
      <div className="sidebar_content">
        <div className="sidebar_menu_links">
          <NavLink to="/">
            <RiHome3Line />
            Dashboard
          </NavLink>
          <NavLink to="/sponsor">
            <BiBadgeCheck />
            Sponsor
          </NavLink>
          <NavLink to="/team">
            <BiBadgeCheck />
            Teams
          </NavLink>
        </div>
        <div className="logout_btn">
          <RxExit /> Logout
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
