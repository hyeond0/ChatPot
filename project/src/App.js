import React from "react";
import styled from "styled-components";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { NavBar, RecipePage, OptionPage, SelectPage, IndexPage } from "./Components";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { TransitionGroup, CSSTransition } from "react-transition-group";

// 1. #f2f0ef
// 2. #e5dcd5
// 3. #bcb1a2
// 4. #d3d1d0
// 5. #352e29

function App() {
  const Navigate = useNavigate();
  const location = useLocation();

  const App = styled.div`
    width: 100%;
    height: 100vh;
    padding: 70px 0px 40px 0px;
    background-color: #f2f0ef;

    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    text-align: center;

    overflow-x: hidden;
    overflow-y: none;

    @font-face {
      font-family: "NanumSquareNeo-Variable";
      src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/NanumSquareNeo-Variable.woff2")
        format("woff2");
      font-weight: normal;
      font-style: normal;
    }

    @font-face {
      font-family: "Pretendard-Regular";
      src: url("https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff") format("woff");
      font-weight: 400;
      font-style: normal;
    }

    @media (min-width: 768px) {
      padding: 100px 0px 40px 0px;
    }
  `;

  return (
    <>
      <NavBar></NavBar>
      <TransitionGroup className="transitions-wrapper">
        <CSSTransition
          key={location.pathname}
          classNames={location.state?.direction === "left" ? "left" : "right"}
          timeout={300}
        >
          <App style={{ fontFamily: "NanumSquareNeo-Variable" }}>
            <Routes location={location}>
              <Route
                path="/"
                element={
                  <>
                    <IndexPage style={{ position: "absolute" }}></IndexPage>
                  </>
                }
              />
              <Route
                path="/selectIngredients"
                element={
                  <>
                    <SelectPage style={{ position: "absolute" }}></SelectPage>
                  </>
                }
              />

              <Route
                path="/selectOption"
                element={
                  <>
                    <OptionPage style={{ position: "absolute" }}></OptionPage>
                  </>
                }
              />

              <Route
                path="/recipe"
                element={
                  <>
                    <RecipePage style={{ position: "absolute" }}></RecipePage>
                  </>
                }
              />
            </Routes>
          </App>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
}

export default App;

// https://react-icons.github.io/react-icons/icons?name=bi
