export interface ButtonProps {
  children?: string;
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  onClick: () => void;
}

export function Button({ children, color = 'primary', onClick }: ButtonProps) {
  return (
    <button type="button" className={`btn btn-${color}`} onClick={onClick}>
      {children}
    </button>
  );
}
