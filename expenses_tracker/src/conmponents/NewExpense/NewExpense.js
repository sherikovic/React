import React, { useState } from "react";
import './NewExpense.css'
import ExpenseForm from "./ExpenseForm";

const NewExpense = (props) => {
    const saveExpenseDataHandler = (enteredExpenseData) => {
        const expenseData = {
            ...enteredExpenseData,
            id: Math.random().toString()
        };
        props.onAddExpense(expenseData);
        setFormOpen(false);
    };

    const [formOpen, setFormOpen] = useState(false);
    const addNewExpenseHandler = () => {
        setFormOpen(true);
    }
    const stopAddingHandler = () => {
        setFormOpen(false);
    }

    let content;
    formOpen ?
        content = <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} onCancel={stopAddingHandler} /> :
        content = <button onClick={addNewExpenseHandler}>AddNewExpense</button>

    return (
        <div className="new-expense">
            {content}
        </div>
    )
}

export default NewExpense;