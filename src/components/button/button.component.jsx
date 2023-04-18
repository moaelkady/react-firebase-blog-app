import "./button.styles.scss";

const Button = ({ btnName, ...otherProps }) => {
  return (
    <button className="btn" {...otherProps}>
      <span class="transition"></span>
      <span class="gradient"></span>
      <span class="label">{btnName}</span>
    </button>
  );
};

export default Button;
