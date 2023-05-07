import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// color
// 1. f2f0ef
// 2. e5dcd5
// 3. bcb1a2
// 4. 443a37
// 5. 352e29

// 라우터 라이브러리
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Container, Nav } from "react-bootstrap";

import logoBM from "./img/logoBM.png";

import { useDispatch, useSelector } from "react-redux";
import { setSelectFalse, setSelectTrue } from "./store.js";

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
              <SelectList select={State.select}></SelectList>
              <SelectedList selected={State.selected}></SelectedList>
              <div className="make">제작</div>
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
              {/* 아래 DIV 클릭하여 활성화 시 item의 type을 Selected State로 Push */}
              {/* 한 번 더 클릭해서 활성화가 풀렸다면 Selected List에서 해당 type 찾아 삭제 */}

              {/* 일단 먼저 아이템 클릭 시 CSS 변경, State choiced -> true */}
              <div
                onClick={() => {
                  // dispatch(setSelectTrue(i));
                  // item.choiced === false ? dispatch(setSelectTrue(i)) : dispatch(setSelectFalse(i));
                  item.choiced === true ? dispatch(setSelectFalse(i)) : dispatch(setSelectTrue(i));
                  // if (item.choiced === false) {
                  //   dispatch(setSelectTrue(i));
                  //   console.log(item.choiced);
                  // } else {
                  //   dispatch(setSelectFalse(i));
                  //   console.log(item.choiced);
                  // }
                  console.log(item.choiced);
                }}
                className="selectItem"
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
  // SelecList 컴포넌트의 아이템이 선택되어 활성화된 상태라면,
  // 해당 컴포넌트 리스트에 들어가며 순서대로 출력됨

  // 리스트 길이가 0일 때는 아무것도 안보이게 하는 것도 좋겠다
  return (
    <>
      <div className="selectedContainer">
        {props.selected.map(function (item, i) {
          return (
            <>
              <div>{item}</div>
            </>
          );
        })}
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
