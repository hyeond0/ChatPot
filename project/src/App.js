import React from "react";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { NavBar, SelectList, SelectedList, OptionList, MakeRequest } from "./Components";
import { RecipeContext, RecipeButton, RecipeChat } from "./Components";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

function App() {
  let State = useSelector((state) => {
    return state;
  });

  const App = styled.div`
    width: 100%;
    height: 200vh;
    padding: 0px 20px;
    background-color: #f2f0ef;

    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    text-align: center;

    overflow-x: hidden;
  `;

  const StyledRow = styled(Row)`
    display: flex;
    justify-content: center;
    align-items: start;
    /* background-color: #d3d1d0; */

    padding: 10px;
  `;

  return (
    <App>
      <NavBar></NavBar>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Container>
                <SelectList select={State.select} selected={State.selected}></SelectList>
                <SelectedList selected={State.selected}></SelectedList>
                <OptionList
                  inputValue={State.inputValue}
                  selectedOption={State.selectedOption}
                  input={State.inputClick}
                  option={State.option}
                ></OptionList>
                <MakeRequest selectedOption={State.selectedOption} selected={State.selected}></MakeRequest>
              </Container>
            </>
          }
        />
        <Route
          path="/recipe"
          element={
            <>
              <Container>
                <StyledRow>
                  <Col md={8}>
                    <StyledRow>
                      <RecipeContext></RecipeContext>
                    </StyledRow>
                  </Col>
                  <Col md={4}>
                    <StyledRow>
                      <RecipeButton></RecipeButton>
                    </StyledRow>
                    <StyledRow>
                      more chat
                      <RecipeChat></RecipeChat>
                    </StyledRow>
                  </Col>
                </StyledRow>
              </Container>
            </>
          }
        />
      </Routes>
    </App>
  );
}

export default App;

// https://react-icons.github.io/react-icons/icons?name=bi
