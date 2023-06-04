import styled from "styled-components";
import useState from "react";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import logo from "../img/chatpotLogo.png";

const testData = [
  {
    name: "대패삼겹찜",
    element: [
      "- 대패삼겹살 500g",
      "- 대파 2대",
      "- 마늘 4쪽",
      "- 생강 1조각",
      "- 청주 2큰술",
      "- 간장 2큰술",
      "- 설탕 1큰술",
      "- 참기름 1큰술",
      "- 참깨 약간",
      "- 물 1컵",
    ],
    instructions: [
      "1. 대파는 5cm 길이로 썰어줍니다.",
      "2. 마늘과 생강은 다지거나 간장, 청주, 설탕, 참기름, 참깨를 섞어 만든 양념장에 함께 갈아줍니다.",
      "3. 대패삼겹살은 끓는 물에 3분간 살짝 데쳐준 후 찬물에 헹궈 물기를 제거합니다.",
      "4. 냄비에 대파와 대패삼겹살을 적층식으로 담아줍니다.",
      "5. 양념장을 냄비에 부어주고 물을 넣어줍니다.",
      "6. 뚜껑을 덮고 중불에서 30분간 끓여줍니다.",
      "7. 불을 끄고 찜기에서 10분간 더 찜해줍니다.",
      "8. 그릇에 담아 마지막으로 참기름과 참깨를 뿌려줍니다.",
      "",
      "매콤하고 짭조름한 대패삼겹살과 부드러운 대파가 어우러진 이 찜요리는 밥과 함께 먹으면 정말 맛있답니다!",
    ],
  },
];

function RecipeContext() {
  const StyledRow = styled(Row)`
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: #d3d1d0; */

    padding: 10px;
    width: 100%;
  `;

  const StyledContainer = styled(Container)`
    width: 100%;
    height: 100vh;
    padding: 0px;
    padding-top: 100px;
    margin: 0px;
  `;

  const StyledCol = styled(Col)`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  `;

  const RecipeContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 0px;
  `;

  const Thumbnail = styled.image`
    width: 160px;
    height: 160px;
    background-color: white;
    border-radius: 50%;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 100px;
  `;

  const Title = styled.h3`
    margin-top: 20px;

    @media (min-width: 768px) {
      /* Medium (md) view size */
      margin-top: 0px;
    }
  `;

  return (
    <>
      <RecipeContainer>
        <StyledRow>
          <StyledCol md={3}>
            <Thumbnail>
              <img src={logo}></img>
            </Thumbnail>
          </StyledCol>
          {console.log(testData)}
          <StyledCol md={9}>
            <Title>
              오늘 식사메뉴, <b>{testData[0].name} </b>어떠세요?
            </Title>
          </StyledCol>
        </StyledRow>
      </RecipeContainer>
    </>
  );
}

export default RecipeContext;
