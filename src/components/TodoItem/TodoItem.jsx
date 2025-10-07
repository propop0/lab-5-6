import React, { useState, useEffect } from "react";
import "./TodoItem.css";

export default function TodoItem({ id, text, completed = false, onDelete, onToggle, onEdit }) {
  const [isCompleted, setIsCompleted] = useState(!!completed);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  useEffect(() => {
    setIsCompleted(!!completed);
  }, [completed]);

  useEffect(() => {
    setEditText(text);
  }, [text]);

  const handleToggle = () => {
    setIsCompleted((s) => !s);
    if (onToggle) onToggle(id);
  };

  const handleDelete = () => {
    if (onDelete) onDelete(id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const trimmedText = editText.trim();
    if (trimmedText && trimmedText !== text) {
      if (onEdit) onEdit(id, trimmedText);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(text);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className={`todo-item ${isCompleted ? "completed" : ""}`}>
      <label className="todo-left">
        <input type="checkbox" checked={isCompleted} onChange={handleToggle} />
        {isEditing ? (
          <input
            type="text"
            className="edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyPress}
            onBlur={handleSave}
            autoFocus
          />
        ) : (
          <span className="todo-text">{text}</span>
        )}
      </label>
      <div className="todo-right">
        {isEditing ? (
          <>
            <button className="save-btn" onClick={handleSave}>Save</button>
            <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
          </>
        ) : (
          <>
            <button className="edit-btn" onClick={handleEdit}>Edit</button>
            <button className="delete-btn" onClick={handleDelete}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
}
