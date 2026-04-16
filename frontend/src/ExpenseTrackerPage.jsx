import { useState, useEffect } from 'react'
import { AddExpense } from './AddExpense'
import { ExpensesList } from './ExpensesList'
import { Filter } from './Filter'
import { Budget } from './Budget'
import { fetchExpenses, addExpense, deleteExpense, updateExpense } from '../../backend/requests.js'

const buttonStyle =  {
    backgroundColor: "#dc2626",
    color: "#e5e7eb",
    padding: "3px 6px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: 200,
}

export function ExpenseTrackerPage() {

    const [user, setUser] = useState(null)
    const [userIDInput, setUserIDInput] = useState('')
    const [expenses, setExpenses] = useState([])
    const [filter, setFilter] = useState('all')
    const isFiltered = filter !== 'all'
    const filteredExpenses = isFiltered ? expenses.filter(e => e.category === filter) : expenses
    const [showBudget, setShowBudget] = useState(false)

    useEffect(() => {
        if(!user) return
        fetchExpenses(user).then(
            expenses => {
                if (!expenses) return
                setExpenses(expenses)
            }
        )
    }, [user])


    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (isFiltered && filteredExpenses.length === 0) setFilter('all')
    }, [filteredExpenses, isFiltered])
    

    const handleDeleteExpense = id => {
        deleteExpense(user, id).then(expenseId => {
            if (!expenseId) return
            setExpenses(prev => prev.filter(e => e.id !== expenseId))
        })
    }

    const handleAddExpense = (name, category, amount) => {
        addExpense(user, name, category, amount).then(newExpense => setExpenses(prev => [...prev, newExpense]))
    }

    const handleUpdateExpense = (expenseId, updates) => {
        updateExpense(user, updates, expenseId).then(expense => {
            if(!expense) return
            setExpenses(prev => prev.map(e => e.id === expense.id ? expense : e))
        })
    }

    const handleUserIDinput = () => {
        setUser(userIDInput)
        setUserIDInput('')
    }

    const totalExpense = expenses.reduce((tot, exp) => tot + exp.amount, 0)
    const totalCategory = filteredExpenses.reduce((tot, exp) => tot + exp.amount, 0)
    const categoryPercentage = totalExpense !== 0 ? Math.floor((totalCategory * 100) / totalExpense) : 0
    return (
        <div>
            <div>
                <label htmlFor="user">My User ID is: </label>
                <input id="user" value={userIDInput} onChange={(e) => setUserIDInput(Number(e.target.value))} onKeyDown={(e) => e.key === 'Enter' && handleUserIDinput()} />
            </div>
            {user ?(
            <div>
                <h1 title='As requested by ChatGPT'>Expenses Tracker</h1>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'10px'}}>
                    <AddExpense onAdd={handleAddExpense} />
                    <button onClick={() => setShowBudget(prev => !prev)}>{showBudget ? 'Hide' : 'Show'} Budget Options</button>
                </div>
                {showBudget && <Budget btnStyle={ buttonStyle} total={totalExpense}/>}
                {(expenses.length !== 0 && <Filter expenses={expenses} filter={filter} setFilter={setFilter} />)}
                    <ExpensesList btnStyle={buttonStyle} expenses={filteredExpenses} onDelete={handleDeleteExpense} onUpdate={handleUpdateExpense} />
                <section style={{ background: '#e9eaec'}} className='total-section'>
                    <span><strong>Total: </strong>{totalExpense} &euro;</span>
                    {(isFiltered && <span> - <strong>{filter} total: </strong>{totalCategory} &euro;</span>)}
                    {(isFiltered && <span> - <strong>{filter}</strong> % of total expenses: {categoryPercentage} %</span>) }
                </section>
                </div>) : (
                <h1>Enter User ID to start</h1>
                )}
        </div>
    )
}