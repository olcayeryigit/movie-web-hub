import React from 'react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {

    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  
  

  return (
    <div>
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      Previous
    </button>
    {pages.map(page => (
      <button
        key={page}
        onClick={() => onPageChange(page)}
        disabled={currentPage === page}
      >
        {page}
      </button>
    ))}
    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      Next
    </button>
  </div>
  )
}

export default Pagination
