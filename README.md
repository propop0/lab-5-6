

```mermaid
classDiagram
  class App {
    renders TodoList
  }

  class TodoList {
    uses useTodos
    renders AddTodoForm, SearchBar, TodoItem[], PaginationControls
  }

  class useTodos {
    state: todos[], isLoading, error
    state: currentPage, limitPerPage, totalTodos
    state: searchTerm
  }

  class AddTodoForm {
    state: text
    props: onAdd
  }

  class SearchBar {
    props: searchTerm, onSearchChange
  }

  class TodoItem {
    state: isCompleted, isEditing, editText
    refs: cancelButtonRef, saveButtonRef
    props: id, text, completed, onDelete, onToggle, onEdit
  }

  class PaginationControls {
    props: currentPage, totalTodos, limitPerPage, onPrevPage, onNextPage, onSetLimit
  }

  App --> TodoList
  TodoList --> useTodos : hook
  TodoList --> AddTodoForm : onAdd ↓
  TodoList --> SearchBar : searchTerm, onSearchChange ↓
  TodoList --> TodoItem : id, text, completed, onToggle, onDelete, onEdit ↓
  TodoList --> PaginationControls : currentPage, totalTodos, limitPerPage, onPrevPage, onNextPage, onSetLimit ↓
  AddTodoForm ..> TodoList : onAdd(text) ↑
  SearchBar ..> TodoList : onSearchChange(term) ↑
  TodoItem ..> TodoList : onToggle(id), onDelete(id), onEdit(id, newTitle) ↑
  PaginationControls ..> TodoList : onPrevPage(), onNextPage(), onSetLimit(limit) ↑
```
```
### Design Patterns Used:

Custom Hook Pattern;

Container/Presentational Pattern;

Composition Root Pattern;

Props Down, Events Up;

Optimistic Updates;

Controlled Components Pattern;

Memoization Pattern;

Separation of Concerns;

Single Responsibility Principle;

Lifting State Up.

```