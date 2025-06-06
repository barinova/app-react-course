import './App.css';
import { useEffect, useState } from 'react';
import axios, { CanceledError } from 'axios';

interface User {
  id: number;
  name: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const abortController = new AbortController();
    axios
      .get<User[]>('https://jsonplaceholder.typicode.com/users', {
        signal: abortController.signal,
      })
      .then(response => {
        setUsers(response.data);
      })
      .catch(er => {
        if (er instanceof CanceledError) {
          return;
        }
        setError(er);
      })
      .finally(() => {
        console.log('Request completed');
        setIsLoading(false);
      });

    return () => abortController.abort();
  }, []);

  return (
    <>
      {isLoading && <div className="spinner-border"></div>}
      {error ? (
        <span className="error">Error occurred</span>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.name} (ID: {user.id})
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
