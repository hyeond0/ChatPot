import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// color
// 1. f2f0ef
// 2. e5dcd5
// 3. bcb1a2
// 4. 443a37

// 라우터 라이브러리
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Container, Nav } from "react-bootstrap";

import logoBM from "./img/logoBM.png";

function App() {
  let navigate = useNavigate();

  return (
    <div className="App">
      <NavBar></NavBar>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div>check</div>
            </>
          }
        />
      </Routes>
    </div>
  );
}

function NavBar() {
  let navigate = useNavigate();

  return (
    <div className="navBar">
      <p style={{ verticalAlign: "center" }}>Left</p>
      <img
        className="logoImg"
        src={logoBM}
        onClick={() => {
          navigate("/");
        }}
      ></img>
      <p style={{ verticalAlign: "center" }}>right</p>
    </div>
  );
}
export default App;
