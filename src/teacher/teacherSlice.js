import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tableView: "card",
  totalTeachers: 0,
};

const tableSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    totalTeachers(state, action) {
      state.totalTeachers = action.payload;
    },
    setTableView(state, action) {
      state.tableView = action.payload;
    },
  },
});

const teacherReducer = tableSlice.reducer;
export default teacherReducer;

export let { setTableView, totalTeachers } = tableSlice.actions;
