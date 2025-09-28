import React, { useState } from "react";
import "./AddTodoForm.css";

export default function AddTodoForm({ onAdd }) {
  const [text, setText] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    onAdd(t);
    setText("");
  };

  return (
    <form className="add-todo-form" onSubmit={submit}>
      <input
        className="add-todo-input"
        placeholder="Add a new todo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="add-todo-btn" type="submit">Add</button>
    </form>
  );
}
