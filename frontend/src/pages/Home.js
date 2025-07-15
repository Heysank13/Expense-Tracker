import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { APIUrl, handleError, handleSuccess } from '../utils';
import ExpenseDetails from './ExpenseDetails';
import ExpenseForm from './ExpenseForm';
import ExpenseTable from './ExpenseTable';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [expenses, setExpenses] = useState([]);
    const [incomeAmt, setIncomeAmt] = useState(0);
    const [expenseAmt, setExpenseAmt] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Loggedout');
        setTimeout(() => {
            navigate('/login');
        }, 1000)
    }
    useEffect(() => {
        const amounts = expenses.map(item => item.amount);
        const income = amounts.filter(item => item > 0)
            .reduce((acc, item) => (acc += item), 0);
        const exp = amounts.filter(item => item < 0)
            .reduce((acc, item) => (acc += item), 0) * -1;
        setIncomeAmt(income);
        setExpenseAmt(exp);
    }, [expenses])

    const deleteExpens = async (id) => {
        try {
            const url = `${APIUrl}/expenses/${id}`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                },
                method: "DELETE"
            }
            const response = await fetch(url, headers);
            if (response.status === 403) {
                localStorage.removeItem('token');
                navigate('/login');
                return
            }
            const result = await response.json();
            handleSuccess(result?.message)
            console.log('--result', result.data);
            setExpenses(result.data);
        } catch (err) {
            handleError(err);
        }
    }

    const fetchExpenses = async () => {
        try {
            const url = `${APIUrl}/expenses`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }
            const response = await fetch(url, headers);
            if (response.status === 403) {
                localStorage.removeItem('token');
                navigate('/login');
                return
            }
            const result = await response.json();
            console.log('--result', result.data);
            setExpenses(result.data);
        } catch (err) {
            handleError(err);
        }
    }
    useEffect(() => {
        fetchExpenses()
    }, [fetchExpenses])



    const addTransaction = async (data) => {
        try {
            const url = `${APIUrl}/expenses`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data)
            }
            const response = await fetch(url, headers);
            if (response.status === 403) {
                localStorage.removeItem('token');
                navigate('/login');
                return
            }
            const result = await response.json();
            handleSuccess(result?.message)
            console.log('--result', result.data);
            setExpenses(result.data);
        } catch (err) {
            handleError(err);
        }
    }

   

    return (
        <div className='home'>
            <div className='user-section'>
                <h1>Welcome {loggedInUser}</h1>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <div className='expense-summary'>
            <ExpenseDetails
                incomeAmt={incomeAmt}
                expenseAmt={expenseAmt}
            />
            </div>

            <div className="main-section">
                <div className="left-panel">
                    <ExpenseForm addTransaction={addTransaction} />
                </div>
                <div className="right-panel">
                    <ExpenseTable expenses={expenses} deleteExpens={deleteExpens} />
                </div>
        </div>

        
<footer className="footer">
    <p>
        Developed by <a href="https://www.linkedin.com/in/sanketgirhepunje/" target="_blank" rel="noopener noreferrer">
            Sanket Girhepunje
        </a>
    </p>
    <p>
        Email: <a href="mailto:sanketgirhepunje@gmail.com">sanketgirhepunje@gmail.com</a>
    </p>
</footer>


        <ToastContainer />
        
        </div>
        
    )
}

export default Home
