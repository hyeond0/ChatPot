import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { NavBar, SelectList, SelectedList, OptionList, MakeRequest } from "./Components";
import { RecipePage, OptionPage, SelectPage, TestPage } from "./Components";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// 1. #f2f0ef
// 2. #e5dcd5
// 3. #bcb1a2
// 4. #d3d1d0
// 5. #352e29

function App() {
  let State = useSelector((state) => {
    return state;
  });
  let Navigate = useNavigate();

  const App = styled.div`
    width: 100%;
    height: 100vh;
    padding: 100px 0px;
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
              <button
                style={{ marginTop: "100px" }}
                onClick={() => {
                  Navigate("/selectIngredients");
                }}
              >
                임시 이동 버튼
              </button>
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

        <Route
          path="/test"
          element={
            <>
              <TestPage
                select={State.select}
                selected={State.selected}
                inputValue={State.inputValue}
                selectedOption={State.selectedOption}
                input={State.inputClick}
                option={State.option}
                recieveData={State.recieveData}
              ></TestPage>
            </>
          }
        />
      </Routes>
    </App>
  );
}

export default App;

// https://react-icons.github.io/react-icons/icons?name=bi
