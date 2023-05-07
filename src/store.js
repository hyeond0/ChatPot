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

export let { setSelectFalse, setSelectTrue } = select.actions;

let selected = createSlice({
  name: "selected",
  initialState: ["대파", "양파"],
});

export default configureStore({
  reducer: {
    select: select.reducer,
    selected: selected.reducer,
  },
});
