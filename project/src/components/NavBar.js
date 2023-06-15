import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoBM from "../img/logoBM.png";
import styled from "styled-components";
import { BsPerson, BsPersonFill } from "react-icons/bs";
import { BiChevronRight } from "react-icons/bi";

function NavBar() {
  let Navigate = useNavigate();

  // Element Style
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

  const StyledIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 10px;

    color: #352e29;
    font-size: 18px;
    min-width: 30px;

    transition: all 1s ease;

    &:hover {
      text-decoration: underline;
    }

    cursor: pointer;
  `;

  const BuildTime = styled.div`
    width: 100%;
    padding: 10px 0px;
    background-color: white;
    margin: 0px;

    position: fixed;
    top: 0px;
    margin: 0 auto;
    left: 0;
    right: 0;
    z-index: 1;
  `;

  const [showTag, setShowTag] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setShowTag(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <NavBar>
        <img
          alt="logo"
          style={{ height: "40px", cursor: "pointer" }}
          src={logoBM}
          onClick={() => {
            Navigate("/");
          }}
        ></img>
        {/* <StyledIcon
          onClick={() => {
            Navigate("/selectIngredients");
          }}
        >
          <b>챗팟 시작하기</b>
          <BiChevronRight style={{ fontSize: "35px" }} />
        </StyledIcon> */}
      </NavBar>
    </>
  );
}

export default NavBar;
