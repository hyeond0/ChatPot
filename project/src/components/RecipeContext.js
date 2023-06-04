import styled from "styled-components";
import useState from "react";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import logo from "../img/chatpotLogo.png";

import Lottie from "react-lottie";
import * as loading from "../lottie/result1.json";

const StyledRow = styled(Row)`
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: #d3d1d0; */

  padding: 10px;
  width: 100%;
`;

const StyledContainer = styled(Container)`
  width: 100%;
  height: 100vh;
  padding: 0px;
  padding-top: 100px;
  margin: 0px;
`;

const StyledCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const RecipeContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 0px;
`;

const Thumbnail = styled.image`
  width: 160px;
  height: 160px;
  background-color: white;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 100px;
`;

const Title = styled.h3`
  margin-top: 20px;

  @media (min-width: 768px) {
    /* Medium (md) view size */
    margin-top: 0px;
  }
`;

function RecipeContext(props) {
  const testLottie = {
    loop: true,
    autoplay: true,
    animationData: loading,
    rendererSettings: {
      preserveAspectRatio: `xMidyMid slice`,
    },
  };

  return (
    <>
      <RecipeContainer>
        <StyledRow>
          <StyledCol md={3}>
            <Thumbnail>
              <Lottie
                options={testLottie}
                height={400}
                width={400}
                isPaused={false}
                isStopped={false}
                isClickToPauseDisabled={true}
              />
            </Thumbnail>
          </StyledCol>
          <StyledCol md={9}>
            <Title>
              오늘 식사메뉴, <b>{props.recieveData.name}</b>어떠세요?
            </Title>
          </StyledCol>
        </StyledRow>
        <StyledRow>
          {console.log(props.recieveData)}
          {props.recieveData.element !== undefined &&
            props.recieveData.element.map(function (item, i) {
              return <div key={i}>{item}</div>;
            })}
        </StyledRow>
        <StyledRow>
          {props.recieveData.instructions !== undefined &&
            props.recieveData.instructions.map(function (item, i) {
              return <div key={i}>{item}</div>;
            })}
        </StyledRow>
      </RecipeContainer>
    </>
  );
}

export default RecipeContext;
