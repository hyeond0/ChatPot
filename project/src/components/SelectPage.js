import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { styled, createGlobalStyle, css } from "styled-components";
import { Container, Row, Col } from "react-bootstrap";

import { pushSelected, removeSelected } from "../store.js";
import { BiX, BiListPlus } from "react-icons/bi";
import { useForm } from "react-hook-form";

function SelectPage() {
  const { register, handleSubmit } = useForm();
  let dispatch = useDispatch();
  let State = useSelector((state) => {
    return state;
  });

  return (
    <>
      <GlobalStyle></GlobalStyle>
      <SContainer>
        <Title>1. 식재료를 선택하세요</Title>
        <SRow>
          <SCol md={7}>
            <SelectContainer>
              {State.select.map(function (item, i) {
                return (
                  <>
                    <SelectItem
                      onClick={(e) => {
                        e.preventDefault();
                        const selectedValue = e.currentTarget.innerText;

                        if (State.selected.includes(selectedValue)) {
                          dispatch(removeSelected(selectedValue));
                        } else {
                          dispatch(pushSelected(selectedValue));
                        }
                      }}
                    >
                      {item.type}
                    </SelectItem>
                  </>
                );
              })}
            </SelectContainer>
          </SCol>
          <SCol md={5}>
            <SelectedContainer>
              {State.selected.map(function (item, i) {
                return (
                  <>
                    <SelectedItem id="selectedList">
                      {item}
                      <BtnBackground
                        onClick={(e) => {
                          const selectedValue = e.currentTarget.closest("#selectedList").innerText;
                          dispatch(removeSelected(selectedValue));
                        }}
                      >
                        <StyledBiX></StyledBiX>
                      </BtnBackground>
                    </SelectedItem>
                  </>
                );
              })}
              <SelectedWrite
                onSubmit={handleSubmit((data) => {
                  if (data.ingredients.length) {
                    dispatch(pushSelected(data.ingredients));
                  }
                })}
              >
                <CustomInput type="text" placeholder="추가할 식재료를 직접 작성해주세요" {...register("ingredients")} />
                <BtnSubmit type="submit">
                  <StyledBiListPlus />
                </BtnSubmit>
              </SelectedWrite>
            </SelectedContainer>
          </SCol>
        </SRow>
      </SContainer>
      <ButtonLeft>좌</ButtonLeft>
      <ButtonRight>우</ButtonRight>
    </>
  );
}

const ButtonLeft = styled.div`
  position: fixed;
  bottom: 5%;
  left: 15%;

  @media (min-width: 768px) {
    left: 5%;
  }
`;

const ButtonRight = styled.div`
  position: fixed;
  bottom: 5%;
  right: 15%;

  @media (min-width: 768px) {
    right: 5%;
  }
`;

const GlobalStyle = createGlobalStyle`
 ${css`
   ::-webkit-scrollbar {
     width: 0px;
   }

   ::-webkit-scrollbar-track {
     background-color: transparent;
   }

   ::-webkit-scrollbar-thumb {
     background-color: #352e29;
     border-radius: 50px;
     width: 10px;
   }

   ::-webkit-scrollbar-thumb:hover {
     background-color: #352e29;
   }
 `}
    
 @media (min-width: 768px) {
    ${css`
      ::-webkit-scrollbar {
        width: 5px;
      }

      ::-webkit-scrollbar-track {
        background-color: transparent;
      }

      ::-webkit-scrollbar-thumb {
        background-color: transparent;
      }

      ::-webkit-scrollbar-thumb:hover {
        background-color: transparent;
      }
    `}
  }
`;

const Title = styled.div`
  font-size: 180%;
  margin: 20px 0px;
`;

const SContainer = styled(Container)`
  width: 100%;
  height: 87%;
  margin: 0px 0px 0px 0px;
  padding: 0px 30px;

  @media (min-width: 768px) {
    padding: 0px 0px 0px 0px;
  }
`;

const SRow = styled(Row)`
  width: 100%;
  margin: 0px 0px 0px 0px;
  padding: 0px 0px 0px 0px;

  @media (min-width: 768px) {
    height: 100%;
  }
`;

const SCol = styled(Col)`
  margin: 0px 0px 7% 0px;
  padding: 0px;
  height: 100%;

  @media (min-width: 768px) {
  }
`;

const SelectContainer = styled.div`
  padding: 20px 0px;
  width: 100%;
  max-height: 100%;

  display: flex;
  flex-wrap: nowrap;
  justify-content: start;

  overflow-x: auto;
  overflow-y: auto;
  gap: 2%;

  @media (min-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;

    ${css`
      ::-webkit-scrollbar {
        width: 10px;
      }

      ::-webkit-scrollbar-track {
        background-color: #f1f1f1;
      }

      ::-webkit-scrollbar-thumb {
        background-color: #888;
      }

      ::-webkit-scrollbar-thumb:hover {
        background-color: #555;
      }
    `}
  }
`;

const SelectItem = styled.div`
  width: 23%;
  /* min-width: 23%; */
  min-width: 30%;

  margin-bottom: 2%;
  height: 170px;
  background-color: #ffffff;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;

  border-radius: 25px;
  box-shadow: 0px 10px 20px -5px rgba(153, 153, 153, 0.2);
  cursor: pointer;

  @media (min-width: 768px) {
    min-width: 23%;
  }
`;

const SelectedContainer = styled.div`
  /* padding: 20px; */
  padding-bottom: 100px;

  width: 100%;
  max-height: 100%;

  display: flex;
  flex-direction: column;

  overflow-x: auto;
  overflow-y: auto;
  gap: 12px;

  @media (min-width: 768px) {
    padding: 20px;
  }
`;

const SelectedItem = styled.div`
  width: 100%;
  padding: 20px 20px;
  background-color: white;
  text-align: start;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  box-shadow: 0px 10px 20px -5px rgba(153, 153, 153, 0.2);
  border-radius: 10px;

  @media (min-width: 768px) {
    padding: 18px 20px;
  }
`;

const SelectedWrite = styled.form`
  width: 100%;
  padding: 18px 20px;
  background-color: #352e29;
  text-align: start;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  box-shadow: 0px 10px 20px -5px rgba(153, 153, 153, 0.2);
  border-radius: 10px;
`;

const BtnBackground = styled.div`
  width: 25px;
  height: 25px;
  margin-left: 20px;
  background-color: #f2f0ef;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  border-radius: 50%;
`;

const StyledBiX = styled(BiX)`
  color: #352e29;
  font-size: 20px;
  flex-shrink: 0;
  border-radius: 50%;
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

  width: 100%;
`;

export default SelectPage;
