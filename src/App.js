import './App.css';
import React, { useState } from 'react';
import Alert from './components/Alert';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import { v4 as uuidv4 } from 'uuid';

const initialExpenses = [
  {
    id: uuidv4(),
    charge: 'rent',
    amount: 1500,
  },
  {
    id: uuidv4(),
    charge: 'car payment',
    amount: 500,
  },
  {
    id: uuidv4(),
    charge: 'credit card bill',
    amount: 500,
  },
];
function App() {
  const [expenses, setExpenses] = useState(initialExpenses);

  return (
    <>
      <Alert />
      <h1>Budget calculator</h1>
      <main className='App'>
        <ExpenseForm />
        <ExpenseList expenses={expenses} />
      </main>
      <h1>
        Total Spending:
        <span className='total'>
          ${''}
          {expenses.reduce((acc, curr) => {
            return (acc += curr.amount);
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
