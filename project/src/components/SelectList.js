import { useDispatch } from "react-redux";
import { pushSelected, removeSelected } from "../store.js";

function SelectList(props) {
  let dispatch = useDispatch();

  return (
    <>
      <container className="selectContainer">
        {props.select.map(function (item, i) {
          return (
            <>
              {/* 20230520 */}
              {/* 아이템 클릭했을 때, Selected List에 해당 아이템 추가 */}
              {/* 이미 들어가있는 상태였다면, 해당 아이템을 찾아 제거 */}
              <div
                className="selectItem"
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
              </div>
            </>
          );
        })}
      </container>
    </>
  );
}

export default SelectList;
