import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { styled, createGlobalStyle, css, keyframes } from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { pushSelected, removeSelected } from "../store.js";
import { BiX, BiListPlus } from "react-icons/bi";
import { BsHouseFill, BsArrowRight } from "react-icons/bs";
import { useForm } from "react-hook-form";

function SelectPage() {
  const { register, handleSubmit, reset } = useForm();
  let dispatch = useDispatch();
  let State = useSelector((state) => {
    return state;
  });
  const Navigate = useNavigate();

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
                      clicked={State.selected.includes(item.type)}
                      onClick={(e) => {
                        e.preventDefault();
                        const selectedValue = e.currentTarget.children[1].innerText;

                        if (State.selected.includes(selectedValue)) {
                          dispatch(removeSelected(selectedValue));
                        } else {
                          dispatch(pushSelected(selectedValue));
                        }
                      }}
                    >
                      <ItemDiv fs="330%"> {item.thumbnail}</ItemDiv>
                      <ItemDiv> {item.type}</ItemDiv>
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
                          e.stopPropagation();
                          const selectedValue = e.currentTarget.closest("#selectedList").innerText;
                          dispatch(removeSelected(selectedValue));
                        }}
                      >
                        <StyledBiX></StyledBiX>
                      </BtnBackground>
                    </SelectedItem>
                  </>
                );
              })}{" "}
              <SelectedWrite
                onSubmit={handleSubmit((data) => {
                  if (data.ingredients.length) {
                    dispatch(pushSelected(data.ingredients));
                    reset();
                  }
                })}
              >
                <CustomInput
                  type="text"
                  placeholder="원하는 식재료를 직접 추가해보세요!"
                  {...register("ingredients")}
                />
                <BtnSubmit type="submit">
                  <StyledBiListPlus />
                </BtnSubmit>
              </SelectedWrite>
            </SelectedContainer>
          </SCol>
        </SRow>
      </SContainer>{" "}
      <Footer>
        <ButtonNavigate
          onClick={() => {
            Navigate("/", { state: { direction: "left" } });
          }}
        >
          <BsHouseFill style={{ fontSize: "25px", color: "#f2f0ef" }}></BsHouseFill>
        </ButtonNavigate>

        <ButtonNavigate
          onClick={() => {
            Navigate("/selectOption", { state: { direction: "right" } });
          }}
        >
          <BsArrowRight style={{ fontSize: "25px", color: "#f2f0ef" }}></BsArrowRight>
        </ButtonNavigate>
      </Footer>
    </>
  );
}

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
  font-size: 150%;
  margin: 20px 0px 0px 0px;
  color: #352e29;
  font-weight: 600;

  display: flex;
  justify-content: center;
  align-items: start;

  @media (min-width: 768px) {
    font-size: 180%;
    margin: 0px 0px 20px 0px;
  }
`;

const SContainer = styled(Container)`
  width: 100%;
  height: 87%;
  margin: 0px 0px 0px 0px;
  padding: 0px 30px;

  @media (min-width: 768px) {
    padding: 0px 30px;
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
  margin: 0px 0px 3% 0px;
  padding: 0px;
  height: 100%;

  @media (min-width: 768px) {
  }
`;

const SelectContainer = styled.div`
  padding: 20px 0px 0px 0px;
  width: 100%;
  max-height: 92%;

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
  width: 140px;

  margin-bottom: 2%;
  height: 140px;
  background-color: #ffffff;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;
  flex-direction: column;

  border-radius: 25px;
  box-shadow: 0px 10px 5px -5px rgba(153, 153, 153, 0.1);
  transition: all 0.5s ease;

  cursor: pointer;

  &:hover {
    & > :nth-child(1) {
      transform: scale(1.2);
      transition: transform 0.5s ease;
    }
  }

  ${({ clicked }) =>
    clicked &&
    `
  color: #f2f0ef;
  background-color: #352e29;
`}

  @media (min-width: 768px) {
  }
`;

const ItemDiv = styled.div`
  font-size: ${(props) => props.fs};
`;

const SelectedContainer = styled.div`
  /* padding: 20px; */
  padding-bottom: 100px;

  width: 100%;
  height: 95%;

  display: flex;
  flex-direction: column;

  overflow-x: hidden;
  overflow-y: auto;
  gap: 8px;

  @media (min-width: 768px) {
    padding: 20px;
    /* gap: 12px; */
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

  gap: 30px;
  box-shadow: 0px 10px 20px -5px rgba(153, 153, 153, 0.2);
  border-radius: 10px;

  @media (min-width: 768px) {
    padding: 20px 20px;
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

  box-shadow: 0px 10px 20px -5px rgba(29, 18, 10, 0.417);
  border-radius: 10px;
`;

const BtnBackground = styled.div`
  width: 25px;
  height: 25px;
  background-color: #f2f0ef;

  display: none;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  border-radius: 50%;
  border: none;

  cursor: pointer;

  @media (min-width: 768px) {
    display: flex;
  }
`;

const StyledBiX = styled(BiX)`
  color: #352e29;
  font-size: 20px;
  flex-shrink: 0;
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

const Footer = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  gap: 2%;
  position: fixed;
  bottom: 20px;
  margin: 0 auto;
  left: 0;
  right: 0;

  @media (min-width: 768px) {
    bottom: 30px;
  }
`;

const ButtonNavigate = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #352e29;

  cursor: pointer;

  font-size: 25px;
  color: #f2f0ef;
  transition: transform 0.3s ease;

  box-shadow: 0px 10px 20px -5px rgba(29, 18, 10, 0.417);

  &:hover {
    transform: scale(1.2);
  }
`;

export default SelectPage;
