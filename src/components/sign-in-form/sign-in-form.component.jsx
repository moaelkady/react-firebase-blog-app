import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebase/firebase.utils";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      return toast.error("Enter email and password");
    }

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          toast.error("No such email or password");
          break;
        case "auth/wrong-password":
          toast.error("Wronge password");
          break;
        default:
          toast.error("Error loging in", error);
      }
      return;
    }
    resetFormFields();
    navigate("/");
    return;
  };

  return (
    <div className="sign-in-form">
      <form method="POST" onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
          autoComplete="off"
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
          autoComplete="off"
        />
        <Button btnName="Log In" type="submit" />
      </form>
    </div>
  );
};

export default SignInForm;
