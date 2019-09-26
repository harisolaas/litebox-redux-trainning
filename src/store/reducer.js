import * as actionTypes from "./actionTypes";
import { combineReducers } from "redux";

const VisibilityFilters = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_COMPLETED: "SHOW_COMPLETED",
  SHOW_ACTIVE: "SHOW_ACTIVE"
};

const persistedState = JSON.parse(localStorage.getItem("state"));
const persistedTodos = persistedState && persistedState.todos;
const persistedVisibilityFilter =
  persistedState && persistedState.visibilityFilter;

const todosInitialState = persistedTodos || [
  { text: "Preparar capacitación de Redux", completed: true },
  { text: "Dar capacitación de Redux", completed: false },
  {
    text: "Hacer un chiste y que todos se rían durante la capacitación",
    completed: false
  }
];

const visibilityFilterInitialState =
  persistedVisibilityFilter || VisibilityFilters.SHOW_ALL;

function visibilityFilter(state = visibilityFilterInitialState, action) {
  switch (action.type) {
    case actionTypes.SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}

function todos(state = todosInitialState, action) {
  switch (action.type) {
    case actionTypes.ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ];
    case actionTypes.TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          });
        }
        return todo;
      });
    default:
      return state;
  }
}

const todoApp = combineReducers({
  visibilityFilter,
  todos
});

export default todoApp;
