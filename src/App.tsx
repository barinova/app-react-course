import './App.css';
import ListGroup from './components/ListGroup.tsx';
import { Button } from './components/Button.tsx';

function App() {
  const items = ['New York', 'San Francisco', 'Tokyo', 'London', 'Paris'];
  const handleSelectItem = (item: number) => {
    console.log(item);
  };

  return (
    <div>
      <ListGroup
        items={items}
        heading="Cities"
        onSelectItem={handleSelectItem}
      ></ListGroup>
      <div className="mt-4">
        <Button onClick={() => console.log('click')}>Primary Button</Button>
      </div>
      <div className="mt-4">
        <Button color="secondary" onClick={() => console.log('click')}>
          Primary Button
        </Button>
      </div>
    </div>
  );
}

export default App;
