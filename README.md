# Enhanced To-Do List Application

A React application demonstrating advanced state management, custom hooks, and component architecture with search, pagination, and editing functionality.

## Features

- ✅ **CRUD Operations**: Create, Read, Update, Delete todos
- 🔍 **Client-side Search**: Real-time filtering of todos by title
- 📄 **Pagination**: Navigate through todos with configurable page sizes
- ✏️ **Inline Editing**: Edit todo titles directly in the list
- 🎨 **Modern UI**: Glassmorphism design with smooth animations
- 🔄 **API Integration**: Uses DummyJSON API for data persistence

## Component Tree & Data Flow

```
                    ┌─────────────────────────────────────┐
                    │            App Component            │
                    │        (Composition Root)           │
                    └─────────────────┬───────────────────┘
                                      │
                    ┌─────────────────▼───────────────────┐
                    │          TodoList Component          │
                    │        (Container Component)          │
                    │         Uses: useTodos hook           │
                    └─────────────────┬───────────────────┘
                                      │
                    ┌─────────────────┼───────────────────┐
                    │                  │                   │
        ┌───────────▼──────────┐ ┌─────▼─────┐ ┌───────────▼──────────┐
        │    AddTodoForm       │ │SearchBar  │ │   PaginationControls  │
        │   Props: onAdd       │ │Props:     │ │   Props: currentPage,  │
        │                      │ │searchTerm,│ │   totalTodos,          │
        │                      │ │onSearch   │ │   onPrevPage, etc.    │
        └──────────────────────┘ └───────────┘ └───────────────────────┘
                                      │
                    ┌─────────────────▼───────────────────┐
                    │         TodoItem Components         │
                    │      (Presentational Components)    │
                    │   Props: id, text, completed,       │
                    │   onDelete, onToggle, onEdit        │
                    │   Local State: isEditing, editText   │
                    └─────────────────────────────────────┘

                    ┌─────────────────────────────────────┐
                    │         useTodos Hook               │
                    │      (Data Logic Layer)             │
                    └─────────────────┬───────────────────┘
                                      │
                    ┌─────────────────┼───────────────────┐
                    │                  │                   │
        ┌───────────▼──────────┐ ┌─────▼─────┐ ┌───────────▼──────────┐
        │   State Management   │ │API Ops   │ │   Business Logic      │
        │   • todos           │ │• GET     │ │   • Pagination calc   │
        │   • isLoading       │ │• PUT     │ │   • Search filtering   │
        │   • error           │ │• DELETE  │ │   • Optimistic updates │
        │   • pagination      │ │          │ │                        │
        │   • searchTerm      │ │          │ │                        │
        └──────────────────────┘ └──────────┘ └───────────────────────┘
```

### Visual Data Flow

```
User Interaction → Component → Callback → useTodos Hook → API Call → State Update → Re-render
     ↑                                                                              │
     └─────────────────── Props Flow ←─────────────────────────────────────────────┘
```

### Data Flow Description

1. **Downward Data Flow (Props)**: All data flows down from the `useTodos` hook through the component tree via props
2. **Upward Event Flow (Callbacks)**: User interactions bubble up through callback functions to the hook
3. **State Encapsulation**: All data logic is contained within the `useTodos` custom hook
4. **Separation of Concerns**: UI components are purely presentational, hook handles all business logic

## Design Patterns Used

### 1. **Custom Hook Pattern**
- **Purpose**: Encapsulates complex state management and side effects
- **Implementation**: `useTodos` hook manages all data operations, API calls, and business logic
- **Benefits**: Reusable logic, separation of concerns, easier testing

### 2. **Container/Presentational Pattern**
- **Container**: `TodoList` component manages data flow and orchestrates child components
- **Presentational**: `TodoItem`, `SearchBar`, `PaginationControls` are pure UI components
- **Benefits**: Clear separation between data logic and UI rendering

### 3. **Composition Root Pattern**
- **Implementation**: `App` component serves as the composition root
- **Purpose**: Assembles the component tree without managing state
- **Benefits**: Clean architecture, easy to test and modify

### 4. **Props Down, Events Up Pattern**
- **Data Flow**: Props flow down from parent to child components
- **Event Flow**: Callback functions bubble up from child to parent
- **Benefits**: Predictable data flow, easy to debug

### 5. **Optimistic Updates Pattern**
- **Implementation**: UI updates immediately, reverts on API failure
- **Benefits**: Better user experience, responsive interface
- **Example**: Todo completion toggles instantly, reverts if API call fails

### 6. **Controlled Components Pattern**
- **Implementation**: All form inputs are controlled by React state
- **Benefits**: Predictable behavior, easy validation, better debugging

### 7. **Memoization Pattern**
- **Implementation**: `useMemo` for filtered todos, `useCallback` for event handlers
- **Benefits**: Performance optimization, prevents unnecessary re-renders

## API Integration

The application integrates with the DummyJSON API:

- **GET** `/todos?limit={limit}&skip={skip}` - Fetch paginated todos
- **PUT** `/todos/{id}` - Update todo (completion status or title)
- **DELETE** `/todos/{id}` - Delete todo

### Pagination Implementation
- Uses `limit` and `skip` query parameters
- Calculates skip value: `(currentPage - 1) * limitPerPage`
- Maintains total count for pagination controls

### Search Implementation
- Client-side filtering of current page data
- Case-insensitive matching against todo titles
- Real-time filtering as user types

## State Management Architecture

### useTodos Hook State Structure
```javascript
{
  // Data
  todos: Todo[],
  isLoading: boolean,
  error: Error | null,
  
  // Pagination
  currentPage: number,
  limitPerPage: number,
  totalTodos: number,
  
  // Search
  searchTerm: string,
  
  // Functions
  goToNextPage: () => void,
  goToPrevPage: () => void,
  setLimit: (limit: number) => void,
  setSearchTerm: (term: string) => void,
  addTodo: (text: string) => void,
  deleteTodo: (id: number) => void,
  toggleTodo: (id: number) => void,
  editTodoTitle: (id: number, newTitle: string) => void
}
```

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/
│   ├── AddTodoForm/          # Form for adding new todos
│   ├── PaginationControls/    # Pagination navigation and controls
│   ├── SearchBar/            # Search input component
│   ├── TodoItem/             # Individual todo item with edit functionality
│   └── TodoList/             # Main container component
├── hooks/
│   └── useTodos.js           # Custom hook for all data operations
├── App.jsx                   # Composition root
└── main.jsx                  # Application entry point
```

## Key Learning Outcomes

This project demonstrates mastery of:

1. **Custom Hooks**: Abstracting complex logic into reusable functions
2. **State Management**: Managing multiple related states in a single hook
3. **API Integration**: Handling asynchronous operations with proper error handling
4. **Component Architecture**: Building maintainable, scalable React applications
5. **Design Patterns**: Implementing proven patterns for better code organization
6. **Performance Optimization**: Using memoization and efficient re-rendering strategies

## Technical Highlights

- **Error Handling**: Comprehensive error states with user feedback
- **Loading States**: Proper loading indicators during API operations
- **Accessibility**: Keyboard navigation support (Enter/Escape for editing)
- **Responsive Design**: Mobile-friendly interface with modern CSS
- **Type Safety**: Consistent prop interfaces and data structures
- **Performance**: Optimized re-renders with proper dependency arrays