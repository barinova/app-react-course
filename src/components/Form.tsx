import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { Product } from '../App.tsx';
import { CategoryEnum } from './Category.enum.tsx';

type Props = {
  onProductSubmit: (data: Product) => void;
};

export const Form = ({ onProductSubmit }: Props) => {
  type FormData = z.infer<typeof schema>;
  const schema = z.object({
    name: z.string().min(3, { message: 'Name must be at least 3 characters.' }),
    amount: z.number().min({ message: '0.01' }).max({ message: '9999.99' }),
    category: z.string().nonempty({ message: 'Category is required.' }),
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (event: FormData) => {
    onProductSubmit({
      name: event.name,
      amount: parseFloat(event.amount),
      category: event.category,
    });
    reset();
  };

  return (
    <form
      className="w-50 mx-auto pb-5 float-start"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="pb-2">
        <label className="form-label float-start">Name</label>
        <input
          className="form-control"
          id="name"
          type="text"
          {...register('name')}
        />
        {errors.name && <p className="text-danger">{errors.name.message}</p>}
      </div>
      <div className="pb-2">
        <label className="form-label float-start">Amount</label>
        <input
          className="form-control"
          id="amount"
          type="number"
          {...register('amount', { valueAsNumber: true })}
        />
        {errors.amount && (
          <p className="text-danger">{errors.amount.message}</p>
        )}
      </div>
      <div className="pb-2">
        <label className="form-label float-start">Category</label>
        <select
          className="form-control"
          id="category"
          {...register('category')}
        >
          {Object.keys(CategoryEnum).map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-danger">{errors.category.message}</p>
        )}
      </div>
      <button className="btn btn-primary mt-3" type="submit">
        Submit
      </button>
    </form>
  );
};
