import { useDispatch, useSelector } from "react-redux";
import { addAlert, removeAlert } from "../GlobalUiState";


export function useAddAlert(){
    const {alerts} = useSelector(store => store.global)
    const dispatch = useDispatch()

    function addAlertFn(alert){
      dispatch(addAlert(alert));
            setTimeout(() => {
      dispatch(removeAlert(alerts.length - 1));
        }, 4000);
    }
    return {addAlertFn}
}

 
   




