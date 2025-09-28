import React, { useState, useEffect } from "react";
import "./TodoItem.css";

export default function TodoItem({ id, text, completed = false, onDelete, onToggle }) {
  const [isCompleted, setIsCompleted] = useState(!!completed);
  useEffect(() => {
    setIsCompleted(!!completed);
  }, [completed]);

  const handleToggle = () => {
    setIsCompleted((s) => !s);
    if (onToggle) onToggle(id);
  };

  const handleDelete = () => {
    if (onDelete) onDelete(id);
  };

  return (
    <div className={`todo-item ${isCompleted ? "completed" : ""}`}>
      <label className="todo-left">
        <input type="checkbox" checked={isCompleted} onChange={handleToggle} />
        <span className="todo-text">{text}</span>
      </label>
      <div className="todo-right">
        <button className="delete-btn" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}
