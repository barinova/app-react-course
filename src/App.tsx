import './App.css';
import { useState } from 'react';
import { Button } from './components/Button/Button.tsx';

function App() {
  const [game, setGame] = useState({
    id: 1,
    player: {
      name: 'John',
    },
  });

  const [pizza, setPizza] = useState({
    name: 'Margherita',
    toppings: ['cheese', 'tomato'],
  });

  const [cart, setCart] = useState({
    discount: 0.1,
    items: [
      {
        id: 1,
        title: 'Pizza Margherita',
        price: 10,
        quantity: 1,
      },
      {
        id: 2,
        title: 'Pizza Pepperoni',
        price: 12,
        quantity: 12,
      },
    ],
  });

  const changeQuantity = () => {
    setCart({
      ...cart,
      items: cart.items.map(item => ({
        ...item,
        quantity: item.quantity + 1,
      })),
    });
  };

  const addTopping = () => {
    setPizza({ ...pizza, toppings: [...pizza.toppings, 'basil'] });
  };

  const handleClick = () => {
    setGame({
      ...game,
      player: {
        name: 'Jane',
      },
    });
  };

  return (
    <div>
      <section>
        <p>{game.player.name}</p>
        <Button onClick={handleClick}>Change name</Button>
      </section>

      <section>
        <p>{pizza.toppings.join(', ')}</p>
        <Button onClick={addTopping}>Add topping</Button>
      </section>

      <section>
        {cart.items.map(item => (
          <p>{item.quantity}</p>
        ))}
        <Button onClick={changeQuantity}>Change quantity</Button>
      </section>
    </div>
  );
}

export default App;
