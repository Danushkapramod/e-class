import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tableView: "card",
    totalClasses:0,
    tempCreateFormData: {},
    todayTotal: 0,
    todayUpcoming: 0,
    todayStarted: 0,
    todayEnded: 0,
 }
 
 const classSlice = createSlice({
     name: "class",
     initialState,
     reducers: {
        totalClasses(state, action) {
            state.totalClasses = action.payload;
        },
         setTableView(state, action) {
             state.tableView = action.payload;
         },
         setTempCreateFormData(state, action) {
             state.tempCreateFormData = action.payload;
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
         }
     }
 });
 
 const classReducer =  classSlice.reducer;
 export default classReducer;
 
 export let {
     setTableView,
     setTempCreateFormData,
     todayEnded,
     todayTotal,
     todayStarted,
     todayUpcoming,
     totalClasses
 } = classSlice.actions;
 