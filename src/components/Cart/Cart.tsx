import { Button } from '../Button/Button.tsx';

type Props = {
  cartItems: string[];
  onClear?: () => void;
};

export const Cart = ({ cartItems, onClear }: Props) => {
  return (
    <div>
      Cart Items:
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
        <Button onClick={onClear}>Clear</Button>
      </ul>
    </div>
  );
};
