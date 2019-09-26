import * as actionTypes from "./actionTypes";

export const addTodo = text => {
  return { type: actionTypes.ADD_TODO, text };
};

export const toggleTodo = index => {
  return { type: actionTypes.TOGGLE_TODO, index };
};

export const setVisibilityFilter = filter => {
  return { type: actionTypes.SET_VISIBILITY_FILTER, filter };
};
