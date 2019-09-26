import React, { useState } from "react";
import { connect } from "react-redux";

import "./App.css";

import * as actions from "./store/actions";

const App = props => {
  const {
    todos,
    visibilityFilter,
    addTodo,
    toggleTodo,
    setVisibilityFilter
  } = props;

  const [value, setValue] = useState("");

  const handleClick = () => {
    addTodo(value);
    setValue("");
  };

  return (
    <div className="App">
      <h1>Redux trainning</h1>
      <h2>Todo list</h2>
      <div className="FiltersContainer">
        <a
          className={`Filter ${visibilityFilter === "SHOW_ALL" && "Active"}`}
          onClick={() => setVisibilityFilter("SHOW_ALL")}
        >
          Show All
        </a>
        <a
          className={`Filter ${visibilityFilter === "SHOW_COMPLETED" &&
            "Active"}`}
          onClick={() => setVisibilityFilter("SHOW_COMPLETED")}
        >
          Show Completed
        </a>
        <a
          className={`Filter ${visibilityFilter === "SHOW_ACTIVE" && "Active"}`}
          onClick={() => setVisibilityFilter("SHOW_ACTIVE")}
        >
          Show Active
        </a>
      </div>

      <div className="TodosContainer">
        {todos
          .filter(todo => {
            switch (visibilityFilter) {
              case "SHOW_COMPLETED":
                return todo.completed;
              case "SHOW_ACTIVE":
                return !todo.completed;

              default:
                return true;
            }
          })
          .map((todo, index) => (
            <div
              className={`TodoCard ${todo.completed && "Completed"}`}
              onClick={() => toggleTodo(index)}
            >
              <p>{todo.text}</p>
              <div>
                Status:{" "}
                <strong>{todo.completed ? "Completed" : "Active"}</strong>
              </div>
            </div>
          ))}
      </div>
      <div className="InputContainer">
        <textarea
          value={value}
          placeholder="Agregar todo..."
          onChange={e => setValue(e.target.value)}
        />
        <a className="AddButton" onClick={handleClick}>
          Agregar
        </a>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  todos: state.todos,
  visibilityFilter: state.visibilityFilter
});

const mapDispatchToProps = dispatch => ({
  addTodo: text => dispatch(actions.addTodo(text)),
  toggleTodo: index => dispatch(actions.toggleTodo(index)),
  setVisibilityFilter: filter => dispatch(actions.setVisibilityFilter(filter))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
