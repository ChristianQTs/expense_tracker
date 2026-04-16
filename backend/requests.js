export async function fetchExpenses (user)  {

    const URL = `http://localhost:8001/users/${user}/expenses`

    try {

        const response = await fetch(URL)
        const json = await response.json()

        if (response.ok) {
            return json.data
        } else {
            window.alert(json.message)
        }
    } catch (err) {
        window.alert(err.message)
    }
}

export async function addExpense(user, name, amount, category) {

    const URL = `http://localhost:8001/users/${user}/expenses`

    try {

        const response = await fetch(URL, {

            method: 'POST',
            body: JSON.stringify({ name, category, amount }),
            headers: {"Content-Type": "application/json"},
        })

        const json = await response.json()
        if (response.ok) {

            return json.data

        } else {

            return window.alert(json.message)
        }
    } catch (err) {
        window.alert(err.message)
    }
}

export async function deleteExpense(user, expenseId) {

    const URL = `http://localhost:8001/users/${user}/expenses/${expenseId}`

    try {

        const response = await fetch(URL, {
            method: 'DELETE',
        })
        const json = await response.json()
        if (response.ok) {
            return json.expenseId

        } else {

            return window.alert(json.message)

        }
    } catch (err) {
        window.alert(err.message)
    }
    }

export async function updateExpense(user, updates, expenseId) {

    const URL = `http://localhost:8001/users/${user}/expenses/${expenseId}`

    try {

        const response = await fetch(URL, {
            method: 'PATCH',
            body: JSON.stringify(updates),
            headers: { 'Content-Type': 'application/json' }
        })

        const json = await response.json()

        if (!response.ok) return window.alert(json.message)

        return json.expense
    } catch (err) {
        window.alert(err.message)
    }
} 