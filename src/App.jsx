import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/User/Login/Login.jsx";
import Register from "./Pages/User/Register/Register.jsx";
import Home from "./Pages/Home/Home.jsx";
import EmailVerify from "./Pages/User/Emailverify/EmailVerify.jsx";
import FrontPage from "./Pages/Front_Page/FrontPage.jsx";

import { BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const { loading } = useSelector((state) => state.alert);
  return (
    <BrowserRouter>
      {loading && (
        <div className="spinner-parent">
          <div class="spinner-border text-primary" role="status"></div>
        </div>
      )}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/emailVerify" element={<EmailVerify />} />
        <Route path="/frontpage" element={<FrontPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
