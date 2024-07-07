import { configureStore } from "@reduxjs/toolkit";
import classReducer from "./class/classSlice";
import globalUiReducer from "./GlobalUiState";
import teacherReducer from "./teacher/teacherSlice";

import optionsReducer from "./option/optionSclice";

export const store = configureStore({
  reducer: {
    global: globalUiReducer,
    class: classReducer,
    teacher: teacherReducer,
    options: optionsReducer,
  },
});
