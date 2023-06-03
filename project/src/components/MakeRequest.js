import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { setSendData, setRecieveData } from "../store.js";
import { useDispatch } from "react-redux";

function MakeRequest(props) {
  let Navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  // 버튼 클릭 시 Loading -> Post -> Get -> Navigate 처리
  // 해당 과정은 이전 단계가 성공해야 연쇄적으로 처리가 가능함
  const handleClick = () => {
    setLoading(true);

    const ingredients = props.selected;
    const option = props.selectedOption;
    dispatch(setSendData({ ingredients, option }));

    axios
      // endpoint 주소 변경 필요
      .post("/", props.sendData)
      .then((response) => {
        axios
          .get("/")
          .then((response) => {
            // 파싱 및 GET 테스트 필요 !
            dispatch(setRecieveData(response.data));
            setLoading(false);
            console.log(response.data);

            Navigate("/recipe");
          })
          .catch((error) => {
            console.log("GET Failed :", error);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.log("POST Failed :", error);
        setLoading(false);
      });
  };

  const MakeBtn = styled.div`
    width: 70%;
    height: 7%;
    min-height: 40px;
    color: #f2f0ef;
    background-color: #352e29;

    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;
    bottom: 5%;
    margin: 0 auto;
    left: 0;
    right: 0;

    border-radius: 10px;
    box-shadow: 0px 10px 20px -5px rgba(153, 153, 153, 0.78);

    cursor: pointer;
  `;

  const Loading = styled.div`
    width: 100%;
    height: 100%;

    background-color: #f2f0ef;
    /* background-color: black; */
    position: fixed;
    bottom: 0%;
    margin: 0 auto;
    left: 0;
    right: 0;

    display: flex;
    justify-content: center;
    align-items: center;
  `;

  return <>{loading ? <Loading>loadingding..</Loading> : <MakeBtn onClick={handleClick}>제작</MakeBtn>}</>;
}

export default MakeRequest;
