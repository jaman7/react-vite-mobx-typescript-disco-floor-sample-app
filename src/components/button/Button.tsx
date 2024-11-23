interface ButtonProps {
  children: JSX.Element | string | null;
  handleClick?: (event: any) => void;
  className?: string;
  disabled?: boolean;
  [key: string]: any;
}

const Button: React.FC<ButtonProps> = ({ children, className, disabled, handleClick, ...props }) => {
  return (
    <button className={className ?? 'btn'} disabled={disabled ?? false} onClick={handleClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
