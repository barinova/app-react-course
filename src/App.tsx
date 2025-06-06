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

  const addUser = () => {
    const originalUsers = [...users];
    const newUser = {
      id: 0,
      name: 'New User',
    };

    setUsers([newUser, ...users]);

    axios
      .post('https://jsonplaceholder.typicode.com/users', newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch(err => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + ' updated' };

    setUsers(users.map(u => (u.id === user.id ? updatedUser : u)));

    axios
      .patch(
        'https://jsonplaceholder.typicode.com/users/' + user.id,
        updatedUser,
      )
      .catch(err => {
        setError(err.message);
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
      {isLoading && <span className="spinner-border"></span>}
      {error && <div className="error">Error occurred</div>}
      <button className="btn btn-primary m-2" onClick={addUser}>
        Add
      </button>
      <ul className="list-group">
        {users.map(user => (
          <li
            className="list-group-item d-flex justify-content-between"
            key={user.id}
          >
            <span className="m-sm-1">
              {user.name} (ID: {user.id})
            </span>
            <div>
              <button
                className="btn btn-secondary mx-3"
                onClick={() => updateUser(user)}
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteUser(user)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
