import { configureStore, createSlice } from "@reduxjs/toolkit";

let select = createSlice({
  name: "select",
  initialState: [
    { type: "대파", thumbnail: "🥬" },
    { type: "마늘", thumbnail: "🧄" },
    { type: "양파", thumbnail: "🧅" },
    { type: "달걀", thumbnail: "🥚" },
    { type: "감자", thumbnail: "🥔" },
    { type: "고구마", thumbnail: "🍠" },
    { type: "토마토", thumbnail: "🍅" },
    { type: "당근", thumbnail: "🥕" },
    { type: "파프리카", thumbnail: "🫑" },
    { type: "가지", thumbnail: "🍆" },
    { type: "옥수수", thumbnail: "🌽" },
    { type: "고추", thumbnail: "🌶️" },
    { type: "오이", thumbnail: "🥒" },
    { type: "아보카도", thumbnail: "🥑" },
    { type: "버섯", thumbnail: "🍄" },
    { type: "콩", thumbnail: "🫘" },
    { type: "돼지고기", thumbnail: "🍖" },
    { type: "닭고기", thumbnail: "🍗" },
    { type: "소고기", thumbnail: "🥩" },
    { type: "치즈", thumbnail: "🧀" },
    { type: "사과", thumbnail: "🍎" },
    { type: "배", thumbnail: "🍐" },
    { type: "오렌지", thumbnail: "🍊" },
    { type: "레몬", thumbnail: "🍋" },
    { type: "바나나", thumbnail: "🍌" },
    { type: "수박", thumbnail: "🍉" },
    { type: "포도", thumbnail: "🍇" },
    { type: "딸기", thumbnail: "🍓" },
    { type: "블루베리", thumbnail: "🫐" },
    { type: "메론", thumbnail: "🍈" },
    { type: "복숭아", thumbnail: "🍑" },
    { type: "파인애플", thumbnail: "🍍" },
  ],
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
    initSelected(state) {
      state = [];
      console.log("Selected initiated");

      return state;
    },
  },
});

let option = createSlice({
  name: "option",
  initialState: [
    "볶음류",
    "면류",
    "찜류",
    "국물류 / 탕류",
    "건강식",
    "저염식",
    "추운 날 먹기 좋은",
    "비 오는 날 먹기 좋은",
  ],
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
    initOption(state) {
      state = [];
      console.log("Option initiated");

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

let recieveData = createSlice({
  name: "recieveData",
  initialState: {
    dishName: "",
    elements: [],
    recipeSteps: [],
    introduction: "",
  },
  reducers: {
    setRecieveData: (state, action) => {
      state.dishName = action.payload.dishName;
      state.elements = action.payload.elements;
      state.recipeSteps = action.payload.recipeSteps;
      state.introduction = action.payload.introduction;
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
    recieveData: recieveData.reducer,
  },
});

export let { setToggle } = inputClick.actions;
export let { pushSelected, removeSelected, initSelected } = selected.actions;
export let { pushOption, removeOption, initOption } = selectedOption.actions;
export let { AddOption } = option.actions;
export let { setRecieveData } = recieveData.actions;
