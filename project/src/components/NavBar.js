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
    justify-content: space-between;
    align-items: center;
  `;

  return (
    <NavBar>
      <p style={{ verticalAlign: "center", minWidth: "30px" }}>Left</p>
      <img
        style={{ height: "40px" }}
        src={logoBM}
        onClick={() => {
          Navigate("/");
        }}
      ></img>
      <p style={{ verticalAlign: "center", minWidth: "30px" }}>right</p>
    </NavBar>
  );
}

export default NavBar;
