import { useState } from 'react'

export function ExpenseItem({ btnStyle, expense, onDelete, onUpdate }) {
    const categories = ['Housing','Transportation','Food','Utilities','Clothing','Medical','Insurance','Household Supplies','Personal','Debt','Retirement','Savings','Gifts','Entertainment']

    const [isEditing, setIsEditing] = useState(false)
    const [editedName, setEditedName] = useState(expense.name)
    const [editedAmount, setEditedAmount] = useState(expense.amount)
    const [editedCategory, setEditedCategory] =useState(expense.category)

    const handleSave = () => {
        onUpdate(expense.id, {
            name: editedName,
            amount: editedAmount,
            category:editedCategory
        })
        setIsEditing(false)
    }

    const toggleEditing = () => {
        setIsEditing(prev => !prev)
        if (isEditing) {
            setEditedName(expense.name)
            setEditedAmount(expense.amount)
            setEditedCategory(expense.category)
        }
    }

    return (
        (!isEditing) ?
            (
                <li>
                    <button onClick={() => setIsEditing(prev => !prev)}>{isEditing? 'Close edit' : 'Edit' }</button>
                    <span>{expense.name} </span>
                    <span>{expense.amount}  &euro; </span>
                    <span>{expense.category}</span>
                    <button style={btnStyle} onClick={() => onDelete(expense.id)}>X</button>
                </li>
            ) :
            (
                <li>
                    <button onClick={toggleEditing}>{isEditing ? 'Close edit' : 'Edit'}</button>
                    <label>Name: </label>
                    <input type='text' value={editedName} onChange={e => setEditedName(e.target.value)} />
                    <label>Amount</label>
                    <input type='number' value={editedAmount} onChange={e => setEditedAmount(e.target.value)} />
                    <label>Category</label>
                    <select value={editedCategory} onChange={e => setEditedCategory(e.target.value)}>
                        <option value=''>Category</option>
                        {
                            categories.map(c =><option key={c} value={c}>{c}</option>)
                        }

                    </select>
                    <button onClick={handleSave} disabled={expense.name === editedName && expense.amount === Number(editedAmount) && expense.category === editedCategory  || !editedName.trim() || !editedAmount  || !editedCategory.trim()}>Save</button>
                </li>
        )
    )
}