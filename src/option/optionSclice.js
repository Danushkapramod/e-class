import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalHalls:0,
    totalSubjects:0,
    totalGrades:0,
    totalOptions:0
 }
 
 const optionsSlice = createSlice({
     name: "options",
     initialState,
     reducers: {
        totalOptions(state,action) {
            state.totalOptions =  action.payload
        },
        totalHalls(state, action) {
            state.totalHalls = action.payload;
        },
        totalGrades(state, action) {
            state.totalGrades = action.payload;
        },
        totalSubjects(state, action) {
            state.totalSubjects = action.payload;
        },
         
     }
 });
 
 const optionsReducer =  optionsSlice.reducer;
 export default optionsReducer;
 
 export let {
    totalOptions,
    totalHalls,
    totalSubjects,
    totalGrades
 } = optionsSlice.actions;
 