import './App.css';
import { Form } from './components/Form.tsx';
import { Table } from './components/Table.tsx';
import { useState } from 'react';

export type Product = {
  name: string;
  amount: number;
  category: string;
};

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const onDelete = (product: Product) => {
    setProducts(products.filter(p => p.name !== product.name));
  };
  const onProductSubmit = (product: Product) => {
    console.log('Product submitted:', product);
    setProducts([...products, product]);
  };

  return (
    <div>
      <Form onProductSubmit={onProductSubmit}></Form>
      <Table products={products} onDelete={onDelete}></Table>
    </div>
  );
}

export default App;
