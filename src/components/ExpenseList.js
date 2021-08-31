import React from 'react';
import Item from './ExpenseItem';
import { MdDelete } from 'react-icons/md';
const ExpenseList = ({
  expenses,
  handleClearAll,
  handleClearOne,
  handleEditItem,
  edit,
}) => {
  return (
    <>
      <ul className='list'>
        {expenses.map((expense) => {
          return (
            <Item
              key={expense.id}
              expense={expense}
              handleClearOne={handleClearOne}
              handleEditItem={handleEditItem}
              edit={edit}
            />
          );
        })}
      </ul>
      {expenses.length > 0 && (
        <button onClick={handleClearAll} className='btn'>
          Clear expenses
          <MdDelete className='btn-icon' />
        </button>
      )}
    </>
  );
};
export default ExpenseList;
