import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoBM from "../img/logoBM.png";
import styled from "styled-components";

function NavBar() {
  let Navigate = useNavigate();

  const NavBar = styled.div`
    width: 100vw;
    height: 100px;
    background-color: #f2f0ef;
    padding: 0px 4%;

    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;
    top: 0%;
    margin: 0 auto;
    left: 0;
    right: 0;
    z-index: 1;

    @media (min-width: 768px) {
      justify-content: space-between;
    }
  `;

  return (
    <>
      <NavBar>
        <img
          alt="logo"
          style={{ height: "40px", cursor: "pointer" }}
          src={logoBM}
          onClick={() => {
            Navigate("/", { state: { direction: "left" } });
          }}
        ></img>
      </NavBar>
    </>
  );
}

export default NavBar;
