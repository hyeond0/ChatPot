import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoBM from "../img/logoBM.png";
import styled from "styled-components";
import { BsPerson, BsPersonFill } from "react-icons/bs";

function NavBar() {
  let Navigate = useNavigate();

  // Hover Event State
  const [isHovered, setIsHovered] = useState(false);

  const addHover = () => {
    setIsHovered(true);
  };

  const removeHover = () => {
    setIsHovered(false);
  };

  // Element Style
  const NavBar = styled.div`
    width: 100vw;
    height: 100px;
    background-color: #f2f0ef;
    padding: 0px 4%;

    display: flex;
    justify-content: space-between;
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

  const StyledIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    color: #352e29;
    font-size: 20px;
    min-width: 30px;
  `;

  const BuildTime = styled.div`
    width: 100%;
    padding: 10px 0px;
    background-color: white;
    margin: 0px;

    position: fixed;
    top: 100px;
    margin: 0 auto;
    left: 0;
    right: 0;
    z-index: 1;
  `;

  const [showTag, setShowTag] = useState(window.innerWidth <= 768);

  return (
    <>
      <NavBar>
        {showTag && <p style={{ verticalAlign: "center", minWidth: "30px" }}></p>}
        <img
          alt="logo"
          style={{ height: "40px", cursor: "pointer" }}
          src={logoBM}
          onClick={() => {
            Navigate("/");
          }}
        ></img>
        <StyledIcon onMouseEnter={addHover} onMouseLeave={removeHover}>
          {isHovered ? (
            <BsPersonFill
              onClick={() => {
                Navigate("/test");
              }}
            />
          ) : (
            <BsPerson />
          )}
        </StyledIcon>
      </NavBar>
      <BuildTime>
        ⏰ <b>Build Time :</b> 0608(24:00)
      </BuildTime>
    </>
  );
}

export default NavBar;
