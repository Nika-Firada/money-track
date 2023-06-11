import { useEffect, useState } from "react";
import Transaction from './Transaction';

const url = process.env.REACT_APP_API_URL || 'http://localhost:9999/api/transaction';

function App() {
  const [name, setName] = useState('');
  const [balance, setBalance] = useState(0);
  const [datetime, setDatetime] = useState('');
  const [description, setDescription] = useState('');
  const [transactions, setTransactions] = useState([]);

  const getTransactions = async () => {
    try {
      const res = await fetch('http://localhost:9999/api/transactions');
      const data = await res.json();
      setTransactions(data);
    } catch (error) {
      console.log('Error', error);
    }
  }

  useEffect(() => {
    getTransactions();

    for(const transaction of transactions){
      setBalance(prev => prev + Number(transaction.price));
    }
  }, [transactions.length])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const price = name.split(' ')[0];
      const formattedDatetime = new Date(datetime).toISOString();
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ price, name: name.substring(price.length + 1), datetime: formattedDatetime, description })
      });
      if (response.ok) {
        await response.json();
        setName('');
        setDatetime('');
        setDescription('');
      }
    } catch (error) {
      console.log('Error', error)
    }
  }

  return (
    <main>
      <h1>${Math.floor(balance)}<span>{(balance % 1).toFixed(2).substring(2)}</span></h1>
      <form onSubmit={handleSubmit}>
        <div className="basic">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder={"+200 new samsung tv"}
          />
          <input
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            type="datetime-local"
          />
        </div>
        <div className="description">
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder={'description'}
          />
        </div>
        <button type="submit">Add new transaction</button>
      </form>
      <div className="transactions">
        {transactions.length > 0 && transactions.map(transaction =>
          <Transaction transaction={transaction} key={transaction._id} />
        )}
      </div>
    </main>
  );
}

export default App;
