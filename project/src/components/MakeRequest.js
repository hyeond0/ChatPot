import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { setRecieveData } from "../store.js";
import { useDispatch } from "react-redux";

import Lottie from "react-lottie";
import loadingAnimation from "../lottie/loading.json";

function MakeRequest(props) {
  let Navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const LoadingAnimation = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {},
  };
  // 버튼 클릭 시 Loading -> Post -> Get -> Navigate 처리
  // 해당 과정은 이전 단계가 성공해야 연쇄적으로 처리가 가능함
  const handleClick = () => {
    setLoading(true);

    const ingredients = props.selected;
    const option = props.selectedOption;
    const sendData = { ingredients, option };

    axios
      .post("/", sendData)
      .then((res) => {
        const respond = res.data;
        console.log(respond);

        dispatch(setRecieveData(respond));

        console.log(props.receiveData);
        setLoading(false);
        Navigate("/recipe");
      })
      .catch((erroe) => {
        console.log("로딩 실패! 다시 시작해주세요");
        setLoading(false);
      });
  };
  // axios
  //   .post("/", sendData)
  //   .then((response) => {
  //     axios
  //       .get("/")
  //       .then((response) => {
  //         const recieveData = response.data;
  //         const name = recieveData[0].name;
  //         const element = recieveData[0].element;
  //         const instructions = recieveData[0].instructions;

  //         // dispatch(setRecieveData(name, element, instructions));
  //         console.log(recieveData);
  //         setLoading(false);

  //         Navigate("/recipe");
  //       })
  //       .catch((error) => {
  //         console.log("GET Failed :", error);
  //         setLoading(false);
  //       });
  //   })
  //   .catch((error) => {
  //     console.log("POST Failed :", error);
  //     setLoading(false);
  //   });

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

    transition: all 1s;
  `;

  return (
    <>
      {loading ? (
        <Loading>
          <Lottie
            options={LoadingAnimation}
            height={400}
            width={400}
            isPaused={false}
            isStopped={false}
            isClickToPauseDisabled={true}
          />
          <h2>챗팟이 맛있는 레시피를 추천해드릴게요!</h2>
        </Loading>
      ) : (
        <MakeBtn onClick={handleClick}>제작</MakeBtn>
      )}
    </>
  );
}

export default MakeRequest;
