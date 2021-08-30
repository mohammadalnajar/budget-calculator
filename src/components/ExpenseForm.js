import React from 'react';
import { MdSend } from 'react-icons/md';
const ExpenseForm = () => {
  return (
    <form>
      <div className='form-center'>
        <div className='form-group'>
          <label htmlFor='charge'>Charge</label>
          <input
            type='text'
            name='charge'
            id='charge'
            className='form-control'
            placeholder='e.g rent'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='amount' id='amount'>
            Amount
          </label>
          <input
            type='number'
            name='amount'
            id='amount'
            className='form-control'
            placeholder='e.g 1000'
          />
        </div>
      </div>
      <button type='submit' className='btn'>
        Submit <MdSend className='btn-icon' />
      </button>
    </form>
  );
};
export default ExpenseForm;
