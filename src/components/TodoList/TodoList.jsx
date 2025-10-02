import React from "react";
import useTodos from "../../hooks/useTodos";
import TodoItem from "../TodoItem/TodoItem";
import AddTodoForm from "../AddTodoForm/AddTodoForm";
import "./TodoList.css";

export default function TodoList() {
  const { todos, isLoading, error, addTodo, deleteTodo, toggleTodo } = useTodos();

  return (
    <section className="todo-list-root">
      {/* <h2 className="title">Todo list</h2> */}

      <div className="add-wrap">
        <AddTodoForm onAdd={(text) => addTodo(text)} />
      </div>

      {isLoading && <div className="status">Loading...</div>}
      {error && <div className="status error">Error: {error.message || String(error)}</div>}

      <div className="items">
        {todos.length === 0 && !isLoading ? (
          <p className="empty">No todos — add your first task!</p>
        ) : (
          todos.map((t) => (
            <TodoItem
              key={t.id}
              id={t.id}
              text={t.text}
              completed={t.completed}
              onDelete={deleteTodo}
              onToggle={toggleTodo}
            />
          ))
        )}
      </div>
    </section>
  );
}
