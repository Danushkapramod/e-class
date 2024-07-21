import toast from "react-hot-toast";

export function renewTokenMsg(){
    return toast("Token expired. Please renew your session and try again.", {
        icon:'⚠️',
        style: {
          padding:'8px',
          display:"flex",
          justifyContent:"center",
          color: '#856404',
        } } )
}