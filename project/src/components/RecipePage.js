import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import styled, { createGlobalStyle, css } from "styled-components";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { BiBookmark, BiExport, BiRevision, BiHomeAlt2 } from "react-icons/bi";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import { setReceiveData, initOption, initSelected } from "../store.js";

import Lottie from "react-lottie";
import * as Error from "../lottie/error.json";
import * as Process from "../lottie/loading.json";
import * as Result from "../lottie/result1.json";

function RecipePage(props) {
  let Navigate = useNavigate();
  let dispatch = useDispatch();
  let State = useSelector((state) => {
    return state;
  });

  var now = new Date();
  var hours = now.getHours();
  var meal = "";

  if (6 <= hours && hours < 11) meal = "아침 식사";
  else if (11 <= hours && hours < 14) meal = "점심 식사";
  else if (14 <= hours && hours < 17) meal = "늦은 점심";
  else if (17 <= hours && hours < 21) meal = "저녁 식사";
  else if (21 <= hours && hours < 22) meal = "늦은 저녁";
  else if (22 <= hours || hours < 6) meal = "야식";

  const [isEmptyAlert, setEmptyAlert] = useState(false);
  const [isWrongAlert, setWrongAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);

    const messages = State.receiveData.messages;
    const sendData = { messages };

    axios
      .post("/recipe", sendData)
      .then((res) => {
        const respond = res.data;
        console.log(respond);

        dispatch(setReceiveData(respond));

        setLoading(false);
        Navigate("/recipe");
      })
      .catch((error) => {
        setLoading(false);
        setEmptyAlert(true);
      });
  };

  useEffect(() => {
    const response = State.receiveData;
    // 받아온 모든 데이터가 비어있을 경우 (페이지 새로고침 등)
    // 결과가 존재하지 않습니다.
    if (
      response.dishName.length === 0 &&
      response.elements.length === 0 &&
      response.recipeSteps.length === 0 &&
      response.introduction.length === 0 &&
      response.messages.length === 0
    ) {
      setEmptyAlert(true);
    } else if (
      response.dishName.length === 0 &&
      response.elements.length === 0 &&
      response.recipeSteps.length === 0 &&
      response.introduction.length === 0 &&
      !response.messages.length === 0
    ) {
      setWrongAlert(true);
    } else {
      setWrongAlert(false);
      setEmptyAlert(false);
    }
  }, [State.recieveData]);

  const LoadingAnimation = {
    loop: true,
    autoplay: true,
    animationData: Process,
    rendererSettings: {},
  };

  const resultLottie = {
    loop: true,
    autoplay: true,
    animationData: Result,
    rendererSettings: {},
  };

  const errorLottie = {
    loop: false,
    autoplay: true,
    animationData: Error,
    rendererSettings: {},
  };

  return (
    <>
      <GlobalStyle></GlobalStyle>
      {loading ? (
        <>
          <Loading>
            <div>
              <Lottie
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
        <></>
      )}

      {isEmptyAlert ? (
        <>
          <AlertBg>
            <AlertContainer>
              <AlertDiv>
                <Lottie
                  style={{ width: "70%" }}
                  options={errorLottie}
                  height={300}
                  isPaused={false}
                  isStopped={false}
                  isClickToPauseDisabled={true}
                />
              </AlertDiv>
              <AlertDiv>
                <h2>결과가 존재하지 않습니다.</h2>
              </AlertDiv>
              <h5
                onClick={() => {
                  Navigate("/selectIngredients");
                }}
                style={{ textDecoration: "underline", cursor: "pointer" }}
              >
                홈 화면으로
              </h5>
            </AlertContainer>
          </AlertBg>
        </>
      ) : (
        <></>
      )}

      {isWrongAlert ? (
        <>
          <AlertBg>
            <AlertContainer>
              <AlertDiv>
                <Lottie
                  style={{ width: "70%" }}
                  options={errorLottie}
                  height={300}
                  isPaused={false}
                  isStopped={false}
                  isClickToPauseDisabled={true}
                />
              </AlertDiv>
              <AlertDiv style={{ height: "100px", overflowY: "auto" }}>
                <h4>{State.receiveData.messages[State.receiveData.messages.length - 1].context}</h4>
              </AlertDiv>
              <h5
                onClick={() => {
                  Navigate("/selectIngredients");
                }}
                style={{ textDecoration: "underline", cursor: "pointer" }}
              >
                홈 화면으로
              </h5>
            </AlertContainer>
          </AlertBg>
        </>
      ) : (
        <></>
      )}

      <StyledContainer>
        <StyledRow backgroundColor="#ffffff" height="">
          <StyledCol md={6} justifyContent="center" alignItems="center">
            <Lottie
              style={{ zIndex: "0", width: "100%" }}
              options={resultLottie}
              isPaused={false}
              isStopped={false}
              isClickToPauseDisabled={true}
            />
          </StyledCol>
          <StyledCol md={6} justifyContent="center" alignItems="center">
            <JustRow>
              <Header>오늘 {meal},</Header>
              <Header>
                <b>{State.receiveData.dishName} </b>
                어떠세요?
              </Header>
            </JustRow>
            <JustRow>
              <SubHeader style={{ marginTop: "30px", padding: "0px 15%", fontSize: "17px" }}>
                {State.receiveData.introduction}
              </SubHeader>
            </JustRow>
          </StyledCol>
        </StyledRow>

        {/* 식재료, 레시피 안내 */}
        <StyledRow backgroundColor="#" height="" style={{ minHeight: "200px" }}>
          <StyledCol md={5} justifyContent="start" alignItems="start">
            <CardHeader>
              <b>식재료</b>
            </CardHeader>
            <Divider />
            {State.receiveData.elements !== undefined &&
              State.receiveData.elements.map(function (item, i) {
                return <div key={i}>{item}</div>;
              })}
          </StyledCol>
          <StyledCol md={7} justifyContent="start" alignItems="start" style={{ textAlign: "start" }}>
            <CardHeader>
              <b>레시피</b>
            </CardHeader>
            <Divider />

            {State.receiveData.recipeSteps !== undefined &&
              State.receiveData.recipeSteps.map(function (item, i) {
                return <div key={i}>{item}</div>;
              })}
          </StyledCol>
        </StyledRow>

        {/* 버튼 및 챗봇 */}
        <FooterRow>
          <FooterCol md={4}>
            <Button>
              <StyledBiBookmark></StyledBiBookmark> 레시피 저장
            </Button>
          </FooterCol>
          <FooterCol md={4}>
            <Button
              onClick={() => {
                handleClick();
              }}
            >
              <StyledBiRevision></StyledBiRevision> 재추천
            </Button>
          </FooterCol>
          <FooterCol md={4}>
            <Button
              onClick={() => {
                dispatch(initOption());
                dispatch(initSelected());
                Navigate("/");
              }}
            >
              <BiHomeAlt2></BiHomeAlt2>
              홈으로
            </Button>
          </FooterCol>
        </FooterRow>
      </StyledContainer>
      {/* chatpot.co.kr */}
    </>
  );
}

