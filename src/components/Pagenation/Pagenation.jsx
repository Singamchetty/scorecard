import React from 'react';

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center ">
      <ul className="pagination flex">
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}` }>
            <button onClick={() => onPageChange(number)} className=" w-[22px]  font-bold h-[22px] ">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PaginationComponent;
