import { createSlice } from "@reduxjs/toolkit"

const initialState ={
    totalStudents: 0,
    paginationQuery:'',

}

const studentSlice = createSlice({
    name:'student',
    initialState,
    reducers:{
        setPaginationQuery(state, action) {
            state.paginationQuery = action.payload;
          },
        setSearchQuery(state,action){
            state.searchQuery = action.payload
        },
        setTotalStudents(state,action){
            state.totalStudents = action.payload
        },
    }
})

const studentReducer = studentSlice.reducer
export default studentReducer

export const {setPaginationQuery,setTotalStudents} = studentSlice.actions