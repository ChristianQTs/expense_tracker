import {ExpenseItem} from './ExpenseItem'

export function ExpensesList({ btnStyle, expenses, onDelete, onUpdate }) {

    return (
        <ul>
            {
                expenses.map(e =>
                    <ExpenseItem
                        btnStyle={btnStyle}
                        key={e.id}
                        expense={e}
                        onDelete={onDelete}
                        onUpdate={onUpdate}>
                    </ExpenseItem>
                )
            }
        </ul>
        
    )
}