import { createSlice } from "@reduxjs/toolkit"

const initialState ={
    alerts:[],
    root:""
}


const globalReducer = createSlice({
    name:"global",
    initialState,
    reducers:{
        setRootName(state,action){
            state.root = action.payload
        },
        addAlert(state,action){
            state.alerts.push(action.payload)
        },
        removeAlert(state,action){
            state.alerts.splice(action.payload,1)
        }
    }
})
 const globalUiReducer = globalReducer.reducer 
export default  globalUiReducer 
export const {addAlert,removeAlert,setRootName} = globalReducer.actions