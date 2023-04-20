import { useState } from "react";
import "./form-input.styles.scss";

const FormInput = ({ ...props }) => {
  const [counter] = useState(50);
  const label = props.label.split("");

  return (
    <div className="form-control">
      <input type="value" {...props} id={label.join("")} />
      <label htmlFor={label.join("")}>
        {label.map((letter, id) => (
          <span key={id} style={{ transitionDelay: counter * id + "ms" }}>
            {letter}
          </span>
        ))}
      </label>
    </div>
  );
};

export default FormInput;
