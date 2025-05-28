interface AlertProps {
  children?: string;
  onClick?: () => void;
}

const Alert = ({ children, onClick }: AlertProps) => {
  return (
    <div
      className="alert alert-primary alert-dismissible d-flex justify-content-between align-items-center"
      role="alert"
    >
      {children}
      <button
        type="button"
        className="btn-close"
        data-dismiss="alert"
        aria-label="Close"
        onClick={onClick}
      ></button>
    </div>
  );
};

export default Alert;
