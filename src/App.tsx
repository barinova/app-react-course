import './App.css';
import ListGroup from './components/ListGroup.tsx';
import { Button } from './components/Button.tsx';
import Alert from './components/Alert.tsx';
import { useState } from 'react';

function App() {
  const items = ['New York', 'San Francisco', 'Tokyo', 'London', 'Paris'];
  const handleSelectItem = (item: number) => {
    console.log(item);
  };

  const [alertVisible, setAlertVisibility] = useState(false);

  return (
    <div>
      {alertVisible && (
        <Alert onClick={() => setAlertVisibility(false)}>My Alert</Alert>
      )}
      <ListGroup
        items={items}
        heading="Cities"
        onSelectItem={handleSelectItem}
      ></ListGroup>
      <div className="mt-4">
        <Button onClick={() => setAlertVisibility(true)}>Primary Button</Button>
      </div>
    </div>
  );
}

export default App;
