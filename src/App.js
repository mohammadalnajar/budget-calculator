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
  const [charge, setCharge] = useState('');
  const [amount, setAmount] = useState('');
  const [alert, setAlert] = useState({ show: false, type: '', text: '' });
  function handleCharge(e) {
    setCharge(e.target.value);
  }
  function handleAmount(e) {
    setAmount(+e.target.value);
  }
  function handleAlert({ type, text }) {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 6000);
  }
  function submitForm(e) {
    e.preventDefault();
    const characters = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    if (
      !characters.test(charge) &&
      /^[a-zA-Z\s]*$/.test(charge) &&
      charge !== '' &&
      typeof charge !== 'number' &&
      amount > 0
    ) {
      setExpenses((prevState) => {
        return [
          ...prevState,
          {
            id: uuidv4(),
            charge,
            amount,
          },
        ];
      });
      setAmount('');
      setCharge('');
      handleAlert({ type: 'success', text: 'operation is done successfully' });
    } else {
      handleAlert({
        type: 'danger',
        text: `Special characters like these: ${characters} or numbers are not allowed in the charge field and amount should be bigger than zero`,
      });
    }
  }

  // clear all items
  function handleClearAll() {
    setExpenses([]);
  }
  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}

      <h1>Budget calculator</h1>
      <main className='App'>
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          submitForm={submitForm}
        />
        <ExpenseList handleClearAll={handleClearAll} expenses={expenses} />
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
