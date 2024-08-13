import { createContext, useReducer } from 'react';

const initialState = {
  searchQuery: '',
  filterQuery: '',
  paginationQuery: '',
  totalStdOntable: 0,
  addFormIsOpen: false,
  selectedList: [],
};

const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
const SET_FILTER_QUERY = 'SET_FILTER_QUERY';
const SET_PAGINATION_QUERY = 'SET_PAGINATION_QUERY';
const SET_ADD_FORM_STATE = 'SET_ADD_FORM_STATE';
const SET_SELECTD_LIST = 'SET_SELECTD_LIST';
const SET_TOTAl_STD_ON_TABLE = 'SET_TOTAl_STD_ON_TABLE';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };

    case SET_FILTER_QUERY:
      return { ...state, filterQuery: action.payload };

    case SET_ADD_FORM_STATE:
      return { ...state, addFormIsOpen: action.payload };

    case SET_PAGINATION_QUERY:
      return { ...state, paginationQuery: action.payload };

    case SET_TOTAl_STD_ON_TABLE:
      return { ...state, totalStdOntable: action.payload };

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
const AllStdTableContext = createContext();

function TableProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

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
  const updateSelectedList = (operation, item) => {
    dispatch({ type: SET_SELECTD_LIST, payload: { operation, item } });
  };
  const updateStdOntable = (item) => {
    dispatch({ type: SET_TOTAl_STD_ON_TABLE, payload: item });
  };

  return (
    <AllStdTableContext.Provider
      value={{
        state,
        updateSearchQuery,
        updateSelectedList,
        updateFormState,
        updateFlterhQuery,
        updatePaginationQuery,
        updateStdOntable,
      }}
    >
      {children}
    </AllStdTableContext.Provider>
  );
}

export { TableProvider, AllStdTableContext };
