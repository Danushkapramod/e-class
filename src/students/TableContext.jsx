import { createContext, useReducer } from 'react';

const initialState = {
  statusOptions: [],
  tempStatusList: [],
  searchQuery: {},
  filterQuery: {},
  paginationQuery: {},
  totalStdOntable: 0,
  addFormIsOpen: false,
  statusFormIsOpen: false,
  selectClassIsOpen: false,
  addClassIsOpen: false,
  selectedList: [],
  selectedClassList: [],
  classData: {},
};

const SET_TEMP_STATUS_LIST = 'SET_TEMP_STATUS_LIST';
const SET_STATUS_OPTIONS = 'SET_STATUS_OPTIONS';
const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
const SET_FILTER_QUERY = 'SET_FILTER_QUERY';
const SET_PAGINATION_QUERY = 'SET_PAGINATION_QUERY';
const SET_ADD_FORM_STATE = 'SET_ADD_FORM_STATE';
const SET_ADD_FORM_STATE2 = 'SET_ADD_FORM_STATE2';
const SET_ADD_CLASS_STATE = 'SET_ADD_CLASS_STATE';
const SET_SELECT_CLASS_STATE = 'SET_SELECT_CLASS_STATE';
const SET_SELECTD_LIST = 'SET_SELECTD_LIST';
const SET_SELECTD_CLASS_LIST = 'SET_SELECTD_CLASS_LIST';
const SET_TOTAl_STD_ON_TABLE = 'SET_TOTAl_STD_ON_TABLE';
const SET_CLASS_DATA = 'SET_CLASS_DAY';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };
    case SET_FILTER_QUERY:
      return { ...state, filterQuery: action.payload };
    case SET_PAGINATION_QUERY:
      return { ...state, paginationQuery: action.payload };
    case SET_TEMP_STATUS_LIST:
      return { ...state, tempStatusList: action.payload };

    case SET_CLASS_DATA:
      return { ...state, classData: action.payload };

    case SET_ADD_FORM_STATE:
      return {
        ...state,
        selectedList: [],
        addClassIsOpen: false,
        addFormIsOpen: action.payload,
        selectedClassList: [],
      };

    case SET_ADD_FORM_STATE2:
      return { ...state, statusFormIsOpen: action.payload };

    case SET_SELECT_CLASS_STATE:
      return { ...state, selectClassIsOpen: action.payload };

    case SET_ADD_CLASS_STATE:
      return { ...state, addClassIsOpen: action.payload };

    case SET_TOTAl_STD_ON_TABLE:
      return { ...state, totalStdOntable: action.payload };

    case SET_STATUS_OPTIONS:
      return { ...state, statusOptions: action.payload };

    case SET_SELECTD_LIST:
      if (action.payload.operation === 'add') {
        return {
          ...state,
          addFormIsOpen: false,
          selectedList: [...state.selectedList, action.payload.item],
          selectedClassList: [],
        };
      } else if (action.payload.operation === 'remove') {
        return {
          ...state,
          selectedList: state.selectedList.filter((item) => item !== action.payload.item),
          addClassIsOpen: state.selectedList.length <= 1 ? false : true,
        };
      } else if (action.payload.operation === 'clear') {
        return {
          ...state,
          selectedList: [],
          addClassIsOpen: false,
          selectedClassList: [],
        };
      } else if (action.payload.operation === 'addAll') {
        return { ...state, selectedList: action.payload.item };
      } else return state;

    case SET_SELECTD_CLASS_LIST:
      if (action.payload.operation === 'add') {
        return {
          ...state,
          selectedClassList: state.selectedClassList.some(
            (item) => item._id === action.payload.item._id
          )
            ? state.selectedClassList
            : [...state.selectedClassList, action.payload.item],
        };
      } else if (action.payload.operation === 'remove') {
        return {
          ...state,
          selectedClassList: state.selectedClassList.filter(
            (item) => item._id !== action.payload.item._id
          ),
        };
      } else return state;
    default:
      return state;
  }
};
const StdTableContext = createContext();

function TableProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateStatusOptions = (options) => {
    dispatch({ type: SET_STATUS_OPTIONS, payload: options });
  };
  const setClassData = (data) => {
    dispatch({ type: SET_CLASS_DATA, payload: data });
  };
  const updateTempStatusList = (list) => {
    dispatch({ type: SET_TEMP_STATUS_LIST, payload: list });
  };
  const updateSearchQuery = (query) => {
    dispatch({ type: SET_SEARCH_QUERY, payload: query });
  };
  const updateFlterhQuery = (query) => {
    dispatch({ type: SET_FILTER_QUERY, payload: query });
  };
  const updatePaginationQuery = (query) => {
    dispatch({ type: SET_PAGINATION_QUERY, payload: query });
  };
  const updateFormState = (state) => {
    dispatch({ type: SET_ADD_FORM_STATE, payload: state });
  };
  const updateStatusForm = (state) => {
    dispatch({ type: SET_ADD_FORM_STATE2, payload: state });
  };
  const updateSelectClassIsOpen = (state) => {
    dispatch({ type: SET_SELECT_CLASS_STATE, payload: state });
  };
  const updateAddClassIsOpen = (state) => {
    dispatch({ type: SET_ADD_CLASS_STATE, payload: state });
  };
  const updateSelectedList = (operation, item) => {
    dispatch({ type: SET_SELECTD_LIST, payload: { operation, item } });
  };
  const updateSelectedClassList = (operation, item) => {
    dispatch({ type: SET_SELECTD_CLASS_LIST, payload: { operation, item } });
  };
  const updateStdOntable = (item) => {
    dispatch({ type: SET_TOTAl_STD_ON_TABLE, payload: item });
  };

  return (
    <StdTableContext.Provider
      value={{
        state,
        updateSearchQuery,
        updateSelectedList,
        updateSelectedClassList,
        updateFormState,
        updateStatusForm,
        updateFlterhQuery,
        updatePaginationQuery,
        updateStdOntable,
        updateStatusOptions,
        updateTempStatusList,
        updateSelectClassIsOpen,
        updateAddClassIsOpen,
        setClassData,
      }}
    >
      {children}
    </StdTableContext.Provider>
  );
}

export { TableProvider, StdTableContext };
