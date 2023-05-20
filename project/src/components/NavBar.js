import { useNavigate } from "react-router-dom";
import logoBM from "../img/logoBM.png";

function NavBar() {
  let Navigate = useNavigate();

  return (
    <div className="navBar">
      <p style={{ verticalAlign: "center", minWidth: "30px" }}>Left</p>
      <img
        className="logoImg"
        src={logoBM}
        onClick={() => {
          Navigate("/");
        }}
      ></img>
      <p style={{ verticalAlign: "center", minWidth: "30px" }}>right</p>
    </div>
  );
}

export default NavBar;
