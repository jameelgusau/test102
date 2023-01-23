import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { NavLink } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { MdOutlineDashboard, MdOutlineEditNotifications, MdOutlineInventory } from "react-icons/md";
import {
  BsHouse,
  BsPeople,
  BsCalendar2Check,
  BsCurrencyDollar,
} from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
// import sidebars from "../../data/sidebar.json"
import { TbFileCertificate } from "react-icons/tb"
import { RiReservedLine } from "react-icons/ri";
import { HiOutlineUserGroup } from "react-icons/hi";
import logo2 from "../../assets/img/whitelogo.svg";
import SideBarItem from "./SideBarItem";

const Aside = () => {
  // const user = useSelector((state) => state.userProfile.value);
  const [showLinks, setShowLinks] = useState(false);

  const menu = [
    {
      title: "Dashboard",
      icon:  <MdOutlineDashboard />,
      "path": ""
    },
    {
      title: "Property",
      icon:   <BsHouse />,
      childrens: [
        {
          title: "Properties",
          icon:   <BsHouse />,
          path:  "property"
        },
        {
          title: "My Reservations",
          icon:   <RiReservedLine />,
          path: "myreservation"
        },
        {
          title: "My Payments",
          icon:  <BsCurrencyDollar />,
          path: "mypayments"
        },
        {
          title: "My Certificates",
          icon:  <TbFileCertificate />,
          path: "mycertificates"
        },
        {
          title: "Clients",
          icon:   <BsPeople />,
          path: "prospects"
        },
        {
          title: "Reservations",
          icon:  <BsCalendar2Check />,
          path:  "reservations"
        },
        {
          title: "Payments",
          icon:  <BsCurrencyDollar />,
          path:  "payments"
        },
        {
          title: "Certificates",
          icon:  <TbFileCertificate />,
          path:  "certificates"
        }
      ]
    },
    {
      title: "Inventory",
      icon:   <MdOutlineInventory />,
      childrens: [
         {
          title: "Stores",
          icon: <HiOutlineUserGroup />,
          path:  "store"
         },
         {
          title: "Category",
          icon:  <MdOutlineEditNotifications />,
          path:  "category"
         },
         {
          title: "Item",
          icon:  <HiOutlineUserGroup />,
          path:  "item"
         }
      ]
    },
    {
      title: "Settings",
      icon:   <IoSettingsOutline />,
      childrens: [
         {
          title: "Users",
          icon: <HiOutlineUserGroup />,
          path:  "users"
         },
         {
          title: "Notification",
          icon:  <MdOutlineEditNotifications />,
          path:  "notificationsetting"
         }
      ]
    }
  ]

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
          {/* {list}
          {user?.role && user?.role === "Admin" && list2} */}
          <div className="sidebar">
            {
              menu.map((sidebar, index)=> <SideBarItem key={index} sidebar={sidebar} />)
            }
          </div>
        </div>
      </aside>
    </>
  );
};

export default Aside;
