function ExpenseDetails({incomeAmt, expenseAmt}) {
    const balance = incomeAmt - expenseAmt;


    return(
        <div className="expense-details">
             <h2 className="balance">Your Balance: ₹{balance}</h2>
            
            <div className="amounts-container">
                <div className="amount-box income-box">
                    <span>Income</span>
                    <span className="amount">₹{incomeAmt}</span>
                </div>
                <div className="amount-box expense-box">
                    <span>Expense</span>
                    <span className="amount">₹{expenseAmt}</span>
                </div>
            </div>
        </div>

    )
}

export default ExpenseDetails