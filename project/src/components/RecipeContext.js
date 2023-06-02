import styled from "styled-components";

function RecipeContext() {
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
  `;

  return (
    <>
      <RecipeContainer>
        <Thumbnail>썸네일</Thumbnail>
      </RecipeContainer>
    </>
  );
}

export default RecipeContext;
