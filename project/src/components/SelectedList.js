import { useDispatch } from "react-redux";
import { removeSelected } from "../store.js";
import { BiX } from "react-icons/bi";

function SelectedList(props) {
  let dispatch = useDispatch();

  return (
    <>
      <div className="selectedContainer">
        <div className="cardTitle">Added Ingredients</div>
        {props.selected.map(function (item, i) {
          return (
            <>
              <div className="selectedList" id="selectedList">
                {item}
                <div
                  className="btnBackground"
                  onClick={(e) => {
                    const selectedValue = e.currentTarget.closest(".selectedList").innerText;
                    dispatch(removeSelected(selectedValue));
                  }}
                >
                  <BiX
                    style={{
                      color: "352e29",
                      fontSize: "20px",
                      flexShrink: "0",
                      borderRadius: "50%",
                    }}
                  />
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default SelectedList;
