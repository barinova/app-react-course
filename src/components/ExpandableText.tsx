import { useState } from 'react';
import { Button } from './Button/Button.tsx';

type Props = {
  children?: string;
  maxCharacters?: number;
};

export const ExpandableText = ({ children, maxCharacters }: Props) => {
  const [showLess, setShowLess] = useState(true);
  const [text, setText] = useState(children);

  const changeTextLength = () => {
    const showLessValue = !showLess;
    setShowLess(showLessValue);
    setText(
      showLessValue ? children : children?.substring(0, maxCharacters) + '...',
    );
  };

  return (
    <div>
      <p>{text}</p>
      <Button onClick={changeTextLength}>{showLess ? 'Less' : 'More'}</Button>
    </div>
  );
};
