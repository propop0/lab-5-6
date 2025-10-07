import React from "react";
import "./PaginationControls.css";

export default function PaginationControls({
  currentPage,
  totalTodos,
  limitPerPage,
  onPrevPage,
  onNextPage,
  onSetLimit
}) {
  const totalPages = Math.ceil(totalTodos / limitPerPage);
  const startItem = (currentPage - 1) * limitPerPage + 1;
  const endItem = Math.min(currentPage * limitPerPage, totalTodos);

  return (
    <div className="pagination-controls">
      <div className="pagination-info">
        <span>
          Showing {startItem}-{endItem} of {totalTodos} todos
        </span>
        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>
      </div>

      <div className="pagination-buttons">
        <button
          className="pagination-btn"
          onClick={onPrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <select
          className="limit-select"
          value={limitPerPage}
          onChange={(e) => onSetLimit(Number(e.target.value))}
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={15}>15 per page</option>
          <option value={20}>20 per page</option>
        </select>

        <button
          className="pagination-btn"
          onClick={onNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

