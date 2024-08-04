import { createSlice } from "@reduxjs/toolkit"

const initialState ={
    searchQuery:'',
    totalStudents: 0,
    totalStudentsOntable: 0,
}

const studentSlice = createSlice({
    name:'student',
    initialState,
    reducers:{
        setSearchQuery(state,action){
            state.searchQuery = action.payload
        },
        setTotalStudentsOntable(state,action){
            state.totalStudentsOntable = action.payload
        },
        setTotalStudents(state,action){
            state.totalStudents = action.payload
        },
    }
})

const studentReducer = studentSlice.reducer
export default studentReducer

export const {setSearchQuery,setTotalStudents,setTotalStudentsOntable} = studentSlice.actions