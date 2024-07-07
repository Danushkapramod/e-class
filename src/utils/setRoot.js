import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setRootName } from "../GlobalUiState";

export default function useSetRoot(rootName) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setRootName(rootName));
  }, [dispatch, rootName]);
}
