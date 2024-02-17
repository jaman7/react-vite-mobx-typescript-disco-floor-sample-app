import './Button.css';

const Button = (props: any) => (
  <button className={props.buttonClass} onClick={props.handleClick}>
    <span>{props.buttonText}</span>
  </button>
);

export default Button;
