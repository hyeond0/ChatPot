import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { NavBar, SelectList, SelectedList, OptionList, MakeRequest } from "./Components";

function App() {
  let State = useSelector((state) => {
    return state;
  });

  return (
    <div className="App">
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
    </div>
  );
}

export default App;

// https://react-icons.github.io/react-icons/icons?name=bi
