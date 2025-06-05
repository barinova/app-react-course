import { useState } from 'react';

export const Form = () => {
  const [person, setPerson] = useState({
    name: '',
    age: '',
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`Name: ${person.name}, Age: ${person.age}`);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          onChange={event => setPerson({ ...person, name: event.target.value })}
          value={person.name}
          id="name"
          type="text"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          onChange={event =>
            setPerson({
              ...person,
              age: event.target.value ? parseInt(event.target.value) : 0,
            })
          }
          value={person.age}
          type="number"
          className="form-control"
          id="age"
        />
      </div>
      <button className="btm-primary" type="submit">
        Submit
      </button>
    </form>
  );
};
