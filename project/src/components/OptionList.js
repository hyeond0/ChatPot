import { useEffect, useState } from "react";
import { BiListPlus } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { pushOption, removeOption, AddOption } from "../store.js";
import styled from "styled-components";
function OptionList(props) {
  let dispatch = useDispatch();

  useEffect(() => {
    console.log(props.selectedOption);
  }, [props.selectedOption]);

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
    height: 30px;
    padding: 25px 20px;
    text-align: start;
    background-color: #f2f0ef;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    border-radius: 100px;
    box-shadow: 0 0 0 1px #d3d1d0 inset;

    &:hover {
      color: #f2f0ef;
      background-color: #352e29;

      box-shadow: none;
      transition: background-color 2s;
    }

    ${({ clicked }) =>
      clicked &&
      `
      color: #f2f0ef;
      background-color: #352e29;

      box-shadow: none;
  `}
  `;

  const OptionWrite = styled.form`
    height: 30px;
    padding: 25px 30px;
    text-align: start;
    background-color: #352e29;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    border-radius: 100px;
  `;

  const StyledBiListPlus = styled(BiListPlus)`
    color: #f2f0ef;
    font-size: 23px;
    flex-shrink: 0;
    border: none;
  `;

  const BtnSubmit = styled.button`
    background-color: #352e29;
    color: none;
    border: none;

    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
  `;

  const CustomInput = styled.input`
    background: none;
    border: none;
    outline: none;
    color: #f2f0ef;
  `;

  return (
    <>
      <OptionContainer>
        <CardTitle>Option</CardTitle>
        {props.option.map(function (item, i) {
          return (
            <>
              <OptionList
                clicked={props.selectedOption.includes(item)}
                onClick={(e) => {
                  const selectedValue = e.currentTarget.innerText;
                  if (props.selectedOption.includes(selectedValue)) {
                    dispatch(removeOption(selectedValue));
                  } else {
                    dispatch(pushOption(selectedValue));
                  }
                }}
              >
                {item}
              </OptionList>
            </>
          );
        })}
        <OptionWrite
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <CustomInput type="text" placeholder="옵션을 직접 작성해주세요" />
          <BtnSubmit type="submit">
            <StyledBiListPlus />
          </BtnSubmit>
        </OptionWrite>
      </OptionContainer>
    </>
  );
}

export default OptionList;
