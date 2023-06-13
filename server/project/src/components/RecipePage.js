import React from "react";
import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { BiBookmark, BiExport, BiRevision } from "react-icons/bi";

import Lottie from "react-lottie";
import * as loading from "../lottie/result1.json";

function RecipePage(props) {
  let dispatch = useDispatch();
  let State = useSelector((state) => {
    return state;
  });

  const resultLottie = {
    loop: true,
    autoplay: true,
    animationData: loading,
    rendererSettings: {},
  };

  return (
    <>
      <StyledContainer>
        {/* 메뉴소개 */}
        <StyledRow backgroundColor="#ffffff" height="">
          <StyledCol md={6} justifyContent="center" alignItems="center">
            <Lottie
              style={{ zIndex: "0", width: "100%" }}
              options={resultLottie}
              // height={100}
              // width={200}
              isPaused={false}
              isStopped={false}
              isClickToPauseDisabled={true}
            />
          </StyledCol>
          <StyledCol md={6} justifyContent="center" alignItems="center">
            <JustRow>
              <Header>오늘 식사메뉴,</Header>
              <Header>
                {/* 오늘 식사메뉴, <b>{props.recieveData.name}</b>어떠세요? */}
                <b>{State.recieveData.dishName} </b>
                {/* <br /> */}
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
            <SubHeader>Ingredients</SubHeader>
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
            <SubHeader>Recipe</SubHeader>
            <Divider />
            {State.recieveData.recipeSteps !== undefined &&
              State.recieveData.recipeSteps.map(function (item, i) {
                return <div key={i}>{item}</div>;
              })}
          </StyledCol>
        </StyledRow>

        {/* 버튼 및 챗봇 */}
        <FooterRow>
          <FooterCol md={5}>
            <Button>
              <StyledBiBookmark></StyledBiBookmark> 레시피 저장
            </Button>
            <Button>
              <StyledBiExport></StyledBiExport> 레시피 공유
            </Button>
            <Button>
              <StyledBiRevision></StyledBiRevision> 다른 레시피
            </Button>
          </FooterCol>
          <FooterCol md={7}>챗봇</FooterCol>
        </FooterRow>
      </StyledContainer>
    </>
  );
}

const StyledContainer = styled(Container)`
  width: 100%;

  padding: 25px;
  padding-top: 100px;

  @media (min-width: 768px) {
    padding: 0px;
    padding-top: 100px;
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
  }
`;

const FooterCol = styled(Col)`
  padding: 0px;

  display: flex;
  justify-content: center;
  align-items: start;

  @media (min-width: 768px) {
    /* Medium (md) view size */
    flex-wrap: wrap;
    gap: 10px;
  }
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 30px;
  margin: 0px;
  padding: 0px;

  background-color: aliceblue;

  @media (min-width: 768px) {
    /* Medium (md) view size */
    margin-right: 20px;
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
  font-size: 28px;
  margin-top: 20px;

  @media (min-width: 768px) {
    /* Medium (md) view size */
    font-size: 28px;
    margin-top: 0px;
  }
`;

const SubHeader = styled.div`
  font-size: 20px;
  @media (min-width: 768px) {
    /* Medium (md) view size */
    margin-top: 0px;
    font-size: 20px;
  }
`;

const Divider = styled.div`
  width: 20%;
  height: 2px;
  background-color: #d1d1d1;

  margin: 12px 0px;
  border-radius: 10px;

  @media (min-width: 768px) {
    width: 100%;
  }
`;

const StyledBiBookmark = styled(BiBookmark)``;
const StyledBiExport = styled(BiExport)``;
const StyledBiRevision = styled(BiRevision)``;

export default RecipePage;
