import { BiListPlus } from "react-icons/bi";
import styled from "styled-components";

function OptionList(props) {
  const CustomInput = styled.input`
    background: none;
    border: none;
    outline: none;
    color: #f2f0ef;
  `;

  return (
    <>
      <div className="optionContainer">
        <div className="cardTitle">Option</div>
        {props.option.map(function (item, i) {
          return (
            <>
              <div className="optionList">{item}</div>
            </>
          );
        })}
        <div className="optionWrite">
          <CustomInput
            onClick={(e) => {
              e.stopPropagation();
            }}
            placeholder="옵션을 직접 작성해주세요"
            onSubmit={(e) => {
              e.preventDefault();
              console.log(e.target.value);
            }}
          ></CustomInput>{" "}
          <BiListPlus
            style={{
              color: "f2f0ef",
              fontSize: "20px",
              flexShrink: "0",
              borderRadius: "50%",
              marginLeft: "20px",
            }}
          />
        </div>
      </div>
    </>
  );
}

export default OptionList;
