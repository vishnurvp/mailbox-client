import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../context/authReducer";
import apiKey from "../../context/aipKeyStore";
import classes from "./LogIn.module.css";
import { Redirect, useHistory } from "react-router-dom";

const LogIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const Authenticated = useSelector((state) => state.auth.isAuthenticated);

  const [signUp, setSignUp] = useState(false);
  const [forgotPass, setForgotPass] = useState(false);

  const loginHandler = async (event) => {
    event.preventDefault();
    const email = event.target.elements["logInEmail"].value;
    const password = event.target.elements["password"].value;
    if (password === "" || password.length < 8) {
      alert(
        `Password cannot be empty \nPassword should be atleast 8 charecters long`
      );
    } else {
      try {
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
          {
            method: "POST",
            body: JSON.stringify({
              email: email,
              password: password,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        // console.log(data);
        if (data.error) {
          alert(data.error.message);
        } else {
          dispatch(authActions.login(data.idToken));
          dispatch(authActions.setEmail(data.email));
          dispatch(authActions.setCleanEmail(data.email.replace(/[^a-zA-Z ]/g, "")));
        }
      } catch (err) {
        alert(err.error.message);
      }
      //   console.log(email, password1, password2);
      event.target.elements["logInEmail"].value = "";
      event.target.elements["password"].value = "";
    }
  };

  const signUpClickHandler = () => {
    setSignUp(true);
    history.push('/login')
  };
  const forgotPasswordClickHandler = () => {
    setForgotPass(true);
    history.push('/login')
  };

  return (
    <Fragment>
      {Authenticated && <Redirect to={"/welcome"} />}
      <Fragment>
        <form className={classes.form} onSubmit={loginHandler}>
          <label htmlFor="email">Email</label>
          <input id="logInEmail" type="email"></input>
          <label htmlFor="password">Password</label>
          <input id="password" type="password"></input>
          <button id="logInBtn" type="submit">
            Log In
          </button>
        </form>
        <pre className={classes.forgotPass}
          onClick={forgotPasswordClickHandler}
          style={{ textDecoration: "underline" }}
        >
          Forgot Password?
        </pre>
        <pre className={classes.signUp} onClick={signUpClickHandler} style={{ textDecoration: "underline" }}>
          {`Don't have an account?\nClick heare to Sign Up`}
        </pre>
        
      </Fragment>
      {signUp && <Redirect to={"/signup"} />}
      {forgotPass && <Redirect to="/forgotpassword"/>}
    </Fragment>
  );
};

export default LogIn;
