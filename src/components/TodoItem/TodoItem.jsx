import React, { useState, useEffect, useRef } from "react";
import "./TodoItem.css";

export default function TodoItem({ id, text, completed = false, onDelete, onToggle, onEdit }) {
  const [isCompleted, setIsCompleted] = useState(!!completed);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);
  const cancelButtonRef = useRef(null);
  const saveButtonRef = useRef(null);

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
    if (trimmedText) {
      if (onEdit) onEdit(id, trimmedText);
    }
    // Force exit edit mode immediately
    setIsEditing(false);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setEditText(text);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    }
  };

  const handleInputBlur = (e) => {
    // Only handle blur if we're still in editing mode
    if (!isEditing) return;
    
    // Don't save if clicking Cancel or Save buttons
    if (e.relatedTarget === cancelButtonRef.current || e.relatedTarget === saveButtonRef.current) {
      return;
    }
    handleSave();
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
            onBlur={handleInputBlur}
            autoFocus
          />
        ) : (
          <span className="todo-text">{text}</span>
        )}
      </label>
      <div className="todo-right">
        {isEditing ? (
          <>
            <button 
              ref={saveButtonRef}
              className="save-btn" 
              onClick={handleSave}
            >
              Save
            </button>
            <button
              ref={cancelButtonRef}
              className="cancel-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>
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
