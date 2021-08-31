import React from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
const ExpenseItem = ({ expense, handleClearOne }) => {
  const { id, amount, charge } = expense;
  return (
    <li className='item'>
      <div className='info'>
        <span className='expense'>{charge}</span>
        <span className='amount'>${amount}</span>
      </div>
      <div>
        <button className='edit-btn' aria-label='edit button'>
          <MdEdit />
        </button>
        <button
          onClick={() => handleClearOne(id)}
          className='clear-btn'
          aria-label='delete button'
        >
          <MdDelete />
        </button>
      </div>
    </li>
  );
};
export default ExpenseItem;
