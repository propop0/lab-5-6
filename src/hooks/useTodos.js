import { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";

const BASE_URL = "https://dummyjson.com";

export default function useTodos() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const todosRef = useRef([]);
  useEffect(() => { todosRef.current = todos; }, [todos]);

  useEffect(() => {
    let cancelled = false;
    const fetchTodos = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${BASE_URL}/todos?limit=15`);
        if (cancelled) return;
        const mapped = res.data.todos.map((t) => ({
          id: t.id,
          text: t.todo,
          completed: !!t.completed,
          isLocal: false,
        }));
        setTodos(mapped);
      } catch (err) {
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchTodos();
    return () => { cancelled = true; };
  }, []);

  const addTodo = useCallback((text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      isLocal: true,
    };
    setTodos((prev) => [newTodo, ...prev]);
  }, []);

  const deleteTodo = useCallback(async (id) => {
    setError(null);
    const item = todosRef.current.find((t) => t.id === id);
    if (!item) return;

    if (item.isLocal) {
      setTodos((prev) => prev.filter((t) => t.id !== id));
      return;
    }

    const prev = todosRef.current;
    setTodos((prevList) => prevList.filter((t) => t.id !== id));
    setIsLoading(true);
    try {
      await axios.delete(`${BASE_URL}/todos/${id}`);
    } catch (err) {
      setTodos(prev);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const toggleTodo = useCallback(async (id) => {
    setError(null);
    const item = todosRef.current.find((t) => t.id === id);
    if (!item) return;

    if (item.isLocal) {
      setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
      return;
    }

    const prev = todosRef.current;
    const newCompleted = !item.completed;

    setTodos((prevList) => prevList.map((t) => (t.id === id ? { ...t, completed: newCompleted } : t)));
    setIsLoading(true);
    try {
      await axios.put(`${BASE_URL}/todos/${id}`, { completed: newCompleted });
    } catch (err) {
      setTodos(prev);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    todos,
    isLoading,
    error,
    addTodo,
    deleteTodo,
    toggleTodo,
  };
}
