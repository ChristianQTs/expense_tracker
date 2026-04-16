export function Filter({ expenses, filter, setFilter }) {

    const categories = [...new Set(expenses.map(e => e.category))]
    return (
        <div>
            <label htmlFor='filter'>Filter: </label>
            <select id='filter' name='filter' value={filter} onChange={e => setFilter(e.target.value)}>
            <option value='all'>All</option>
                {
                    categories.map(e =>
                        <option key={e} value={e}>{e}</option>
                )}
            </select>

        </div>
    )
}