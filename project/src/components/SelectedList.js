import { useDispatch } from "react-redux";
import { removeSelected, pushSelected } from "../store.js";
import { BiX, BiListPlus } from "react-icons/bi";
import styled from "styled-components";
import { useForm } from "react-hook-form";

function SelectedList(props) {
  let dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

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

  const SelectedWrite = styled.form`
    width: 100%;
    padding: 18px 20px;
    background-color: #352e29;
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

  const StyledBiListPlus = styled(BiListPlus)`
    color: #f2f0ef;
    font-size: 23px;
    flex-shrink: 0;
    border: none;
  `;

  const BtnSubmit = styled.button`
    background-color: #352e29;
    color: none;
    border: none;

    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
  `;

  const CustomInput = styled.input`
    background: none;
    border: none;
    outline: none;
    color: #f2f0ef;

    width: 100%;
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
        <SelectedWrite
          onSubmit={handleSubmit((data) => {
            dispatch(pushSelected(data.ingredients));
          })}
        >
          <CustomInput type="text" placeholder="추가할 식재료를 직접 작성해주세요" {...register("ingredients")} />
          <BtnSubmit type="submit">
            <StyledBiListPlus />
          </BtnSubmit>
        </SelectedWrite>
      </SelectedContainer>
    </>
  );
}

export default SelectedList;
