import { useRef } from 'react';

export const Form = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const person = {
    name: '',
    age: 0,
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    person.name = nameRef.current?.value || '';
    person.age = ageRef.current ? parseInt(ageRef.current.value) : 0;
    console.log('Form submitted', person);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input ref={nameRef} id="name" type="text" className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input ref={ageRef} type="number" className="form-control" id="age" />
      </div>
      <button className="btm-primary" type="submit">
        Submit
      </button>
    </form>
  );
};
