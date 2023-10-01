import React, { useState } from "react";
import "./todo.css";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([...todos, { text: inputValue.trim(), done: false }]);
      setInputValue("");
    }
  };

  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleToggleDone = (index) => {
    const newTodos = [...todos];
    newTodos[index].done = !newTodos[index].done;
    setTodos(newTodos);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") {
      return true;
    } else if (filter === "done") {
      return todo.done;
    } else {
      return !todo.done;
    }
  });

  const handleEditTodo = (index, newText) => {
    const newTodos = [...todos];
    newTodos[index].text = newText;
    setTodos(newTodos);
  };

  return (
    <div className="todo_body">
      <div className="contant">
        <h1>Todo List</h1>
        <div className="search">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="search_input"
          />
          <button onClick={handleAddTodo} className="add_to_do">
            Add Todo
          </button>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="filter"
              value="all"
              checked={filter === "all"}
              onChange={handleFilterChange}
            />
            All
          </label>
          <label>
            <input
              type="radio"
              name="filter"
              value="done"
              checked={filter === "done"}
              onChange={handleFilterChange}
            />
            Done
          </label>
          <label>
            <input
              type="radio"
              name="filter"
              value="not-done"
              checked={filter === "not-done"}
              onChange={handleFilterChange}
            />
            Not Done
          </label>
        </div>
        <ul>
          {filteredTodos.map((todo, index) => (
            <li key={index} className="list">
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => handleToggleDone(index)}
              />
              {todo.done ? <del>{todo.text}</del> : <span>{todo.text}</span>}
              <div className="buttons">
              <button
                onClick={() => handleDeleteTodo(index)}
                className="Delate"
              >
                Delete
              </button>
              <button
                onClick={() =>
                  handleEditTodo(index, prompt("Enter new text", todo.text))
                }
                className="edit"
              >
                Edit
              </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
