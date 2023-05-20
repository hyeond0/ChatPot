import axios from "axios";

function MakeRequest(props) {
  return (
    <>
      <div
        onClick={() => {
          axios.get("/URL", { ...props.selected, message: `${props.selected}을(를) 활용한 레시피 추천해줘` });
        }}
        className="make"
      >
        제작
      </div>
    </>
  );
}

export default MakeRequest;
