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
  initialState: ["면요리", "찜요리", "국물류 / 탕류", "볶음류", "건강식", "추운 날 먹기 좋은", "비 오는 날 먹기 좋은"],
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

let sendData = createSlice({
  name: "sendData",
  initialState: {
    ingredients: null,
    option: null,
  },
  reducers: {
    setSendData: (state, action) => {
      state.ingredients = action.payload.ingredients;
      state.option = action.payload.option;
    },
  },
});

let recieveData = createSlice({
  name: "recieveData",
  initialState: null,
  reducers: {
    setRecieveData: (state, action) => {
      state = action.payload;
    },
  },
});

export default configureStore({
  reducer: {
    select: select.reducer,
    selected: selected.reducer,
    option: option.reducer,
    inputClick: inputClick.reducer,
    selectedOption: selectedOption.reducer,
    sendData: sendData.reducer,
    recieveData: recieveData.reducer,
  },
});

export let { setToggle } = inputClick.actions;
export let { pushSelected, removeSelected } = selected.actions;
export let { pushOption, removeOption } = selectedOption.actions;
export let { AddOption } = option.actions;
export let { setRecieveData } = recieveData.actions;
export let { setSendData } = sendData.actions;
