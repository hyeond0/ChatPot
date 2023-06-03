import { useState, useEffect } from "react";

const ScrollTranslate = () => {
  const [lastDirection, setLastDirection] = useState(null);

  useEffect(() => {
    const handleWheel = (event) => {
      // 기본 스크롤 동작 방지
      // 브라우저에서 콘솔 에러가 발생할 수 있기 때문에,
      // 이벤트 리스너 시  Passive를 False로 지정해주어야 함.
      event.preventDefault();

      // deltaY : 마우스 휠 이벤트 세로 스크롤 변화량
      // screenHeight : 현재 보이는 화면의 세로 크기 (100vh)
      // pageYoffset : 현재 스크롤된 세로 위치
      const deltaY = event.deltaY;
      const screenHeight = window.innerHeight;
      console.log(lastDirection);

      // deltaY 값과 lastDirection 값을 비교하여 스크롤 방향을 체크
      // 스크롤 방향이 바뀌는 경우에만 스크롤 이동 처리
      if (deltaY > 0 && lastDirection !== "down") {
        window.scrollTo({
          top: window.pageYOffset + screenHeight,
          behavior: "auto",
        });
        setLastDirection("down");
      } else if (deltaY < 0 && lastDirection !== "up") {
        window.scrollTo({
          top: window.pageYOffset - screenHeight,
          behavior: "auto",
        });
        setLastDirection("up");
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    // setLastDirection(null);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [lastDirection]);

  return <div>Scroll Component</div>;
};

export default ScrollTranslate;

// import { useState, useEffect } from "react";

// const ScrollTranslate = () => {
//   const [lastDirection, setLastDirection] = useState(null);

//   useEffect(() => {
//     const handleWheel = (event) => {
//       // 기본 스크롤 동작 방지
//       // 브라우저에서 콘솔 에러가 발생할 수 있기 때문에,
//       // 이벤트 리스너 시  Passive를 False로 지정해주어야 함.
//       event.preventDefault();

//       // deltaY : 마우스 휠 이벤트 세로 스크롤 변화량
//       // screenHeight : 현재 보이는 화면의 세로 크기 (100vh)
//       // pageYoffset : 현재 스크롤된 세로 위치
//       const deltaY = event.deltaY;
//       const screenHeight = window.innerHeight;

//       // deltaY 값과 lastDirection 값을 비교하여 스크롤 방향을 체크
//       // 스크롤 방향이 바뀌는 경우에만 스크롤 이동 처리
//       if (deltaY > 0 && lastDirection !== "down") {
//         window.scrollTo({
//           top: window.pageYOffset + screenHeight,
//           behavior: "auto",
//         });
//         setLastDirection("down");
//       } else if (deltaY < 0 && lastDirection !== "up") {
//         window.scrollTo({
//           top: window.pageYOffset - screenHeight,
//           behavior: "auto",
//         });
//         setLastDirection("up");
//       }
//     };

//     window.addEventListener("wheel", handleWheel, { passive: false });

//     return () => {
//       window.removeEventListener("wheel", handleWheel);
//     };
//   }, [lastDirection]);

//   return <div>Scroll Component</div>;
// };

// export default ScrollTranslate;
