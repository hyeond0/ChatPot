import styled from "styled-components";
import { BiBookmark, BiExport, BiRevision } from "react-icons/bi";

function RecipeButton() {
  const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 0px;

    gap: 6px;
  `;

  const Button = styled.button`
    width: 100%;
    max-width: 300px;
    height: 60px;
    padding: 25px 30px;
    text-align: start;
    background-color: #352e29;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    gap: 12px;

    border-radius: 100px;
    border: none;

    color: white;
  `;

  const StyledBiBookmark = styled(BiBookmark)``;
  const StyledBiExport = styled(BiExport)``;
  const StyledBiRevision = styled(BiRevision)``;

  return (
    <>
      <ButtonContainer>
        <Button>
          <StyledBiBookmark></StyledBiBookmark>레시피 저장
        </Button>
        <Button>
          <StyledBiExport></StyledBiExport>레시피 공유
        </Button>
        <Button>
          <StyledBiRevision></StyledBiRevision>다른 레시피
        </Button>
      </ButtonContainer>
    </>
  );
}

export default RecipeButton;
