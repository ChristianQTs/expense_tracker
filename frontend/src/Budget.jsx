import { useState, useEffect } from 'react'
export function Budget({btnStyle, total}) {

    const [budgetInput, setBudgetInput] = useState('')
    const [budget, setBudget] = useState(() => {
        const savedBudget = localStorage.getItem('budget')
        return savedBudget ? JSON.parse(savedBudget) : null
    })

    const handleAddBudget = () => {

        if (!budgetInput.trim() || budgetInput <= 0) return
        setBudget(Number(budgetInput))
        setBudgetInput('')

    }
    useEffect(() => {
        localStorage.setItem('budget', JSON.stringify(budget))
    }, [budget])

    const budgetPercentage = total > 0 ? Math.floor(total * 100 /budget) : 0
    const remaining = budget - total

    return (
        <div>
            <label htmlFor='budget'>Set a monthly budget: </label>
            <input id='budget' type='number' value={budgetInput} onChange={e => setBudgetInput(e.target.value) } />
            <button onClick={handleAddBudget} disabled={!budgetInput || budgetInput <= 0}>Set budget</button>
            {budget &&
                <div style={{ background: '#e9eaec' }}>
                    <span>Monthly budget: {budget} &euro;</span>
                    <button style={btnStyle} onClick={() => setBudget(null)}>X</button>
                    <span> - {remaining >= 0 ? 'Remaining' : 'Overspent'} {remaining} &euro; - </span>
                    <span style={{ color: budgetPercentage >= 80 ? "#dc2626" : "inherit", fontWeight: budgetPercentage >= 80 ? 'bold' : 'normal', }}> {budgetPercentage} % spent</span>
                </div>
            }
        </div>
    )
}