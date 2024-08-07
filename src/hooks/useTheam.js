import { useSelector } from "react-redux";


function useTheam(){
    const { theme} = useSelector((store)=>store.global)
  return theme
}

export default useTheam;