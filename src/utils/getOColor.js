import { useSelector } from "react-redux"

export default function useOColor(){
    const {theme:_theme} = useSelector((store)=> store.global)
    let theme;
    if(_theme === 'dark'){
        theme = true
    }else{
        theme = false
    }
    return theme
}
