import axios from "axios";
import styled from "styled-components";

function MakeRequest(props) {
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
  `;

  return (
    <>
      <MakeBtn
        onClick={() => {
          axios.get("/URL", { ...props.selected, message: `${props.selected}을(를) 활용한 레시피 추천해줘` });
        }}
      >
        제작
      </MakeBtn>
    </>
  );
}

export default MakeRequest;