const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: 'NanumSquareNeo-Variable';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/NanumSquareNeo-Variable.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}

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

const StyledContainer = styled(Container)`
  width: 100%;

  padding: 0px 25px;
  /* padding-top: 100px; */

  @media (min-width: 768px) {
    padding: 0px;
    /* padding-top: 100px; */
  }
`;

const StyledRow = styled(Row)`
  padding: 0px;

  background-color: ${(props) => props.backgroundColor};
  height: ${(props) => props.height};
  min-height: 300px;

  margin: 20px 0px 0px 0px;
  border-radius: 25px;
  overflow: auto;
  box-shadow: 0px 10px 20px -5px rgba(153, 153, 153, 0.2);

  @media (min-width: 768px) {
    margin: 15px 0px 0px 0px;

    padding: 20px;
    padding-left: 25px;
    padding-right: 25px;
  }
`;

const StyledCol = styled(Col)`
  background-color: ${(props) => props.backgroundColor};
  height: ${(props) => props.height};

  display: flex;
  justify-content: start;
  align-items: start;
  flex-direction: column;

  padding: 0px 20px 10% 20px;
  overflow-y: auto;

  @media (min-width: 768px) {
    /* Medium (md) view size */
    justify-content: ${(props) => props.justifyContent};
    align-items: ${(props) => props.alignItems};
    padding: 0px 10px;
  }
`;

const JustRow = styled(Row)`
  padding: 0px;
  margin: 0px;
  overflow: hidden;
  width: 100%;
`;

const JustCol = styled(Col)``;

const FooterRow = styled(Row)`
  padding: 0px;
  min-height: 50px;
  margin: 20px 0px 0px 0px;

  @media (min-width: 768px) {
    margin: 10px 0px 0px 0px;
  }
`;

const FooterCol = styled(Col)`
  padding: 2% 0px;

  display: flex;
  justify-content: center;
  align-items: start;

  @media (min-width: 768px) {
    flex-wrap: wrap;
    gap: 12px;

    padding: 2% 12px;
  }
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  margin: 0px;
  padding: 20px 20px;
  border-radius: 30px;

  font-size: large;

  gap: 12px;
  cursor: pointer;

  background-color: white;
  box-shadow: 0px 10px 20px -5px rgba(153, 153, 153, 0.2);
  transition: all 0.3s ease;

  @media (min-width: 768px) {
    /* Medium (md) view size */
    &:hover {
      transform: scale(1.1);
      background-color: #352e29;
      color: white;
    }
  }
`;

const Header = styled.div`
  font-size: 25px;
  @media (min-width: 768px) {
    /* Medium (md) view size */
    font-size: 30px;
  }
`;

const CardHeader = styled.div`
  width: 100%;
  font-size: 28px;
  margin-top: 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 768px) {
    /* Medium (md) view size */
    font-size: 28px;
    margin-top: 0px;
  }
`;

const SubHeader = styled.div`
  font-size: 20px;
  color: #b2b2b2;

  @media (min-width: 768px) {
    /* Medium (md) view size */
    margin-top: 0px;
    font-size: 20px;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 2px;
  background-color: #d1d1d1;

  margin: 12px 0px;
  border-radius: 10px;

  @media (min-width: 768px) {
    /* width: 100%; */
  }
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

  z-index: 10;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  transition: all 1s;
`;

const AlertContainer = styled.div`
  width: 85%;
  max-width: 500px;
  padding: 0px 20px 40px 20px;
  gap: 5px;

  background-color: white;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  border-radius: 20px;
  box-shadow: 0px 10px 20px -5px rgba(153, 153, 153, 0.5);

  @media (min-width: 768px) {
    padding: 20px 20px 50px 20px;
    gap: 20px;
  }
`;

const AlertDiv = styled.div`
  width: 100%;
  /* height: 100px; */
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

  z-index: 10;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  transition: all 1s;
`;

const StyledBiBookmark = styled(BiBookmark)``;
const StyledBiExport = styled(BiExport)``;
const StyledBiRevision = styled(BiRevision)``;

export default RecipePage;
