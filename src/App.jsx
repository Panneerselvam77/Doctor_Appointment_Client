import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/User/Login/Login.jsx";
import Register from "./Pages/User/Register/Register.jsx";
import Home from "./Pages/Home/Home.jsx";
import EmailVerify from "./Pages/User/Emailverify/EmailVerify.jsx";
import FrontPage from "./Pages/Front_Page/FrontPage.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/emailVerify" element={<EmailVerify />} />
        <Route path="/frontpage" element={<FrontPage />} />
      </Routes>
    </div>
  );
}

export default App;
