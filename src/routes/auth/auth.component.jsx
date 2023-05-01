import { Fragment, useState } from "react";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import { Helmet } from "react-helmet-async";

import "./auth.styles.scss";

const Auth = ({ user }) => {
  const userId = user?.uid;
  const [logIn, setLogIn] = useState(true);

  const handleClick = () => {
    setLogIn(!logIn);
  };

  return (
    <Fragment>
      <Helmet>
        <title>Sign Up or Log In - Your Ultimate Destination for Freelancing</title>
        <meta name="description" content="Join moQadi blog today and stay up-to-date with the latest news, ideas, and trends in freelancing. Sign up or log in now!" />
        <meta name="keyword" content="SEO, Performance, Freelancing, success, Rank" />
      </Helmet>
      {!userId ? (
        <div className="auth-container">
          {logIn ? <SignInForm /> : <SignUpForm />}
          <div className="switch-form">
            {logIn ? (
              <p>
                Don't have an account yet?
                <span className="switch-btn" onClick={handleClick}>
                  Sign Up
                </span>
              </p>
            ) : (
              <p>
                Have an account?
                <span className="switch-btn" onClick={handleClick}>
                  Log In
                </span>
              </p>
            )}
          </div>
        </div>
      ) : (
        <h2 className="user-already-logged">You are already logged in.</h2>
      )}
    </Fragment>
  );
};

export default Auth;
