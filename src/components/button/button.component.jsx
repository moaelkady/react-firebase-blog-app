import "./button.styles.scss";

const Button = ({ btnName, ...otherProps }) => {
  return (
    <button className="btn" {...otherProps}>
      <span className="transition"></span>
      <span className="gradient"></span>
      <span className="label">{btnName}</span>
    </button>
  );
};

export default Button;
