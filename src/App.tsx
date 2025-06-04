import './App.css';
import ListGroup from './components/ListGroup.tsx';
import { Button } from './components/Button/Button.tsx';
import Alert from './components/Alert.tsx';
import { useState } from 'react';
import { produce } from 'immer';

function App() {
  const items = ['New York', 'San Francisco', 'Tokyo', 'London', 'Paris'];
  const handleSelectItem = (item: number) => {
    console.log(item);
  };

  const [alertVisible, setAlertVisibility] = useState(false);
  const [bugs, setBugs] = useState([
    {
      name: 'bug',
      id: 3,
      fixed: false,
    },
    {
      name: 'bug1',
      id: 18,
      fixed: false,
    },
  ]);

  const handleClick = () => {
    // setBugs(bugs.map(bug => (bug.id === 3 ? { ...bug, fixed: true } : bug)));
    setBugs(
      produce(draft => {
        const bug = draft.find(bug => bug.id === 3);
        if (bug) {
          bug.fixed = true;
        }
      }),
    );
  };

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

      <div className="mt-4">
        {bugs.map(bug => (
          <p>
            {bug.id} {bug.fixed ? 'fixed' : 'not fixed'}
          </p>
        ))}
        <Button onClick={() => handleClick()}>Click</Button>
      </div>
    </div>
  );
}

export default App;
