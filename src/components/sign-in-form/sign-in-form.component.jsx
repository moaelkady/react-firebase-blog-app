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
      if (error.code === "auth/user-not-found") {
        toast.error("No such email or password");
        return;
      } else {
        toast.error("Error loging in", error);
        console.log(error);
        return;
      }
    }
    resetFormFields();
    navigate("/");
    return;
  };

  return (
    <div className="sign-in-form">
      <form onSubmit={handleSubmit}>
        <FormInput
          placeholder="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          placeholder="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <Button btnName="Sign Up" type="submit" />
      </form>
    </div>
  );
};

export default SignInForm;
