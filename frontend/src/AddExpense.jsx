import { useState } from 'react'

export function AddExpense({ onAdd }) {

    const [nameInput, setNameInput] = useState('')
    const [amountInput, setAmountInput] = useState('')
    const [categoryInput, setCategoryInput] = useState('')

    const handleAdd = e => {

        e.preventDefault()
        if (!nameInput || !amountInput || !categoryInput) {
            window.alert('Please select all fields.')
            return
        }
        onAdd(nameInput, Number(amountInput), categoryInput)
        setNameInput('')
        setAmountInput('')
        setCategoryInput('')

    }

    return (
        <div>
            <form onSubmit={handleAdd}>
                <label htmlFor='name'>Name: </label>
                <input id='name' name='name' type='text' value={nameInput} onChange={e => setNameInput(e.target.value)} />
                <label htmlFor='amount'>Amount: </label>
                <input id='amount' name='amount' type='number' value={amountInput} onChange={e => setAmountInput(e.target.value)} />
                <label htmlFor='category'>Category: </label>
                <select id='category' name='category' value={categoryInput} onChange={e => setCategoryInput(e.target.value)}>
                    <option value=''>Category</option>
                    <option value='Housing'>Housing</option>
                    <option value='Transportation'>Transportation</option>
                    <option value='Food'>Food</option>
                    <option value='Utilities'>Utilities</option>
                    <option value='Clothing'>Clothing</option>
                    <option value='Medical'>Medical</option>
                    <option value='Insurance'>Insurance</option>
                    <option value='Household Supplies'>Household Supplies</option>
                    <option value='Personal'>Personal</option>
                    <option value='Debt'>Debt</option>
                    <option value='Retirement'>Retirement</option>
                    <option value='Education'>Education</option>
                    <option value='Savings'>Savings</option>
                    <option value='Gifts'>Gifts</option>
                    <option value='Entertainment'>Entertainment</option>
                </select>
                <input type="submit" value="Add" disabled={!nameInput || !amountInput || !categoryInput} />
            </form>
        </div>
    )
}