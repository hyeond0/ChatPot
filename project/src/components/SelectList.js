import { useDispatch } from "react-redux";
import { pushSelected, removeSelected } from "../store.js";
import styled from "styled-components";

function SelectList(props) {
  let dispatch = useDispatch();

  const SelectContainer = styled.div`
    width: 100%;
    padding: 10px 0px;

    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    gap: 10px;

    border-radius: 75px;
  `;

  const SelectItem = styled.div`
    width: 100px;
    height: 100px;
    background-color: #ffffff;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 0;
    flex-shrink: 0;

    border-radius: 50%;
    box-shadow: 0px 10px 20px -5px rgba(153, 153, 153, 0.2);
  `;

  return (
    <>
      <SelectContainer>
        {props.select.map(function (item, i) {
          return (
            <>
              <SelectItem
                onClick={(e) => {
                  const selectedValue = e.currentTarget.innerText;

                  if (props.selected.includes(selectedValue)) {
                    dispatch(removeSelected(selectedValue));
                  } else {
                    dispatch(pushSelected(selectedValue));
                  }
                }}
              >
                {item.type}
              </SelectItem>
            </>
          );
        })}
      </SelectContainer>
    </>
  );
}

export default SelectList;
