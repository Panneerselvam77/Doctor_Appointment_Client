import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import "./layoutcheck.css";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
const { Header, Sider, Content, Footer } = Layout;

export default function LayoutCheck() {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  //   const items = [
  //     {
  //       key: "1",
  //       icon: <UserOutlined />,
  //       label: "Home",
  //     },
  //     {
  //       key: "2",
  //       icon: <VideoCameraOutlined />,
  //       label: "Appointment",
  //     },
  //     {
  //       key: "3",
  //       icon: <i className="ri-home-line" style={{ fontSize: 18 }} />,
  //       label: "Apply Doctor",
  //     },
  //   ];
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
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          className="demo-logo-vertical m-3"
          style={{ color: "white", fontSize: 28 }}
        >
          {role}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          //   items={items}
        >
          {menuToBeRendered.map((menu, index) => {
            const isActive = location.pathname === menu.path;
            return (
              <div
                key={index}
                className={`d-flex menu-item ${isActive && "active-menu-item"}`}
              >
                <i className={menu.icon}></i>
                {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
              </div>
            );
          })}
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          Content
        </Content>
        <Footer style={{ textAlign: "center" }}>
          <em> My Health Partner </em> ©2023 Created by{" "}
          <strong> Panneer Selvam </strong>
        </Footer>
      </Layout>
    </Layout>
  );
}
