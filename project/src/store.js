import { configureStore, createSlice } from "@reduxjs/toolkit";

let select = createSlice({
  name: "select",
  initialState: [{ type: "대파" }, { type: "양파" }, { type: "달걀" }, { type: "돼지고기" }],
  reducers: {},
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
  reducers: {
    AddOption(state, item) {
      state.push(item.payload);
    },
  },
});

let selectedOption = createSlice({
  name: "selectedOption",
  initialState: [],
  reducers: {
    pushOption(state, item) {
      state.push(item.payload);
    },
    removeOption(state, item) {
      let filtered = state.filter((element) => element !== item.payload);
      state = filtered;

      return state;
    },
  },
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
    selectedOption: selectedOption.reducer,
  },
});

export let { setToggle } = inputClick.actions;
export let { pushSelected, removeSelected } = selected.actions;
export let { pushOption, removeOption } = selectedOption.actions;
export let { AddOption } = option.actions;
