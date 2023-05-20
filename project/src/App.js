import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";

import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { NavBar, SelectList, SelectedList, OptionList, MakeRequest } from "./Components";

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

  return (
    <App>
      <NavBar></NavBar>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SelectList select={State.select} selected={State.selected}></SelectList>
              <SelectedList selected={State.selected}></SelectedList>
              <OptionList input={State.inputClick} option={State.option}></OptionList>
              <MakeRequest selected={State.selected}></MakeRequest>
            </>
          }
        />
      </Routes>
    </App>
  );
}

export default App;

// https://react-icons.github.io/react-icons/icons?name=bi
