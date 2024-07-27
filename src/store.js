import { configureStore } from "@reduxjs/toolkit";
import classReducer from "./class/classSlice";
import globalUiReducer from "./GlobalUiState";
import teacherReducer from "./teacher/teacherSlice";

import optionsReducer from "./option/optionSclice";
import studentReducer from "./students/studentSlice";

export const store = configureStore({
  reducer: {
    global: globalUiReducer,
    class: classReducer,
    teacher: teacherReducer,
    student:studentReducer,
    options: optionsReducer,
  },
});
