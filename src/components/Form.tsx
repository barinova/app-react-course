import { type FieldValues, useForm } from 'react-hook-form';

export const Form = () => {
  const { register, handleSubmit } = useForm();
  console.log(register('name'));

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          {...register('name')}
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
          {...register('age')}
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
