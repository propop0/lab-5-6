import React from "react";
import TodoList from "./components/TodoList/TodoList";
import "./App.css";

function App() {
  return (
    <div className="app-root">
      <div className="app-container">
        <TodoList />
      </div>
    </div>
  );
}

export default App;
