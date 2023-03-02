import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../Univlogo.png";
import { RxDoubleArrowLeft, RxExit, RxDoubleArrowRight } from "react-icons/rx";
import { BiBadgeCheck } from "react-icons/bi";
import { RiHome3Line } from "react-icons/ri";
import { AiOutlineTeam } from "react-icons/ai";

const Sidebar = ({ verify, setLogggedIn, toastOptions, toast }) => {
  const [activeNav, setActiveNav] = useState(false);

  const MenuBtn = () => {
    activeNav ? setActiveNav(false) : setActiveNav(true);
  };

  const logOut = () => {
    localStorage.clear();
    setLogggedIn(false);
    toast.success("Done", toastOptions);
    verify();
  };

  return (
    <div className={activeNav ? "sidebar active_sidebar" : "sidebar"}>
      <div className="sidebar_header">
        <div className="sidebar_logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="sidebar_btn" onClick={MenuBtn}>
          {activeNav ? <RxDoubleArrowLeft /> : <RxDoubleArrowRight />}
        </div>
      </div>
      <div className="sidebar_content">
        <div className="sidebar_menu_links">
          <NavLink to="/">
            <RiHome3Line />
            <p>Dashboard</p>
          </NavLink>
          <NavLink to="/clients">
            <BiBadgeCheck />
            <p>Clients</p>
          </NavLink>
          <NavLink to="/brands">
            <BiBadgeCheck />
            <p>Brands</p>
          </NavLink>
          <NavLink to="/expertise">
            <AiOutlineTeam />
            <p>Expertise</p>
          </NavLink>
          {/* <NavLink to="/team">
            <AiOutlineTeam />
            <p>Teams</p>
          </NavLink> */}
        </div>
        <div className="logout_btn" onClick={logOut}>
          <RxExit /> <p>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
