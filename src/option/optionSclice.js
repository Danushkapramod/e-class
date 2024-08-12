import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalHalls: 0,
  totalSubjects: 0,
  totalGrades: 0,
  totalOptions: 0,
};

const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    totalHalls(state, action) {
      state.totalHalls = action.payload;
      calculateTotalOptions(state);
    },
    totalGrades(state, action) {
      state.totalGrades = action.payload;
      calculateTotalOptions(state);
    },
    totalSubjects(state, action) {
      state.totalSubjects = action.payload;
      calculateTotalOptions(state);
    },
  },
});

function calculateTotalOptions(state) {
  state.totalOptions = state.totalGrades + state.totalHalls + state.totalSubjects;
}

const optionsReducer = optionsSlice.reducer;
export default optionsReducer;

export let { totalOptions, totalHalls, totalSubjects, totalGrades } =
  optionsSlice.actions;
