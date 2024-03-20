import React from 'react';
import LeftIcon from '../../assets/icons/leftIcon';
import RightIcon from '../../assets/icons/rightIcon';

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center my-2">
      <ul className="pagination flex">
        <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage-1)} className='mr-2 hover:bg-blue-400 border rounded disabled:bg-gray-200'><LeftIcon /></button>
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}` }>
            <button onClick={() => onPageChange(number)} className=" w-[22px]  font-bold h-[22px] ">
              {number}
            </button>
          </li>
        ))}
        <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage+1)} className='ml-2 hover:bg-blue-400 border rounded disabled:bg-gray-200'><RightIcon/></button>
      </ul>
    </nav>
  );
};

export default PaginationComponent;
