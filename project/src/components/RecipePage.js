import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { BiBookmark, BiExport, BiRevision, BiHomeAlt2 } from "react-icons/bi";
import { BsFillXCircleFill } from "react-icons/bs";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import { setReceiveData } from "../store.js";

import Lottie from "react-lottie";
import * as loading from "../lottie/result1.json";

function RecipePage(props) {
  let Navigate = useNavigate();
  let dispatch = useDispatch();
  let State = useSelector((state) => {
    return state;
  });

  const [isEmptyAlert, setEmptyAlert] = useState(false);
  const [isWrongAlert, setWrongAlert] = useState(false);

  const handleClick = () => {
    const messages = State.receiveData.messages;
    const sendData = { messages };

    if (State.selectedOption.length === 0) {
      const option = ["아무"];
    }

    axios
      .post("/recipe", sendData)
      .then((res) => {
        const respond = res.data;
        console.log(respond);

        dispatch(setReceiveData(respond));

        Navigate("/recipe");
      })
      .catch((error) => {
        // setEmptyAlert(true);
      });
  };

  // useEffect(() => {
  //   const response = State.recieveData;
  //   // 받아온 모든 데이터가 비어있을 경우 (페이지 새로고침 등)
  //   // 결과가 존재하지 않습니다.

  //   // 규칙에 위배된 답변으로 파싱이 이루어지지 않을 경우
  //   // response.message 전문 출력
  //   if (
  //     response.dishName.length === 0 &&
  //     response.elements.length === 0 &&
  //     response.recipeSteps.length === 0 &&
  //     response.introduction.legnth === 0 &&
  //     response.messages.length === 0
  //   ) {
  //     setEmptyAlert(true);
  //   } else if (
  //     response.dishName.length === 0 &&
  //     response.elements.length === 0 &&
  //     response.recipeSteps.length === 0 &&
  //     response.introduction.legnth === 0 &&
  //     !response.messages.length === 0
  //   ) {
  //     setWrongAlert(true);
  //   } else {
  //     setEmptyAlert(false);
  //     setWrongAlert(false);
  //   }

  //   // State 하나로  Boolean 값 대신 에러코드 통해서 관리해도 될 듯
  //   console.log(isEmptyAlert);

  //   console.log(response.dishName.length);
  //   console.log(response.elements.length);
  //   console.log(response.recipeSteps.length);
  //   console.log(response.introduction.length);
  //   // console.log(response.messages.length);
  // }, [State.recieveData]);

  const resultLottie = {
    loop: true,
    autoplay: true,
    animationData: loading,
    rendererSettings: {},
  };

  return (
    <>
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
              <Header>오늘 식사메뉴,</Header>
              <Header>
                <b>{State.recieveData.dishName} </b>
                어떠세요?
              </Header>
            </JustRow>
            <JustRow>
              <SubHeader style={{ marginTop: "30px", padding: "0px 18%", fontSize: "17px" }}>
                {State.recieveData.introduction}
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
            {State.recieveData.elements !== undefined &&
              State.recieveData.elements.map(function (item, i) {
                return <div key={i}>{item}</div>;
              })}
          </StyledCol>
          <StyledCol md={7} justifyContent="start" alignItems="start" style={{ textAlign: "start" }}>
            <CardHeader>
              <b>레시피</b>
            </CardHeader>
            <Divider />

            {State.recieveData.recipeSteps !== undefined &&
              State.recieveData.recipeSteps.map(function (item, i) {
                return <div key={i}>{item}</div>;
              })}
          </StyledCol>
        </StyledRow>

        {isEmptyAlert ? (
          <>
            <AlertBg>
              <AlertContainer>
                <AlertDiv>
                  {/* <Lottie
                    style={{ width: "70%" }}
                    options={EmptyAnimation}
                    height={300}
                    isPaused={false}
                    isStopped={false}
                    isClickToPauseDisabled={true}
                  /> */}
                </AlertDiv>
                <AlertDiv>
                  <h3>결과가 존재하지 않습니다.</h3>
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

        {/* 버튼 및 챗봇 */}
        <FooterRow>
          <FooterCol md={4}>
            <Button>
              <StyledBiBookmark></StyledBiBookmark> 레시피 저장
            </Button>
          </FooterCol>
          <FooterCol md={4}>
            <Button onClick={handleClick()}>
              <StyledBiRevision></StyledBiRevision> 재추천
            </Button>
          </FooterCol>
          <FooterCol md={4}>
            <Button>
              <BiHomeAlt2></BiHomeAlt2> 홈으로
            </Button>
          </FooterCol>
        </FooterRow>
      </StyledContainer>
      {/* chatpot.co.kr */}
    </>
  );
}

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
    gap: 10px;

    padding: 2% 10px;
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
  font-size: 30px;
  @media (min-width: 768px) {
    /* Medium (md) view size */
    font-size: 35px;
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

const StyledBiBookmark = styled(BiBookmark)``;
const StyledBiExport = styled(BiExport)``;
const StyledBiRevision = styled(BiRevision)``;

export default RecipePage;
