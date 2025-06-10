import './App.css';
import userService, { type User } from './services/user-service.ts';
import useUsers from './hooks/useUsers.ts';

function App() {
  const { users, error, isLoading, setUsers, setError } = useUsers();

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter(u => u.id !== user.id));

    userService.delete(user).catch(error => {
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

    userService
      .add(newUser)
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

    userService.update(updatedUser).catch(err => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

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
