import "./form-input.styles.scss";

const FormInput = ({ ...props }) => {
  return <input autoComplete="off" className="form-input" {...props} />;
};

export default FormInput;
