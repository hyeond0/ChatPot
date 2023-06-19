import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import styled, { createGlobalStyle, css } from "styled-components";
import { Container, Row, Col } from "react-bootstrap";

import TypeIt from "typeit-react";
import { BiChevronRight } from "react-icons/bi";

function IndexPage(props) {
  const Navigate = useNavigate();
  const food = [
    "스테이크",
    "피자",
    "스시",
    "파스타",
    "햄버거",
    "치킨 너겟",
    "라면",
    "샐러드",
    "타코",
    "샌드위치",
    "갈비찜",
    "불고기",
    "카레",
    "찜닭",
    "오므라이스",
    "초밥",
    "곱창",
    "김치찌개",
    "콩나물국밥",
    "돈까스",
    "치킨 카레",
    "닭갈비",
    "비빔밥",
    "짜장면",
    "쌀국수",
    "순두부찌개",
    "떡볶이",
    "감자튀김",
    "새우볶음밥",
    "짬뽕",
    "김치볶음밥",
    "김밥",
    "된장찌개",
    "볶음밥",
    "폭립",
    "뼈해장국",
    "칼국수",
    "소고기덮밥",
    "팟타이",
    "닭강정",
    "순대국",
    "마라탕",
    "파전",
    "해물찜",
    "갈비탕",
    "감자전",
    "낙지볶음",
    "육회",
    "보쌈",
    "깐풍기",
    "양꼬치",
    "김치전",
    "갈비살",
    "꽃게탕",
    "꽃등심",
    "삼겹살",
    "부대찌개",
    "매운탕",
    "모듬전",
    "전주비빔밥",
    "수제비",
    "마파두부",
    "막국수",
    "떡갈비",
    "라멘",
    "갈비전골",
    "감자국",
    "낙지쭈꾸미",
    "닭갈비덮밥",
    "볶음우동",
    "소머리국밥",
    "쌀국수",
    "육개장",
    "파스타",
    "햄버거",
    "불고기버거",
    "치킨버거",
    "샌드위치",
    "치킨샐러드",
    "계란말이",
    "김치찌개",
    "된장찌개",
    "부대찌개",
    "김치볶음밥",
    "볶음밥",
    "짜장면",
    "짬뽕",
    "볶음우동",
    "볶음면",
    "김밥",
    "주먹밥",
    "떡볶이",
    "순대",
    "어묵",
    "오뎅",
    "튀김",
    "토스트",
    "핫도그",
    "피자",
    "치킨",
    "감자튀김",
    "감자스틱",
    "치킨너겟",
    "감자볼",
    "김치전",
    "파전",
    "해물파전",
    "고기만두",
    "김치만두",
    "물만두",
    "찐만두",
    "고로케",
    "오징어젓갈",
    "멸치볶음",
    "미역줄기볶음",
    "어묵볶음",
    "순대볶음",
    "야채볶음",
    "계란볶음밥",
    "불고기덮밥",
    "제육덮밥",
    "오므라이스",
    "김치볶음밥",
    "야채볶음밥",
    "해물볶음밥",
    "짜장밥",
    "참치김밥",
    "라볶이",
    "찜닭",
    "뚝배기불고기",
    "고추장불고기",
    "제육볶음",
    "간장게장",
    "양념게장",
    "참치김치찌개",
    "순두부찌개",
    "불닭볶음면",
    "짬뽕면",
    "비빔냉면",
    "냉모밀",
    "김치냉면",
    "육회비빔밥",
    "잡채밥",
    "짬뽕밥",
    "비빔밥",
    "냉콩국수",
    "콩나물국밥",
    "육개장밥",
    "갈비탕",
    "해물찜",
    "닭볶음탕",
    "김치찌개",
    "순두부찌개",
    "부대찌개",
    "김치찜",
    "감자조림",
    "된장찌개",
    "콩나물무침",
    "오이무침",
    "시금치나물",
    "호박볶음",
    "애호박볶음",
    "두부조림",
    "콩자반",
    "강된장",
    "오이생채",
    "깍두기",
    "무생채",
    "파채무침",
    "콩나물냉채",
    "멸치볶음",
    "두부김치",
    "김치",
    "오이김치",
    "무김치",
    "배추김치",
    "가지볶음",
    "호박볶음",
    "숙주나물",
    "숙쌈",
    "양파절임",
    "고사리나물",
    "시금치나물",
    "치커리",
    "열무나물",
    "도라지무침",
    "물미역",
    "미역줄기볶음",
    "감자조림",
    "소세지볶음",
    "어묵볶음",
    "참치야채전",
    "계란말이",
    "감자전",
    "양파링",
    "꽃게탕",
    "고추장찌개",
    "짬뽕",
    "잔치국수",
    "초계국수",
    "삼선짬뽕",
    "자장면",
    "탕수육",
    "깐풍기",
    "마파두부",
    "울면",
    "꿔바로우",
    "북경식쑥갓밥",
    "마파두부밥",
    "마라샹궈",
    "마라탕",
    "잡채밥",
    "회덮밥",
    "회냉면",
    "모둠회",
    "낙지볶음",
    "해물볶음",
    "물회",
    "생선초회",
    "해물파전",
    "파전",
    "감자전",
    "김치전",
    "매운갈비찜",
    "제육볶음",
    "삼겹살구이",
    "보쌈",
    "소갈비찜",
    "갈비찜",
    "양념갈비",
    "갈비구이",
    "바베큐폭립",
    "돼지불고기",
    "돼지갈비찜",
    "족발",
    "냉면",
    "비빔냉면",
    "칼국수",
    "만두국",
    "수제비",
    "라면",
    "우동",
    "라멘",
    "야끼소바",
    "떡라면",
    "곰탕",
    "감자국",
    "국밥",
    "만둣국",
    "콩나물국밥",
    "북엇국",
    "해물탕",
    "매운탕",
    "된장국",
    "김치찌개",
    "부대찌개",
    "순두부찌개",
    "고추장찌개",
    "갈비탕",
    "추어탕",
    "샤브샤브",
    "핫팟",
    "뚝배기불고기",
    "찜닭",
    "닭갈비",
    "닭볶음탕",
    "제육볶음",
    "꿔바로우",
    "탕수육",
    "오리주물럭",
    "고추잡채",
    "마파두부",
    "라조기",
    "팔보채",
    "마라샹궈",
    "쇠고기불고기",
    "소고기불고기",
    "고추소스불고기",
    "제육덮밥",
    "회덮밥",
    "콩나물밥",
    "오징어덮밥",
    "낙지덮밥",
    "야채볶음밥",
    "잡채밥",
    "해물볶음밥",
    "김치볶음밥",
    "치킨볶음밥",
    "볶음밥",
    "짜장밥",
    "볶음우동",
    "간짜장",
    "깐풍기",
    "삼선짬뽕",
    "마파두부",
    "짬뽕밥",
    "짜장면",
    "짬뽕면",
    "비빔냉면",
    "콩국수",
    "열무국수",
    "수제비",
    "냉모밀",
    "물냉면",
    "비빔국수",
    "잔치국수",
    "쌀국수",
    "파스타",
    "피자",
    "스파게티",
    "리조또",
    "마르게리타",
    "알리오올리오",
    "크림파스타",
    "까르보나라",
    "로제파스타",
    "나폴리탄",
    "해산물파스타",
    "아라비아타",
    "불고기피자",
    "포테이토피자",
    "치즈피자",
    "페퍼로니피자",
    "하와이안피자",
    "바베큐치킨피자",
    "돼지고기피자",
    "콤비네이션피자",
    "야채피자",
    "버섯피자",
    "감자피자",
    "닭가슴살샐러드",
    "그릴치킨샐러드",
    "코브샐러드",
    "카프레제샐러드",
    "시저샐러드",
    "계란샐러드",
    "망고샐러드",
    "통닭샐러드",
    "고구마샐러드",
    "그린샐러드",
    "치킨샐러드",
    "그릴야채샐러드",
    "새우샐러드",
    "타코샐러드",
    "참치샐러드",
    "레몬치킨샐러드",
    "오리엔탈샐러드",
    "치즈샐러드",
    "프리미엄샐러드",
    "가지무침",
    "주펄찜",
  ];

  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // 컴포넌트가 언마운트될 때 리사이즈 이벤트 리스너를 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <GlobalStyle></GlobalStyle>
      <SContainer>
        <Rectangle>
          <SRow>
            <Title>오늘 식사메뉴</Title>
            <StyeldTypeit
              getBeforeInit={(instance) => {
                for (let i = 0; i <= 50; i++) {
                  const idx = Math.floor(Math.random() * 100);
                  instance.type(food[idx]).pause(2000).delete(food[idx].length).pause(1000);
                }
                return instance;
              }}
              options={{ loop: true, speed: 130 }}
            />
            <Title> 어떠세요?</Title>
          </SRow>
          <SRow>
            {/* <SubTitle>
              메뉴 고민은 이제 그만, {viewportWidth < 768 && <br />} <b>챗팟</b>이 도와드릴게요!
            </SubTitle> */}
          </SRow>
          <StartBtn
            onClick={() => {
              Navigate("/selectIngredients", { state: { direction: "right" } });
            }}
          >
            <div>
              <b>챗팟</b> 시작하기
            </div>
            <BiChevronRight style={{ fontSize: "40px" }}></BiChevronRight>
          </StartBtn>
        </Rectangle>
      </SContainer>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
 ${css`
   ::-webkit-scrollbar {
     width: 0px;
   }

   ::-webkit-scrollbar-track {
     background-color: transparent;
   }

   ::-webkit-scrollbar-thumb {
     background-color: #352e29;
     border-radius: 50px;
     width: 10px;
   }

   ::-webkit-scrollbar-thumb:hover {
     background-color: #352e29;
   }
 `}
    
 @media (min-width: 768px) {
    ${css`
      ::-webkit-scrollbar {
        width: 5px;
      }

      ::-webkit-scrollbar-track {
        background-color: transparent;
      }

      ::-webkit-scrollbar-thumb {
        background-color: transparent;
      }

      ::-webkit-scrollbar-thumb:hover {
        background-color: transparent;
      }
    `}
  }
`;

const Title = styled.span`
  font-size: 25px;
  font-weight: 100;

  @media (min-width: 768px) {
    font-size: 30px;
  }
`;

const SubTitle = styled.span`
  font-size: 18px;

  @media (min-width: 768px) {
    font-size: 20px;
  }
`;

const StyeldTypeit = styled(TypeIt)`
  font-size: 30px;
  font-weight: 900;
  background-color: #f2f0ef;
  color: #352e29;
  padding: 0px 8px;

  /* width: ; */
`;

const SContainer = styled(Container)`
  width: 100%;
  height: 85%;
  margin: 0px 0px 0px 0px;

  position: fixed;
  bottom: 0px;

  @media (min-width: 768px) {
  }
`;

const SRow = styled.div`
  margin: 0px 0px 0px 0px;
  padding: 0px 0px 0px 0px;

  gap: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 12px;
  }
`;

const SCol = styled(Col)`
  margin: 0px 0px 7% 0px;
  padding: 0px;
  height: 100%;

  @media (min-width: 768px) {
  }
`;

const Rectangle = styled.div`
  width: 100%;
  height: 100%;
  margin: 0px 0px 0px 0px;
  padding: 0px 0px 10% 0px;

  background-color: #352e29;

  overflow-y: auto;
  overflow-x: hidden;

  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;

  color: white;
  gap: 20%;

  border-radius: 40px 40px 0px 0px;

  @media (min-width: 768px) {
    padding: 0px 0px 5% 0px;

    gap: 20%;
  }
`;

const StartBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 25px;
  cursor: pointer;
  gap: 12px;
  margin-top: 50px;

  @media (min-width: 768px) {
    &:hover {
      text-decoration: none;
    }
  }

  &:hover {
    text-decoration: underline;
  }
`;

export default IndexPage;
