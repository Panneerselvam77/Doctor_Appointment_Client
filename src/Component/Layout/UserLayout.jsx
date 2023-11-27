import React, { useState } from "react";
import "./userlayout.css";
import mhpwhite from "../../Asset/mhp-white.png1.png";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "@mui/material";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import EventIcon from "@mui/icons-material/Event";
import { useSelector } from "react-redux";

export default function UserLayout({ children }) {
  const [openwidth, setOpenwidth] = useState(true);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  //   User Menu
  const userMenu = [
    {
      name: "Home",
      icon: <HomeIcon />,
      path: "/home",
    },
    {
      name: "Appointment",
      icon: <EventIcon />,
      path: "/appoinments",
    },
    {
      name: "Apply-Doctor",
      icon: <PersonIcon />,
      path: "/apply-doctor",
    },
  ];
  //   Admin Menu
  const adminMenu = [
    {
      name: "Home",
      icon: <HomeIcon />,
      path: "/home",
    },
    {
      name: "Users",
      icon: <PersonIcon />,
      path: "/admin/userslist",
    },
    {
      name: "Doctors",
      icon: <MedicalServicesOutlinedIcon />,
      path: "/admin/doctorslist",
    },
  ];
  //   Doctor Menu
  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: <HomeIcon />,
    },
    {
      name: "Appointments",
      path: "/doctor/appointments",
      icon: <EventIcon />,
    },
    {
      name: "Doctor",
      path: `/doctor/profile/${user?._id}`,
      icon: <PersonIcon />,
    },
  ];

  const menuToBeRendered = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;
  const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User";

  return (
    <div id="main">
      <div id={openwidth ? "sidebar" : "sidebar-active"}>
        {/* Logo */}
        <div className={openwidth ? "side-logo" : "side-logo-active"}>
          <Link to={"/home"}>
            {" "}
            <img src={mhpwhite} alt="logo" />
          </Link>
        </div>
        {/* Menu List and Icons  */}
        <div className={openwidth ? "side-menu" : "side-menu-active"}>
          {menuToBeRendered.map((menu, index) => {
            return (
              <div key={index}>
                <span>
                  {openwidth ? (
                    <div className="menu-column mt-5">
                      <Link
                        to={menu.path}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <p>
                          {menu.icon}
                          <b className="px-3">{menu.name}</b>
                        </p>
                      </Link>
                    </div>
                  ) : (
                    <div className="mt-5">
                      <Link
                        to={menu.path}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <p>{menu.icon}</p>
                      </Link>
                    </div>
                  )}
                </span>
              </div>
            );
          })}
          {/* Logout */}
          <div
            className={openwidth ? "side-menu" : "side-menu-active"}
            onClick={() => {
              localStorage.clear();
            }}
          >
            {openwidth ? (
              <div className="menu-column mt-5 mr-5">
                <Link style={{ textDecoration: "none", color: "black" }}>
                  <p>
                    <LogoutIcon />
                    <b className="px-3">Logout</b>
                  </p>
                </Link>
              </div>
            ) : (
              <div className="mt-5 mx-4">
                <Link style={{ textDecoration: "none", color: "black" }}>
                  <LogoutIcon />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <div id="content">
        {/* Header */}
        <div id={openwidth ? "header" : "header-active"}>
          <div
            className="menu-icon align-items-center mr-3"
            onClick={() => setOpenwidth(!openwidth)}
          >
            {openwidth ? <MenuOpenIcon /> : <MenuIcon />}
          </div>

          <div
            className="d-flex align-items-center mr-5"
            style={{ cursor: "pointer" }}
          >
            <div onClick={() => navigate("/notification")}>
              <Badge
                badgeContent={user?.unseenNotification.length}
                color="error"
              >
                <NotificationsNoneOutlinedIcon />
              </Badge>
            </div>
            <div>
              <PersonOutlinedIcon className="mx-5" />
            </div>
            <div>
              <p>{role}</p>
            </div>
          </div>
        </div>
        <div id={openwidth ? "body" : "body-active"}>{children}</div>
        {/* Footer */}
        <div id={openwidth ? "footer" : "footer-active"}>
          <div>
            <h6>
              <em>My Health Partner</em> ©2023 Created{" "}
              <strong>Panneer Selvam</strong>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}
