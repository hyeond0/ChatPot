import React from "react";
import styled from "styled-components";
import { Routes, Route, useNavigate } from "react-router-dom";
import { NavBar, RecipePage, OptionPage, SelectPage, IndexPage } from "./Components";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// 1. #f2f0ef
// 2. #e5dcd5
// 3. #bcb1a2
// 4. #d3d1d0
// 5. #352e29

function App() {
  let Navigate = useNavigate();

  const App = styled.div`
    width: 100%;
    height: 100vh;
    padding: 100px 0px 40px 0px;
    background-color: #f2f0ef;

    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    text-align: center;

    overflow-x: hidden;
  `;

  return (
    <App>
      <NavBar></NavBar>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <IndexPage></IndexPage>
            </>
          }
        />
        <Route
          path="/selectIngredients"
          element={
            <>
              <SelectPage></SelectPage>
            </>
          }
        />

        <Route
          path="/selectOption"
          element={
            <>
              <OptionPage></OptionPage>
            </>
          }
        />

        <Route
          path="/recipe"
          element={
            <>
              <RecipePage></RecipePage>
            </>
          }
        />
        <Route path="/test" element={<></>} />
      </Routes>
    </App>
  );
}

export default App;

// https://react-icons.github.io/react-icons/icons?name=bi
