import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/User/Login/Login.jsx";
import Register from "./Pages/User/Register/Register.jsx";
import EmailVerify from "./Pages/User/Emailverify/EmailVerify.jsx";
import Home from "./Pages/Home/Home.jsx";
import { useSelector } from "react-redux";
// import WelcomePage from "./Pages/WelcomePage/WelcomePage.jsx";
import ProductedRoute from "./Component/ProductedRoute/ProductedRoute.jsx";
import PublicRoute from "./Component/ProductedRoute/PublicRoute.jsx";
import ApplyDoctor from "./Pages/Doctor/ApplyDoctor/ApplyDoctor.jsx";
import Notification from "./Pages/Notification/Notification.jsx";
import UserList from "./Pages/Admin/UserList.jsx";
import DoctorList from "./Pages/Admin/DoctorList.jsx";
import DoctorProfile from "./Pages/Doctor/DoctorProfile/DoctorProfile.jsx";

function App() {
  /* Error => state.alerts or state.alert */
  const { loading } = useSelector((state) => state.alerts);
  return (
    <div className="App">
      {loading && (
        <div className="spinner-parent">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      )}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route path="/emailVerify" element={<EmailVerify />} />
        <Route
          path="/home"
          element={
            <ProductedRoute>
              <Home />
            </ProductedRoute>
          }
        />
        <Route
          path="/apply-doctor"
          element={
            <ProductedRoute>
              <ApplyDoctor />
            </ProductedRoute>
          }
        />

        <Route
          path="/notification"
          element={
            <ProductedRoute>
              <Notification />
            </ProductedRoute>
          }
        />
        <Route
          path="/admin/userslist"
          element={
            <ProductedRoute>
              <UserList />
            </ProductedRoute>
          }
        />
        <Route
          path="/admin/doctorslist"
          element={
            <ProductedRoute>
              <DoctorList />
            </ProductedRoute>
          }
        />
        <Route
          path="/doctor/profile/:doctorId"
          element={
            <ProductedRoute>
              <DoctorProfile />
            </ProductedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
