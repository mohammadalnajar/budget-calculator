import React from 'react';
import { MdSend } from 'react-icons/md';
const ExpenseForm = ({
  charge,
  amount,
  handleAmount,
  handleCharge,
  submitForm,
}) => {
  return (
    <form onSubmit={submitForm}>
      <div className='form-center'>
        <div className='form-group'>
          <label htmlFor='charge'>Charge</label>
          <input
            onChange={handleCharge}
            type='text'
            name='charge'
            id='charge'
            className='form-control'
            placeholder='e.g rent'
            value={charge}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='amount' id='amount'>
            Amount
          </label>
          <input
            onChange={handleAmount}
            type='number'
            name='amount'
            id='amount'
            className='form-control'
            placeholder='e.g 1000'
            value={amount}
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
