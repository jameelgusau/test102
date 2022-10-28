import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { MdOutlineDashboard, MdOutlineEditNotifications } from "react-icons/md";
import {
  BsHouse,
  BsPeople,
  BsCalendar2Check,
  BsCurrencyDollar,
} from "react-icons/bs";
import { RiReservedLine } from "react-icons/ri";
import { HiOutlineUserGroup } from "react-icons/hi";
import logo2 from "../../assets/img/whitelogo.svg";

const Aside = () => {
  const user = useSelector((state) => state.userProfile.value);
  const [showLinks, setShowLinks] = useState(false);
  const lists = [
    {
      name: "Dashboard",
      to: "",
      icon: <MdOutlineDashboard />,
      id: 1,
    },
    {
      name: "Property",
      to: "property",
      icon: <BsHouse />,
      id: 2,
    },
    {
      name: "My Reservation",
      to: "myreservation",
      icon: <RiReservedLine />,
      id: 3,
    },
    {
      name: "Store",
      to: "store",
      icon: <RiReservedLine />,
      id: 4,
    },

  ];
  const store =[
    {
      name: "Category",
      to: "category",
      icon: <HiOutlineUserGroup />,
      id: 5,
    },
    {
      name: "Item",
      to: "item",
      icon: <HiOutlineUserGroup />,
      id: 6,
    }
  ]
  const lists2 = [
    {
      name: "Clients",
      to: "prospects",
      icon: <BsPeople />,
      id: 7,
    },
    {
      name: "Users",
      to: "users",
      icon: <HiOutlineUserGroup />,
      id: 8,
    },
    {
      name: "Notification Settings",
      to: "notificationsetting",
      icon: <MdOutlineEditNotifications />,
      id: 9,
    },
    {
      name: "Reservations",
      to: "reservations",
      icon: <BsCalendar2Check />,
      id: 10,
    },
    {
      name: "Payments",
      to: "payments",
      icon: <BsCurrencyDollar />,
      id: 11,
    },
    // {
    //   name: "Agents",
    //   to: "agents",
    //   icon: <HiOutlineUserGroup />,
    //   id: 10,
    // },
  ];
  const list = lists.map((x) => (
    <NavLink
      key={x.id}
      className="sidenav__list-item"
      onClick={() => setShowLinks(!showLinks)}
      to={x.to}
      style={({ isActive }) => ({
        background: isActive ? "rgba(255, 255, 255, 0.2)" : "",
      })}
    >
      <span>{x.icon}</span>
      <span>{x.name}</span>
    </NavLink>
  ));
  const storeList = store.map((x) => (
    <NavLink
      key={x.id}
      className="sidenav__list-item"
      onClick={() => setShowLinks(!showLinks)}
      to={x.to}
      style={({ isActive }) => ({
        background: isActive ? "rgba(255, 255, 255, 0.2)" : "",
      })}
    >
      <span>{x.icon}</span>
      <span>{x.name}</span>
    </NavLink>
  ));

  const list2 = lists2.map((x) => (
    <NavLink
      key={x.id}
      className="sidenav__list-item"
      onClick={() => setShowLinks(!showLinks)}
      to={x.to}
      style={({ isActive }) => ({
        background: isActive ? "rgba(255, 255, 255, 0.2)" : "",
      })}
    >
      <span>{x.icon}</span>
      <span>{x.name}</span>
    </NavLink>
  ));

  return (
    <>
      <button className="menu-icon" onClick={() => setShowLinks(!showLinks)}>
        <AiOutlineMenu />
      </button>
      <aside className={`sidenav ${showLinks ? "active" : ""}`}>
        <button
          className="sidenav__close-icon"
          onClick={() => setShowLinks(!showLinks)}
        >
          <AiOutlineClose />
        </button>
        <div className="sidenav__logo">
          <img src={logo2} alt="Logo" className="sidenav__logo-icon" />
        </div>
        <div className="sidenav__list">
          {list}
          {user?.role && (user?.role === "Admin" || user?.role === "User") && storeList }
          {user?.role && user?.role === "Admin" && list2}
        </div>
      </aside>
    </>
  );
};

export default Aside;
