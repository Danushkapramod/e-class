import { createContext, useReducer } from 'react';
const initialState = {
  statusOptions: [],
  tempStatusList: [],
  searchQuery: '',
  filterQuery: '',
  paginationQuery: '',
  query: '',
  totalStdOntable: 0,
  addFormIsOpen: false,
  statusFormIsOpen: false,
  selectedList: [],
  classData: {},
};
const SET_TEMP_STATUS_LIST = 'SET_TEMP_STATUS_LIST';
const SET_STATUS_OPTIONS = 'SET_STATUS_OPTIONS';
const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
const SET_FILTER_QUERY = 'SET_FILTER_QUERY';
const SET_PAGINATION_QUERY = 'SET_PAGINATION_QUERY';
const SET_ADD_FORM_STATE = 'SET_ADD_FORM_STATE';
const SET_ADD_FORM_STATE2 = 'SET_ADD_FORM_STATE2';
const SET_SELECTD_LIST = 'SET_SELECTD_LIST';
const SET_TOTAl_STD_ON_TABLE = 'SET_TOTAl_STD_ON_TABLE';
const SET_CLASS_DATA = 'SET_CLASS_DAY';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload,
        query: [action.payload, state.filterQuery, state.paginationQuery]
          .filter((query) => query && query.split('=')[1] !== 'undefined')
          .join('&'),
      };

    case SET_FILTER_QUERY:
      return {
        ...state,
        filterQuery: action.payload,
        query: [state.searchQuery, action.payload, state.paginationQuery]
          .filter((query) => query && query.split('=')[1] !== 'undefined')
          .join('&'),
      };

    case SET_PAGINATION_QUERY:
      return {
        ...state,
        paginationQuery: action.payload,
        query: [state.searchQuery, state.filterQuery, action.payload]
          .filter((query) => query && query.split('=')[1] !== 'undefined')
          .join('&'),
      };
    case SET_TEMP_STATUS_LIST:
      return { ...state, tempStatusList: action.payload };

    case SET_CLASS_DATA:
      return { ...state, classData: action.payload };

    case SET_ADD_FORM_STATE:
      return { ...state, addFormIsOpen: action.payload };

    case SET_ADD_FORM_STATE2:
      return { ...state, statusFormIsOpen: action.payload };

    case SET_TOTAl_STD_ON_TABLE:
      return { ...state, totalStdOntable: action.payload };

    case SET_STATUS_OPTIONS:
      return { ...state, statusOptions: action.payload };

    case SET_SELECTD_LIST:
      if (action.payload.operation === 'add') {
        return { ...state, selectedList: [...state.selectedList, action.payload.item] };
      } else if (action.payload.operation === 'remove') {
        return {
          ...state,
          selectedList: state.selectedList.filter((item) => item !== action.payload.item),
        };
      } else if (action.payload.operation === 'clear') {
        return { ...state, selectedList: [] };
      } else if (action.payload.operation === 'addAll') {
        return { ...state, selectedList: action.payload.item };
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
  const updateSelectedList = (operation, item) => {
    dispatch({ type: SET_SELECTD_LIST, payload: { operation, item } });
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
        updateFormState,
        updateStatusForm,
        updateFlterhQuery,
        updatePaginationQuery,
        updateStdOntable,
        updateStatusOptions,
        updateTempStatusList,
        setClassData,
      }}
    >
      {children}
    </StdTableContext.Provider>
  );
}

export { TableProvider, StdTableContext };
