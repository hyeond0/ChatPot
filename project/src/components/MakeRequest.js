import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
function MakeRequest(props) {
  let Navigate = useNavigate();

  const MakeBtn = styled.div`
    width: 80%;
    height: 7%;
    color: #f2f0ef;
    background-color: #352e29;

    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;
    bottom: 5%;

    border-radius: 10px;
    box-shadow: 0px 10px 20px -5px rgba(153, 153, 153, 0.78);

    cursor: pointer;
  `;

  return (
    <>
      <MakeBtn
        onClick={() => {
          function SendData(ingredients, option) {
            this.ingredients = ingredients;
            this.option = option;
          }

          let postData = new SendData(props.selected, props.selectedOption);
          console.log(postData);

          axios.post("/", { postData });
          Navigate("/recipe");
        }}
      >
        제작
      </MakeBtn>
    </>
  );
}

export default MakeRequest;
