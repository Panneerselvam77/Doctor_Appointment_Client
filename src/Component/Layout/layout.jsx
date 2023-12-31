import React, { useState } from "react";
import "./layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Badge } from "antd";
import { useSelector } from "react-redux";

export default function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  // const isUser = user._doc;
  const location = useLocation();

  // User Menu
  const userMenu = [
    {
      name: "Home",
      path: "/home",
      icon: "ri-home-2-line",
    },
    {
      name: "Appointment",
      path: "/appoinments",
      icon: "ri-list-check",
    },
    {
      name: "Apply-Doctor",
      path: "/apply-doctor",
      icon: "ri-hospital-line",
    },
  ];

  // Admin Menu
  const adminMenu = [
    {
      name: "Home",
      path: "/home",
      icon: "ri-home-2-line",
    },
    {
      name: "Users",
      path: "/admin/userslist",
      icon: "ri-user-line",
    },
    {
      name: "Doctors",
      path: "/admin/doctorslist",
      icon: "ri-user-star-line",
    },
  ];

  /* Doctor Menu */
  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/doctor/appointments",
      icon: "ri-file-list-line",
    },
  ];

  const menuToBeRendered = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;
  const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User";
  return (
    <div className="main">
      <div className="d-flex layout">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-header">
            <h1 className="logo-title">MHP</h1>
            <h1 className="role">{role}</h1>
          </div>
          <div className="menu">
            {menuToBeRendered.map((menu, index) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  key={index}
                  className={`d-flex menu-item ${
                    isActive && "active-menu-item"
                  }`}
                >
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
            {/* Log out */}
            <div
              className={`d-flex menu-item`}
              onClick={() => {
                localStorage.clear();
              }}
            >
              <i className="ri-logout-box-r-line"></i>
              {!collapsed && <Link to={"/login"}>Log out</Link>}
            </div>
          </div>
        </div>
        {/* Content */}
        <div className="content">
          {/* Header */}
          <div className="header">
            {collapsed ? (
              <i
                className="ri-menu-2-line header-action-icon"
                onClick={() => setCollapsed(false)}
              ></i>
            ) : (
              <i
                className="ri-close-line header-action-icon"
                onClick={() => setCollapsed(true)}
              ></i>
            )}
            <div className="d-flex align-items-center mr-3">
              <Badge count={user?.unseenNotification.length}>
                <i
                  className="ri-notification-3-line header-action-icon mr-1"
                  onClick={() => navigate("/notification")}
                ></i>
              </Badge>
              <Link className="anchor mx-4" to={"/profile"}>
                {user?.name}
              </Link>
            </div>
          </div>
          {/* Body */}
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}
