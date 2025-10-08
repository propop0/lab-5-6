import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import axios from "axios";

const BASE_URL = "https://dummyjson.com";

export default function useTodos() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(10);
  const [totalTodos, setTotalTodos] = useState(0);

  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  const todosRef = useRef([]);
  useEffect(() => { todosRef.current = todos; }, [todos]);

  // Calculate skip value for pagination
  const skip = (currentPage - 1) * limitPerPage;

  useEffect(() => {
    let cancelled = false;
    const fetchTodos = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${BASE_URL}/todos?limit=${limitPerPage}&skip=${skip}`);
        if (cancelled) return;
        const mapped = res.data.todos.map((t) => ({
          id: t.id,
          text: t.todo,
          completed: !!t.completed,
          isLocal: false,
        }));
        setTodos(mapped);
        setTotalTodos(res.data.total);
      } catch (err) {
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchTodos();
    return () => { cancelled = true; };
  }, [currentPage, limitPerPage, skip]);

  // Pagination functions
  const goToNextPage = useCallback(() => {
    const totalPages = Math.ceil(totalTodos / limitPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  }, [currentPage, totalTodos, limitPerPage]);

  const goToPrevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  }, [currentPage]);

  const setLimit = useCallback((limit) => {
    setLimitPerPage(limit);
    setCurrentPage(1); // Reset to first page when changing limit
  }, []);

  // Search functionality - filter todos based on search term
  const filteredTodos = useMemo(() => {
    if (!searchTerm.trim()) return todos;
    return todos.filter(todo =>
      todo.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [todos, searchTerm]);

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

  const editTodoTitle = useCallback(async (id, newTitle) => {
    setError(null);
    const item = todosRef.current.find((t) => t.id === id);
    if (!item) return;

    // Always update the local state first
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text: newTitle } : t)));

    // If it's a local todo, we're done
    if (item.isLocal) {
      return;
    }

    // For API todos, make the API call
    const prev = todosRef.current;
    setIsLoading(true);
    try {
      await axios.put(`${BASE_URL}/todos/${id}`, { todo: newTitle });
    } catch (err) {
      setTodos(prev);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    // Data
    todos: filteredTodos,
    isLoading,
    error,

    // Pagination
    currentPage,
    limitPerPage,
    totalTodos,
    goToNextPage,
    goToPrevPage,
    setLimit,

    // Search
    searchTerm,
    setSearchTerm,

    // CRUD operations
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodoTitle,
  };
}
