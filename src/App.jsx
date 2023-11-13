import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/User/Login/Login.jsx";
import Register from "./Pages/User/Register/Register.jsx";
import Home from "./Pages/Home/Home.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
