import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const OuterDiv = styled.div`
  height: 100vh;
  width: 100%;
  overflow-y: auto;
`;
const InnerDiv = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: end;

  background-color: #f2f0ef;
`;
const Divider = styled.div`
  width: 100%;
  height: 5px;
  background-color: #f2f0ef;
`;
const Rectangle = styled.div`
  width: 90%;
  height: 85%;
  border-radius: 40px 40px 0px 0px;
  background-color: #352e29;
`;

const TestPage = () => {
  const outerRef = useRef();

  // Fullpage animation
  useEffect(() => {
    const wheelHandler = (e) => {
      e.preventDefault();
      const { deltaY } = e;
      const { scrollTop } = outerRef.current;
      const pageHeight = window.innerHeight;
      const DIVIDER_HEIGHT = 5;

      if (deltaY > 0) {
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          outerRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          outerRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
        } else {
          outerRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
        }
      } else {
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          outerRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          outerRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        } else {
          outerRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
        }
      }
    };

    const outerRefCurrent = outerRef.current;
    outerRefCurrent.addEventListener("wheel", wheelHandler);

    return () => {
      outerRefCurrent.removeEventListener("wheel", wheelHandler);
    };
  }, []);

  return (
    <>
      <OuterDiv ref={outerRef}>
        <InnerDiv>
          <Rectangle></Rectangle>
        </InnerDiv>
        <Divider></Divider>
        <InnerDiv>
          <Rectangle></Rectangle>
        </InnerDiv>
        <Divider></Divider>
        <InnerDiv>
          <Rectangle></Rectangle>
        </InnerDiv>
      </OuterDiv>
    </>
  );
};

export default TestPage;
