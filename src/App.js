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
  const [edit, setEdit] = useState({ status: false, id: '' });
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

    if (inputIsValid(charge, amount)) {
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
    handleAlert({ type: 'danger', text: 'All expenses are deleted' });
  }
  // clear one item
  function handleClearOne(id) {
    setExpenses(() => {
      return expenses.filter((exp) => exp.id !== id);
    });
    handleAlert({ type: 'danger', text: `Selected expense is deleted ` });
  }
  // edit one item
  function handleEditItem(id) {
    setEdit({ status: true, id });
    const tempExpense = expenses.filter((exp) => exp.id === id);
    setAmount(tempExpense[0].amount);
    setCharge(tempExpense[0].charge);
  }
  // submit edit
  function submitEdit(id, e) {
    e.preventDefault();
    const characters = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;

    if (inputIsValid(charge, amount)) {
      const editedExpenses = expenses.map((exp) => {
        return exp.id === id ? { ...exp, charge, amount } : exp;
      });
      setExpenses(editedExpenses);
      setAmount('');
      setCharge('');
      setEdit({ status: false });
      handleAlert({ type: 'success', text: 'operation is done successfully' });
    } else {
      handleAlert({
        type: 'danger',
        text: `Special characters like these: ${characters} or numbers are not allowed in the charge field and amount should be bigger than zero`,
      });
    }
  }
  function inputIsValid(charge, amount) {
    const characters = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    if (
      !characters.test(charge) &&
      /^[a-zA-Z\s]*$/.test(charge) &&
      charge !== '' &&
      typeof charge !== 'number' &&
      amount > 0
    ) {
      return true;
    } else {
      return false;
    }
  }
  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}

      <h1>Budget calculator</h1>
      <main className='App'>
        <ExpenseForm
          expenses={expenses}
          charge={charge}
          amount={amount}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          submitForm={submitForm}
          submitEdit={submitEdit}
          editState={edit}
        />
        <ExpenseList
          handleClearOne={handleClearOne}
          handleClearAll={handleClearAll}
          handleEditItem={handleEditItem}
          edit={edit}
          expenses={expenses}
        />
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
