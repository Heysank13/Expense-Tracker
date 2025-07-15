import PropTypes from 'prop-types';

const ExpenseTable = ({ expenses = [], deleteExpens }) => {
    return (
        <div className="expense-list">
            {expenses.length === 0 ? (
                <p style={{ textAlign: 'center', marginTop: '1rem' }}>No expenses found.</p>
            ) : (
                expenses.map((expense) => (
                    <div key={expense._id} className="expense-item">
                        <button className="delete-button" onClick={() => deleteExpens(expense._id)}>X</button>
                        <div className="expense-description">{expense.text}</div>
                        <div
                            className="expense-amount"
                            style={{ color: expense.amount > 0 ? '#27ae60' : '#c0392b' }}
                        >
                            ₹{expense.amount}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

ExpenseTable.propTypes = {
    expenses: PropTypes.array.isRequired,
    deleteExpens: PropTypes.func.isRequired
};

export default ExpenseTable;
