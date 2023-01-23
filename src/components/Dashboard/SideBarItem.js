import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const SideBarItem = ({ sidebar }) => {
  const [open, setOpen] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
    const user = useSelector((state) => state.userProfile.value);
  if (sidebar.childrens) {
    if(!((user?.role === "Prospect" || (user?.stores === [] && user?.role !== "Admin"))&& (sidebar?.title === "Inventory" || sidebar?.title === "Settings" ))){
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
    }

  } else {
    if((user?.role === "Prospect" || user?.role === "User") && (sidebar?.title === "Dashboard" || sidebar?.title === "Clients" ||sidebar?.title === "Reservations" || sidebar?.title === "Payments" ||  sidebar?.title === "Stores"|| sidebar.title === "Payments" || sidebar?.title === "Users" || sidebar?.title === "Notification" || sidebar?.title === "Settings" || sidebar?.title === "Certificates")) {
      return
    }else if((user?.role === "Prospect" || (user?.stores === [] && user?.role !== "Admin"))&& (sidebar?.title === "Inventory" || sidebar?.title  === "Category" || sidebar?.title === "Item")){
      return
    }if(!((user?.role === "Prospect")) && (sidebar?.title === "My Payments" || sidebar?.title === "My Reservations" || sidebar?.title === "My Certificates")){
      return
    }
     else{
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
  }
};

export default SideBarItem;
