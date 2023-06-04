import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { NavBar, SelectList, SelectedList, OptionList, MakeRequest } from "./Components";
import { RecipePage } from "./Components";
import { TestPage, ScrollTranslate } from "./Components";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

function App() {
  let State = useSelector((state) => {
    return state;
  });

  const App = styled.div`
    width: 100%;
    height: 100vh;
    padding: 0px 0px;
    background-color: #f2f0ef;

    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    text-align: center;

    overflow-x: hidden;
    /* overflow-y: hidden; */
  `;

  const StyledRow = styled(Row)`
    display: flex;
    justify-content: center;
    align-items: start;
    /* background-color: #d3d1d0; */

    padding: 10px;
  `;

  const StyledContainer = styled(Container)`
    width: 100%;
    /* height: 100vh; */
    padding-top: 100px;
    margin: 0px;
  `;

  return (
    <App>
      <NavBar></NavBar>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <StyledContainer>
                <SelectList select={State.select} selected={State.selected}></SelectList>
                <SelectedList selected={State.selected}></SelectedList>
                <OptionList
                  inputValue={State.inputValue}
                  selectedOption={State.selectedOption}
                  input={State.inputClick}
                  option={State.option}
                ></OptionList>
                <MakeRequest
                  recieveData={State.recieveData}
                  selectedOption={State.selectedOption}
                  selected={State.selected}
                ></MakeRequest>
              </StyledContainer>
            </>
          }
        />
        <Route
          path="/recipe"
          element={
            <>
              <RecipePage recieveData={State.recieveData}></RecipePage>
            </>
          }
        />
        <Route
          path="/test"
          element={
            <>
              <TestPage></TestPage>
            </>
          }
        />
      </Routes>
    </App>
  );
}

export default App;

// https://react-icons.github.io/react-icons/icons?name=bi
