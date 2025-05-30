import './Button.scss';

export interface ButtonProps {
  children?: string;
  color?: 'primary' | 'secondary';
  onClick?: () => void;
}

export function Button({ children, color = 'primary', onClick }: ButtonProps) {
  return (
    <button
      type="button"
      className={`my-button my-button-${color}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
