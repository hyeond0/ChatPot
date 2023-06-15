import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import styled, { createGlobalStyle, css } from "styled-components";
import { Container, Row, Col } from "react-bootstrap";

function IndexPage(props) {
  return (
    <>
      <GlobalStyle></GlobalStyle>
      <SContainer>
        <SRow>gi</SRow>
      </SContainer>
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
  font-size: 180%;
  margin: 20px 0px;
`;

const Context = styled.div`
  font-size: 100%;
  margin: 20px 0px;
`;

const SContainer = styled(Container)`
  width: 100%;
  height: 85%;
  margin: 0px 0px 0px 0px;

  position: fixed;
  bottom: 0px;

  @media (min-width: 768px) {
  }
`;

const SRow = styled(Row)`
  width: 100%;
  height: 100%;
  margin: 0px 0px 0px 0px;
  padding: 0px 0px 0px 0px;

  background-color: #352e29;

  overflow-y: auto;
  overflow-x: hidden;

  display: flex;
  justify-content: center;
  align-items: center;

  color: white;

  border-radius: 40px 40px 0px 0px;

  @media (min-width: 768px) {
  }
`;

const SCol = styled(Col)`
  margin: 0px 0px 7% 0px;
  padding: 0px;
  height: 100%;

  @media (min-width: 768px) {
  }
`;

export default IndexPage;
