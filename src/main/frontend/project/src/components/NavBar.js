import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoBM from "../img/logoBM.png";
import styled from "styled-components";

function NavBar() {
  let Navigate = useNavigate();

  const NavBar = styled.div`
    width: 100vw;
    height: 70px;
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
      height: 100px;
    }
  `;

  return (
    <>
      <NavBar>
        <StyledImg
          alt="logo"
          src={logoBM}
          onClick={() => {
            Navigate("/", { state: { direction: "left" } });
          }}
        ></StyledImg>
      </NavBar>
    </>
  );
}

const StyledImg = styled.img`
  height: 40px;
  cursor: pointer;

  @media (min-width: 768px) {
    height: 40px;
  }
`;

export default NavBar;
