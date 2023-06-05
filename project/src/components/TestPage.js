import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { NavBar, SelectList, SelectedList, OptionList, MakeRequest } from "../Components";
import { useDispatch } from "react-redux";

// SelectList
import { pushSelected, removeSelected } from "../store.js";

// SelectedList
import { BiX, BiListPlus } from "react-icons/bi";
import { useForm } from "react-hook-form";

const TestPage = (props) => {
  const outerRef = useRef();
  const { register, handleSubmit } = useForm();
  let dispatch = useDispatch();

  // Fullpage animation (on Mobile)
  const [startY, setStartY] = useState(0);
  const [endY, setEndY] = useState(0);

  useEffect(() => {
    const touchStartHandler = (e) => {
      setStartY(e.touches[0].clientY);
    };

    const touchEndHandler = (e) => {
      setEndY(e.changedTouches[0].clientY);
      handleSwipe();
    };

    const handleSwipe = () => {
      const { scrollTop } = outerRef.current;
      const SWIPE_THRESHOLD = 10;
      const DIVIDER_HEIGHT = 5;
      const pageHeight = window.innerHeight;

      if (endY - startY > SWIPE_THRESHOLD) {
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          outerRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          outerRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
        } else {
          outerRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
        }
        console.log("아래로 스와이프");
      } else if (startY - endY > SWIPE_THRESHOLD) {
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          outerRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          outerRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
        } else {
          outerRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
        }
        console.log("위로 스와이프");
      }
    };

    const outerRefCurrent = outerRef.current;
    outerRefCurrent.addEventListener("touchstart", touchStartHandler);
    outerRefCurrent.addEventListener("touchend", touchEndHandler);

    return () => {
      outerRefCurrent.removeEventListener("touchstart", touchStartHandler);
      outerRefCurrent.removeEventListener("touchend", touchEndHandler);
    };
  }, [endY, startY]);

  // Fullpage animation (on Web)
  useEffect(() => {
    const wheelHandler = (e) => {
      e.preventDefault();
      const { deltaY } = e;
      const { scrollTop } = outerRef.current;
      const pageHeight = window.innerHeight;
      const DIVIDER_HEIGHT = 5;

      if (deltaY > 0) {
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          outerRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          outerRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
        } else {
          outerRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
        }
      } else {
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          outerRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          outerRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        } else {
          outerRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
        }
      }
    };

    const outerRefCurrent = outerRef.current;
    outerRefCurrent.addEventListener("wheel", wheelHandler);

    return () => {
      outerRefCurrent.removeEventListener("wheel", wheelHandler);
    };
  }, []);

  return (
    <>
      <StyledContainer ref={outerRef}>
        <InnerDiv style={{ alignItems: "end" }}>
          <Rectangle></Rectangle>
        </InnerDiv>
        <Divider></Divider>
        <InnerDiv>
          <StyledRow>
            <Header>1. 식재료를 선택해주세요</Header>
            <StyledCol md={6}>
              <SelectContainer>
                {props.select.map(function (item, i) {
                  return (
                    <>
                      <SelectItem
                        onClick={(e) => {
                          e.preventDefault();
                          const selectedValue = e.currentTarget.innerText;

                          if (props.selected.includes(selectedValue)) {
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
            </StyledCol>
            <StyledCol md={6}>
              <SelectedContainer>
                {props.selected.map(function (item, i) {
                  return (
                    <>
                      <Selected id="selectedList">
                        {item}
                        <BtnBackground
                          onClick={(e) => {
                            const selectedValue = e.currentTarget.closest("#selectedList").innerText;
                            dispatch(removeSelected(selectedValue));
                          }}
                        >
                          <StyledBiX></StyledBiX>
                        </BtnBackground>
                      </Selected>
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
                  <CustomInput
                    type="text"
                    placeholder="추가할 식재료를 직접 작성해주세요"
                    {...register("ingredients")}
                  />
                  <BtnSubmit type="submit">
                    <StyledBiListPlus />
                  </BtnSubmit>
                </SelectedWrite>
              </SelectedContainer>
            </StyledCol>
          </StyledRow>
        </InnerDiv>
        <Divider></Divider>
        <InnerDiv>
          <StyledRow>
            <Header>2. 옵션을 선택해주세요</Header>
            <StyledCol md={12}>12</StyledCol>
          </StyledRow>
        </InnerDiv>
      </StyledContainer>
    </>
  );
};

const StyledContainer = styled.div`
  height: 100vh;
  width: 100%;
  overflow-y: auto;

  padding: 0px;
  margin: 0px;
`;

const StyledRow = styled(Row)`
  /* box-shadow: 0px 10px 20px -5px rgba(153, 153, 153, 0.2); */
  width: 100%;

  @media (min-width: 768px) {
    padding: 20px 5% 0px 5%;
    /* background-color: white; */
  }
`;

const StyledCol = styled(Col)`
  display: block;
  justify-content: start;
  align-items: center;
  border-radius: 25px;
  padding: 0px;

  @media (min-width: 768px) {
    /* background-color: darkcyan; */
  }
`;

const InnerDiv = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: start;
  padding-top: 100px;

  background-color: #f2f0ef;
  /* background-color: #ffffff; */
`;
const Divider = styled.div`
  width: 100%;
  height: 5px;
  background-color: #f2f0ef;
`;
const Rectangle = styled.div`
  width: 90%;
  height: 90%;
  border-radius: 40px 40px 0px 0px;
  background-color: #352e29;
`;

const Header = styled.div`
  font-size: 30px;
  padding: 0px;

  @media (min-width: 768px) {
    /* Medium (md) view size */
    font-size: 35px;
    padding: 0px;
    margin-bottom: 40px;
  }
`;

const SelectContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: start;
  overflow-x: auto;
  gap: 10px;
  /* padding-right: 20px; */
  /* border-radius: 75px; */
  padding: 20px;
  @media (min-width: 768px) {
    flex-wrap: wrap;
  }
`;

const SelectItem = styled.div`
  width: 20%;
  min-width: 120px;
  height: 140px;
  background-color: #ffffff;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;

  border-radius: 10px;
  box-shadow: 0px 10px 20px -5px rgba(153, 153, 153, 0.2);
  cursor: pointer;
`;

const SelectedContainer = styled.div`
  width: 100%;
  margin-top: 40px;
  padding-bottom: 35px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: start;
  gap: 5px;

  border-radius: 45px;
`;

const Selected = styled.div`
  width: 100%;
  padding: 18px 20px;
  background-color: white;
  text-align: start;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  box-shadow: 0px 10px 20px -5px rgba(153, 153, 153, 0.2);
  border-radius: 10px;
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

export default TestPage;
