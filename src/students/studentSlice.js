import { createSlice } from "@reduxjs/toolkit"

const initialState ={
    searchQuery:'',
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
    }
})

const studentReducer = studentSlice.reducer
export default studentReducer

export const {setSearchQuery,setTotalStudentsOntable} = studentSlice.actions