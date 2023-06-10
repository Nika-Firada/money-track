import { useState } from "react";
import Transaction from './Transaction';

function App() {
  const [name, setName] = useState('')
  const [datetime, setDatetime] = useState('')
  const [desc, setDesc] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <main>
      <h1>$400 <span>.00</span></h1>
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
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            type="text"
            placeholder={'description'}
          />
        </div>
        <button type="submit">Add new transaction</button>
      </form>
      <div className="transactions">
        <Transaction />
      </div>
    </main>
  );
}

export default App;
