import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { pushOption, removeOption, AddOption, setReceiveData, initOption, initSelected } from "../store.js";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import styled, { createGlobalStyle, css } from "styled-components";
import { Container, Row, Col } from "react-bootstrap";

import { BiListPlus } from "react-icons/bi";
import { BsArrowLeft, BsArrowRepeat, BsFillXCircleFill } from "react-icons/bs";

import Lottie from "react-lottie";
import loadingAnimation from "../lottie/loading.json";
import emptyAnimatiion from "../lottie/empty.json";

function OptionPage(props) {
  const { register, handleSubmit, reset } = useForm();
  let Navigate = useNavigate();
  let dispatch = useDispatch();
  let State = useSelector((state) => {
    return state;
  });

  const [isEmpty, setEmpty] = useState(true);
  const [emptyAlert, setEmptyAlert] = useState(false);

  useEffect(() => {
    State.selected.length === 0 ? setEmpty(true) : setEmpty(false);
  }, [State.selected]);

  // Post & Loading
  const [loading, setLoading] = useState(false);
  const LoadingAnimation = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {},
  };

  const EmptyAnimation = {
    loop: true,
    autoplay: true,
    animationData: emptyAnimatiion,
    rendererSettings: {},
  };

  // 버튼 클릭 시 Loading -> Post -> Get -> Navigate 처리
  // 해당 과정은 이전 단계가 성공해야 연쇄적으로 처리가 가능함
  const handleClick = () => {
    setLoading(true);

    const ingredients = State.selected;
    const option = State.selectedOption;
    const sendData = { ingredients, option };

    if (State.selectedOption.length === 0) {
      const option = ["아무"];
    }

    axios
      .post("/selectOption", sendData)
      .then((res) => {
        const respond = res.data;

        dispatch(setReceiveData(respond));

        setLoading(false);
        Navigate("/recipe", { state: { direction: "right" } });
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // 컴포넌트가 언마운트될 때 리사이즈 이벤트 리스너를 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function handleOptionClick(e) {
    const selectedValue = e.currentTarget.innerText;
    if (State.selectedOption.includes(selectedValue)) {
      dispatch(removeOption(selectedValue));
    } else {
      dispatch(pushOption(selectedValue));
    }
  }

  return (
    <>
      <GlobalStyle></GlobalStyle>

      <SContainer>
        <Title>2. 옵션을 선택하세요</Title>
        <Context>선택을 원하지 않는다면, {viewportWidth < 768 && <br />}바로 제작 버튼을 눌러도 좋아요</Context>
        <SRow style={{ maxHeight: "70%", paddingBottom: "10px" }}>
          {State.option.map(function (item, i) {
            return (
              <>
                <OptionList clicked={State.selectedOption.includes(item)} onClick={handleOptionClick}>
                  {item}
                </OptionList>
              </>
            );
          })}
        </SRow>
        <SRow>
          <OptionWrite
            onSubmit={handleSubmit((data) => {
              if (data.option.length) {
                dispatch(AddOption(data.option));
                reset();
              }
            })}
          >
            <CustomInput type="text" placeholder="옵션 직접 추가" {...register("option")} />
            <BtnSubmit type="submit">
              <StyledBiListPlus />
            </BtnSubmit>
          </OptionWrite>
        </SRow>
      </SContainer>

      <Footer>
        <ButtonNavigate
          onClick={() => {
            Navigate("/selectIngredients", { state: { direction: "left" } });
          }}
        >
          <BsArrowLeft style={{ fontSize: "25px", color: "#f2f0ef" }}></BsArrowLeft>
        </ButtonNavigate>

        {loading ? (
          <>
            <Loading>
              <div>
                <Lottie
                  style={{ cursor: "default" }}
                  options={LoadingAnimation}
                  height={400}
                  width={400}
                  isPaused={false}
                  isStopped={false}
                  isClickToPauseDisabled={true}
                />
              </div>
              <div style={{ fontSize: "145%" }}>
                <b>챗팟</b>이 맛있는 레시피를<br></br> 추천해드릴게요!
              </div>
            </Loading>
          </>
        ) : (
          <MakeBtn
            onClick={() => {
              if (isEmpty) {
                setEmptyAlert(true);
              } else {
                handleClick();
              }
            }}
          >
            제작
          </MakeBtn>
        )}

        {emptyAlert ? (
          <>
            <AlertBg>
              <AlertContainer>
                <AlertDiv>
                  <Lottie
                    style={{ width: "70%" }}
                    options={EmptyAnimation}
                    height={300}
                    isPaused={false}
                    isStopped={false}
                    isClickToPauseDisabled={true}
                  />
                </AlertDiv>
                <AlertDiv>
                  <h3>식재료를 선택해주세요!</h3>
                </AlertDiv>
                <AlertDiv>
                  <BsFillXCircleFill
                    onClick={() => setEmptyAlert(false)}
                    style={{ fontSize: "30px", color: "lightgray", cursor: "pointer" }}
                  />
                </AlertDiv>
              </AlertContainer>
            </AlertBg>
          </>
        ) : (
          <></>
        )}

        <ButtonNavigate
          onClick={() => {
            dispatch(initOption());
            dispatch(initSelected());
          }}
        >
          <BsArrowRepeat style={{ fontSize: "25px", color: "#f2f0ef" }}></BsArrowRepeat>
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
  margin: 20px 0px;

  display: flex;
  justify-content: center;
  align-items: start;

  @media (min-width: 768px) {
    font-size: 180%;
  }
`;

const Context = styled.div`
  font-size: 90%;
  margin: 20px 0px;
`;

const SContainer = styled(Container)`
  width: 100%;
  height: 80%;
  margin: 0px 0px 0px 0px;
  padding: 0px 30px;

  overflow-y: none;

  @media (min-width: 768px) {
    padding: 0px 30px;
  }
`;

const SRow = styled(Row)`
  width: 100%;
  margin: 0px 0px 0px 0px;
  padding: 0px 0px 0px 0px;

  overflow-y: auto;
  overflow-x: hidden;

  display: flex;
  justify-content: space-between;
  align-items: start;

  @media (min-width: 768px) {
    gap: 5px;
  }
`;

const SCol = styled(Col)`
  margin: 0px 0px 7% 0px;
  padding: 0px;
  height: 100%;

  @media (min-width: 768px) {
  }
`;

const OptionList = styled.div`
  min-width: 100px;
  width: 100%;
  height: 30px;
  padding: 30px 20px;
  margin: 4px 0px;
  text-align: start;
  background-color: white;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 10px;

  overflow-y: hidden;
  overflow-x: auto;
  box-shadow: 0px 10px 20px -5px rgba(153, 153, 153, 0.2);

  transition: transform 0.3s ease;
  cursor: pointer;

  @media (min-width: 768px) {
    width: 49%;

    &:hover {
      color: #f2f0ef;
      background-color: #352e29;

      /* transition: background-color 1.5s; */
    }
  }

  ${({ clicked }) =>
    clicked &&
    `
  color: #f2f0ef;
  background-color: #352e29;

  // box-shadow: none;
`}
`;

const OptionWrite = styled.form`
  width: 80%;
  height: 30px;
  padding: 30px 30px;
  text-align: start;
  background-color: #352e29;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-radius: 100px;

  position: fixed;
  bottom: 100px;
  margin: 0 auto;
  left: 0;
  right: 0;

  @media (min-width: 768px) {
    width: 60%;
    bottom: 120px;
  }
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
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

const MakeBtn = styled.div`
  width: 40%;
  height: 60px;
  color: #f2f0ef;
  background-color: #352e29;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 200px;
  box-shadow: 0px 10px 20px -5px rgba(153, 153, 153, 0.5);

  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  /* ${({ isEmpty }) =>
    !isEmpty &&
    `
  cursor:default;
  opacity:0.4;

  &:hover {
    transform: none;
  }
`} */
`;

const Loading = styled.div`
  width: 100%;
  height: 100%;

  background-color: #f2f0ef;
  position: fixed;
  bottom: 0%;
  margin: 0 auto;
  left: 0;
  right: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  transition: all 1s;
`;

const AlertBg = styled.div`
  width: 100%;
  height: 100%;

  background-color: #0000002e;
  position: fixed;
  bottom: 0%;
  margin: 0 auto;
  left: 0;
  right: 0;

  /* z-index: -1; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  transition: all 1s;
`;

const AlertContainer = styled.div`
  width: 85%;
  max-width: 500px;
  padding: 0px 20px 30px 20px;
  gap: 12px;

  background-color: white;

  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;

  border-radius: 20px;
  box-shadow: 0px 10px 20px -5px rgba(153, 153, 153, 0.5);

  @media (min-width: 768px) {
  }
`;

const AlertDiv = styled.div`
  width: 100%;
`;

export default OptionPage;
