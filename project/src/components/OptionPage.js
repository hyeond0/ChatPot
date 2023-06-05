import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";

function OptionPage(props) {
  let dispatch = useDispatch();
  let State = useSelector((state) => {
    return state;
  });

  return (
    <>
      <StyledContainer></StyledContainer>
    </>
  );
}

const StyledContainer = styled(Container)`
  width: 100%;
  height: 100%;
  margin: 100px 0px 0px 0px;
  padding: 0px 0px 0px 0px;

  border-radius: 20px;
  background-color: #ffffff;
  @media (min-width: 768px) {
  }
`;

const StyledRow = styled(Row)`
  width: 100%;
  height: 100%;
  margin: 100px 0px 0px 0px;
  padding: 0px 0px 0px 0px;

  border-radius: 20px;
  background-color: #fffff1;

  @media (min-width: 768px) {
  }
`;

const StyledCol = styled(Col)`
  width: 100%;
  height: 100%;
  margin: 100px 0px 0px 0px;
  padding: 0px 0px 0px 0px;

  border-radius: 20px;
  background-color: #fffff2;
  @media (min-width: 768px) {
  }
`;

export default OptionPage;
