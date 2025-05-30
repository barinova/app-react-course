import './Like.scss';
import { useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';

interface LikeProps {
  onClick: () => void;
}

function Like({ onClick }: LikeProps) {
  const [liked, setLiked] = useState(false);

  return (
    <AiFillHeart
      color={liked ? 'red' : 'black'}
      onClick={() => {
        setLiked(!liked);
        onClick();
      }}
    ></AiFillHeart>
  );
}

export default Like;
