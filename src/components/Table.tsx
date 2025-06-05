import type { Product } from '../App.tsx';

type Props = {
  products: Product[];
  onDelete: (product: Product) => void;
};

export const Table = ({ products, onDelete }: Props) => {
  return (
    <table className="table table-bordered table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Amount</th>
          <th>Category</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {!products?.length && (
          <tr className="table-row">
            <td colSpan={4}>No products found</td>
          </tr>
        )}
        {products.map(product => (
          <tr className="table-row" key={product.name}>
            <td>{product.name}</td>
            <td>{product.amount}</td>
            <td>{product.category}</td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => onDelete(product)}
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
        <tr className="table-row" key="total">
          <td className="fw-bold">Total</td>
          <td className="fw-bold" colSpan={3}>
            {products?.reduce((p, sum) => (sum.amount += p.amount), 0)}
          </td>
        </tr>
      </tbody>
    </table>
  );
};
