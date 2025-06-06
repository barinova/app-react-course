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

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter(u => u.id !== user.id));

    axios
      .delete('https://jsonplaceholder.typicode.com/users/' + user.id)
      .catch(error => {
        setError(error);
        setUsers(originalUsers);
      });
  };

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
        setIsLoading(false);
      });

    return () => abortController.abort();
  }, []);

  return (
    <>
      {isLoading && <div className="spinner-border"></div>}
      {error && <span className="error">Error occurred</span>}
      <ul className="list-group">
        {users.map(user => (
          <li
            className="list-group-item d-flex justify-content-between"
            key={user.id}
          >
            <span className="m-sm-1">
              {user.name} (ID: {user.id})
            </span>
            <button
              className="btn btn-outline-danger"
              onClick={() => deleteUser(user)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
