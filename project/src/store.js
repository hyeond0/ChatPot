import { configureStore, createSlice } from "@reduxjs/toolkit";

let select = createSlice({
  name: "select",
  initialState: [
    { type: "대파", choiced: false },
    { type: "양파", choiced: false },
    { type: "달걀", choiced: false },
    { type: "돼지고기", choiced: false },
  ],
  reducers: {
    setSelectTrue(state, idx) {
      state[idx.payload].choiced = true;
    },
    setSelectFalse(state, idx) {
      state[idx.payload].choiced = false;
    },
  },
});

let selected = createSlice({
  name: "selected",
  // initialState: ["대파", "양파", "저민 돼지고기", "대파"],
  initialState: [],
  reducers: {
    pushSelected(state, item) {
      state.push(item.payload);
    },
    removeSelected(state, item) {
      let filtered = state.filter((element) => element !== item.payload);
      state = filtered;

      return state;
    },
  },
});

let option = createSlice({
  name: "option",
  initialState: ["저염식", "최고비건식", "주펄찜", "손님들 접대용 파티음식", "치팅데이"],
});

let inputClick = createSlice({
  name: "inputClick",
  initialState: true,
  reducers: {
    setToggle: (state) => !state,
  },
});

export default configureStore({
  reducer: {
    select: select.reducer,
    selected: selected.reducer,
    option: option.reducer,
    inputClick: inputClick.reducer,
  },
});

export let { setSelectFalse, setSelectTrue } = select.actions;
export let { setToggle } = inputClick.actions;
export let { pushSelected, removeSelected } = selected.actions;
