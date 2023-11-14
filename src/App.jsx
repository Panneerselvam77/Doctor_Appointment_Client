import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/User/Login/Login.jsx";
import Register from "./Pages/User/Register/Register.jsx";
import EmailVerify from "./Pages/User/Emailverify/EmailVerify.jsx";
import Home from "./Pages/Home/Home.jsx";
import { useSelector } from "react-redux";
import WelcomePage from "./Pages/WelcomePage/WelcomePage.jsx";
import ProductedRoute from "./Component/ProductedRoute/ProductedRoute.jsx";
import PublicRoute from "./Component/ProductedRoute/PublicRoute.jsx";

function App() {
  /* Error => state.alerts or state.alert */
  const { loading } = useSelector((state) => state.alert);
  return (
    <div className="App">
      {loading && (
        <div className="spinner-parent">
          <div class="spinner-border text-primary" role="status"></div>
        </div>
      )}
      <Routes>
        <Route exact path="/" element={<WelcomePage />} />
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
      </Routes>
    </div>
  );
}

export default App;
