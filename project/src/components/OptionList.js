import { BiListPlus } from "react-icons/bi";
import styled from "styled-components";

function OptionList(props) {
  const CustomInput = styled.input`
    background: none;
    border: none;
    outline: none;
    color: #f2f0ef;
  `;

  const OptionContainer = styled.div`
    max-width: 100%;
    margin-top: 40px;
    padding-bottom: 35px;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: start;
    align-items: center;
    gap: 5px;

    border-radius: 45px;
  `;

  const CardTitle = styled.div`
    width: 100%;
    text-align: center;
    margin-bottom: 25px;
    color: #352e29;

    font-size: x-large;
    font-weight: 700;
  `;

  const OptionList = styled.div`
    min-width: 100px;
    height: 50px;
    padding: 18px 30px;
    text-align: start;
    background-color: #f2f0ef;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    border-radius: 100px;
    box-shadow: 0 0 0 2px #d3d1d0 inset;

    &:hover {
      color: #f2f0ef;
      background-color: #352e29;

      box-shadow: none;
      transition: background-color 2s;
    }
  `;

  const OptionWrite = styled.div`
    padding: 18px 30px;
    text-align: start;
    background-color: #352e29;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    border-radius: 100px;
  `;

  return (
    <>
      <OptionContainer>
        <CardTitle>Option</CardTitle>
        {props.option.map(function (item, i) {
          return (
            <>
              <OptionList>{item}</OptionList>
            </>
          );
        })}
        <OptionWrite>
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
        </OptionWrite>
      </OptionContainer>
    </>
  );
}

export default OptionList;
