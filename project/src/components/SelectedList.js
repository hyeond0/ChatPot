import { useDispatch } from "react-redux";
import { removeSelected } from "../store.js";
import { BiX } from "react-icons/bi";
import styled from "styled-components";

function SelectedList(props) {
  let dispatch = useDispatch();

  const SelectedContainer = styled.div`
    width: 100%;
    margin-top: 40px;
    padding-bottom: 35px;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: start;
    gap: 5px;

    border-radius: 45px;
  `;

  const CardTitle = styled.div`
    width: 100%;
    text-align: center;
    margin-bottom: 25px;
    color: #352e29;

    font-size: x-large;
    font-weight: 700;
  `;

  const SelectedList = styled.div`
    width: 100%;
    padding: 18px 20px;
    background-color: white;
    text-align: start;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    box-shadow: 0px 10px 20px -5px rgba(153, 153, 153, 0.2);
    border-radius: 10px;
  `;

  const BtnBackground = styled.div`
    width: 25px;
    height: 25px;
    margin-left: 20px;
    background-color: #f2f0ef;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;

    border-radius: 50%;
  `;

  const StyledBiX = styled(BiX)`
    color: #352e29;
    font-size: 20px;
    flex-shrink: 0;
    border-radius: 50%;
  `;

  return (
    <>
      <SelectedContainer>
        <CardTitle>Added Ingredients</CardTitle>
        {props.selected.map(function (item, i) {
          return (
            <>
              <SelectedList id="selectedList">
                {item}
                <BtnBackground
                  onClick={(e) => {
                    const selectedValue = e.currentTarget.closest("#selectedList").innerText;
                    dispatch(removeSelected(selectedValue));
                  }}
                >
                  <StyledBiX></StyledBiX>
                </BtnBackground>
              </SelectedList>
            </>
          );
        })}
      </SelectedContainer>
    </>
  );
}

export default SelectedList;
