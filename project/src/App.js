import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
// color
// 1. f2f0ef
// 2. e5dcd5
// 3. bcb1a2
// 4. d3d1d0
// 5. 352e29

// 라우터 라이브러리
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Container, Nav } from "react-bootstrap";

import logoBM from "./img/logoBM.png";

import { useDispatch, useSelector } from "react-redux";
import { setSelectFalse, setSelectTrue, setToggle, pushSelected, removeSelected } from "./store.js";

import styled from "styled-components";

import { BiX, BiListPlus } from "react-icons/bi";
// https://react-icons.github.io/react-icons/icons?name=bi

function App() {
  // let Navigate = useNavigate();
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

function SelectList(props) {
  let dispatch = useDispatch();

  return (
    <>
      <container className="selectContainer">
        {props.select.map(function (item, i) {
          return (
            <>
              {/* 20230520 */}
              {/* 아이템 클릭했을 때, Selected List에 해당 아이템 추가 */}
              {/* 이미 들어가있는 상태였다면, 해당 아이템을 찾아 제거 */}
              <div
                className="selectItem"
                onClick={(e) => {
                  const selectedValue = e.currentTarget.innerText;

                  if (props.selected.includes(selectedValue)) {
                    dispatch(removeSelected(selectedValue));
                  } else {
                    dispatch(pushSelected(selectedValue));
                  }
                }}
              >
                {item.type}
              </div>
            </>
          );
        })}
      </container>
    </>
  );
}

function SelectedList(props) {
  let dispatch = useDispatch();

  return (
    <>
      <div className="selectedContainer">
        <div className="cardTitle">Added Ingredients</div>
        {props.selected.map(function (item, i) {
          return (
            <>
              <div className="selectedList" id="selectedList">
                {item}
                <div
                  className="btnBackground"
                  onClick={(e) => {
                    const selectedValue = e.currentTarget.closest(".selectedList").innerText;
                    dispatch(removeSelected(selectedValue));
                  }}
                >
                  <BiX
                    style={{
                      color: "352e29",
                      fontSize: "20px",
                      flexShrink: "0",
                      borderRadius: "50%",
                    }}
                  />
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

function OptionList(props) {
  const CustomInput = styled.input`
    background: none;
    border: none;
    outline: none;
    color: #f2f0ef;
  `;

  return (
    <>
      <div className="optionContainer">
        <div className="cardTitle">Option</div>
        {props.option.map(function (item, i) {
          return (
            <>
              <div className="optionList">{item}</div>
            </>
          );
        })}
        <div className="optionWrite">
          <CustomInput
            onClick={(e) => {
              e.stopPropagation();
            }}
            placeholder="옵션을 직접 작성해주세요"
            onSubmit={(e) => {
              e.preventDefault();
              console.log(e.target.value);
            }}
          ></CustomInput>{" "}
          <BiListPlus
            style={{
              color: "f2f0ef",
              fontSize: "20px",
              flexShrink: "0",
              borderRadius: "50%",
              marginLeft: "20px",
            }}
          />
        </div>
      </div>
    </>
  );
}

function MakeRequest(props) {
  return (
    <>
      <div
        onClick={() => {
          axios.get("/URL", { ...props.selected, message: `${props.selected}을(를) 활용한 레시피 추천해줘` });
        }}
        className="make"
      >
        제작
      </div>
    </>
  );
}

function NavBar() {
  let Navigate = useNavigate();

  return (
    <div className="navBar">
      <p style={{ verticalAlign: "center", minWidth: "30px" }}>Left</p>
      <img
        className="logoImg"
        src={logoBM}
        onClick={() => {
          Navigate("/");
        }}
      ></img>
      <p style={{ verticalAlign: "center", minWidth: "30px" }}>right</p>
    </div>
  );
}
export default App;
