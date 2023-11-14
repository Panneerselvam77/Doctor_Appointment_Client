import React, { useState } from "react";
import "./layout.css";
import { Link, useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

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
      name: "Apply Doctor",
      path: "/apply-doctor",
      icon: "ri-hospital-line",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-user-line",
    },
    {
      name: "Logout",
      path: "/logout",
      icon: "ri-logout-box-r-line",
    },
  ];

  return (
    <div className="main">
      <div className="d-flex layout">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-header">
            <h1>MHP</h1>
          </div>
          <div className="menu">
            {userMenu.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`d-flex menu-item ${
                    isActive && "active-menu-item"
                  }`}
                >
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
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
          </div>
          {/* Body */}
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}
