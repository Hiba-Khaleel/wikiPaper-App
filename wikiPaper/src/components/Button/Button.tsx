import "./button.css";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  onClick?: () => void;
  className?: string;
}

function Button({ text, className, onClick, ...rest }: ButtonProps) {
  return (
    <button className={className} onClick={onClick} {...rest}>
      {text}
    </button>
  );
}

export default Button;
