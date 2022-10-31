import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const SideBarItem = ({ sidebar }) => {
  const [open, setOpen] = useState(false);
  const [showLinks, setShowLinks] = useState(false);

  if (sidebar.childrens) {
    return (
      <div className={open ? "sidebar-item open" : "sidebar-item"}>
        <div className="sidebar-title"  onClick={() => setOpen(!open)}>
          <span className="item-space">
            {sidebar.icon}
            {sidebar.title}
          </span>
          <span className="toggle-btn">
            <BiChevronDown />
          </span>
        </div>
        <div className="sidebar-content">
            {sidebar.childrens.map((sidebar, index) => <SideBarItem key={index} sidebar={sidebar}/>)}
        </div>
      </div>
    );
  } else {
    return (
      <NavLink
        className="sidebar-item plain"
        onClick={() => setShowLinks(!showLinks)}
        to={sidebar.path}
        style={({ isActive }) => ({
          background: isActive ? "rgba(255, 255, 255, 0.2)" : "",
        })}
      >
        {/* <span className="item-space"> */}
          {/* <MdOutlineDashboard /> */}
          {sidebar.icon}
          {sidebar.title}
        {/* </span> */}
      </NavLink>
    );
  }
};

export default SideBarItem;
