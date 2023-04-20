import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebase/firebase.utils";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./sign-up-form.styles.scss";

const defaultFormFields = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { firstName, lastName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Password don't match");
    }

    if (password.length < 6) {
      return toast.error("Password should be at least 6 characters");
    }

    if (firstName && lastName && email && password) {
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(user, { displayName: `${firstName} ${lastName}` });
        resetFormFields();
        toast("User created");
      } catch (error) {
        switch (error.code) {
          case "auth/email-already-in-use":
            toast.error("Cannot create user, email already in use");
            break;
          default:
            toast.error(
              "user creation encountered an error please check your email"
            );
        }
        return;
      }
    } else {
      return toast.error("Please fill all fields");
    }
    navigate("/");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <div className="sign-up-form">
      <form method="POST" onSubmit={handleSubmit} autoComplete="off">
        <div className="form-group">
          <FormInput
            label="First Name"
            type="text"
            required
            onChange={handleChange}
            name="firstName"
            value={firstName}
          />
          <FormInput
            label="Last Name"
            type="text"
            required
            onChange={handleChange}
            name="lastName"
            value={lastName}
          />
        </div>

        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <FormInput
          label="Confirm password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button btnName="Sign Up" type="submit" />
      </form>
    </div>
  );
};

export default SignUpForm;
