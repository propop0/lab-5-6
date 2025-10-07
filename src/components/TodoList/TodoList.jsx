import React from "react";
import useTodos from "../../hooks/useTodos";
import TodoItem from "../TodoItem/TodoItem";
import AddTodoForm from "../AddTodoForm/AddTodoForm";
import SearchBar from "../SearchBar/SearchBar";
import PaginationControls from "../PaginationControls/PaginationControls";
import "./TodoList.css";

export default function TodoList() {
  const {
    todos,
    isLoading,
    error,
    currentPage,
    limitPerPage,
    totalTodos,
    searchTerm,
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodoTitle,
    setSearchTerm,
    goToNextPage,
    goToPrevPage,
    setLimit,
  } = useTodos();

  return (
    <section className="todo-list-root">
      <div className="add-wrap">
        <AddTodoForm onAdd={(text) => addTodo(text)} />
      </div>

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {isLoading && <div className="status">Loading...</div>}
      {error && <div className="status error">Error: {error.message || String(error)}</div>}

      <div className="items">
        {todos.length === 0 && !isLoading ? (
          <p className="empty">
            {searchTerm ? `No todos found matching "${searchTerm}"` : "No todos — add your first task!"}
          </p>
        ) : (
          todos.map((t) => (
            <TodoItem
              key={t.id}
              id={t.id}
              text={t.text}
              completed={t.completed}
              onDelete={deleteTodo}
              onToggle={toggleTodo}
              onEdit={editTodoTitle}
            />
          ))
        )}
      </div>

      <PaginationControls
        currentPage={currentPage}
        totalTodos={totalTodos}
        limitPerPage={limitPerPage}
        onPrevPage={goToPrevPage}
        onNextPage={goToNextPage}
        onSetLimit={setLimit}
      />
    </section>
  );
}
