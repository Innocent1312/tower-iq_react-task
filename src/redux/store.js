import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import getUsers from "../api/getUsers";

const START_LOAD = 'START_LOAD';
const HANDLE_SUCCESS = 'HANDLE_SUCCESS';
const HANDLE_ERROR = 'HANDLE_ERROR';
const SET_PAGE = 'SET_PAGE';

export const startLoad = () => ({ type: START_LOAD });
export const handleError = () => ({ type: HANDLE_ERROR });
export const setPage = (page)  => ({
  type: SET_PAGE,
  page,
});

export const handleSuccess = usersList => ({
  type: HANDLE_SUCCESS, usersList,
});

export const loadUsers = () => async(dispatch) => {
  dispatch(startLoad());

  try {
    const data = await getUsers();
    dispatch(handleSuccess(data))
  }
  catch (e) {
    dispatch(handleError())
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case START_LOAD:
      return {
        ...state,
        isLoading: true,
      };

    case HANDLE_SUCCESS:
      return {
        ...state,
        usersList: action.usersList,
        isLoaded: true,
      };

    case HANDLE_ERROR:
      return {
        ...state,
        isLoaded: false,
        isError: true
      };

    case SET_PAGE:
      return {
        ...state,
        page: action.page,
      };

    default:
      return state;
  }
};

const initialState = {
  usersList: {},
  isLoaded: false,
  isLoading: false,
  isError: false,
  page: 1,
};

const store = createStore(reducer, initialState, applyMiddleware(thunk));

export default store;