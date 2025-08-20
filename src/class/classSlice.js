import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tableView: "card",
  totalClasses: 0,
  tempCreateClassForm: {},
  isCreateClassOpen: false,
  todayTotal: 0,
  todayUpcoming: 0,
  todayStarted: 0,
  todayEnded: 0,
  pagginationQuery: {}
};

const classSlice = createSlice({
  name: "class",
  initialState,
  reducers: {
    totalClasses(state, action) {
      state.totalClasses = action.payload;
    },
    setPagginationQuery(state, action) {
      state.pagginationQuery = action.payload;
    },
    setTableView(state, action) {
      state.tableView = action.payload;
    },
    setTempCreateClassForm(state, action) {
      state.tempCreateClassForm = action.payload;
    },
    todayTotal(state, action) {
      state.todayTotal = action.payload;
    },
    todayUpcoming(state, action) {
      state.todayUpcoming = action.payload;
    },
    todayStarted(state, action) {
      state.todayStarted = action.payload;
    },
    todayEnded(state, action) {
      state.todayEnded = action.payload;
    },
    setIsCreateClassOpen(state, action) {
      state.isCreateClassOpen = action.payload;
    },
  },
});

const classReducer = classSlice.reducer;
export default classReducer;

export let {
  setTableView,
  setTempCreateClassForm,
  setIsCreateClassOpen,
  todayEnded,
  todayTotal,
  todayStarted,
  todayUpcoming,
  totalClasses,
  setPagginationQuery
} = classSlice.actions;
