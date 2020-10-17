import React, { useState, useEffect, useContext } from "react";
import authContext from "../../context/auth/authContext";
import NavContext from "../../context/nav/navContext";
import * as EmailValidator from "email-validator";
import $ from "jquery";

const Register = (props) => {
  const navContext = useContext(NavContext);
  const { setNav } = navContext;

  const AuthContext = useContext(authContext);
  const { error, isAuthenticated, register, clearError } = AuthContext;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    setNav("reg");
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
  }, [isAuthenticated, props.history]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        clearError();
      }, 4000);
    }
    if (alert) {
      const alert = $(".auth .alert");
      console.log(alert);
      alert.css("display", "block");

      setTimeout(() => {
        alert.css("animationName", "fadeOut");
      }, 2500);

      setTimeout(() => {
        alert.css("display", "none");
        alert.css("animationName", "none");
        setAlert(null);
      }, 5400);
    }
    // eslint-disable-next-line
  }, [error, alert]);

  const submit = (e) => {
    e.preventDefault();
    if (EmailValidator.validate(email)) {
      if (password === confirmPassword) {
        const data = {
          username,
          email,
          password,
        };

        register(data);
      } else {
        setAlert("Passwords do not match");
      }
    } else {
      setAlert("Invalid email");
    }
  };

  return (
    <section className="auth">
      <div className="container">
        <div className="sub">
          <h2>Sign up</h2>

          <form action="" onSubmit={submit} id="reg">
            <label htmlFor="">Username:</label>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value.trim())}
              required
            />

            <label htmlFor="">Email Address:</label>
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value.trim())}
              required
            />

            <label htmlFor="">Password:</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value.trim())}
              required
              minLength="6"
            />

            <label htmlFor="">Confirm Password:</label>
            <input
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value.trim())}
              required
            />

            <input type="submit" value="Sign up" />
            {error && <div className="error">{error}</div>}
            {alert && <div className="alert">{alert}</div>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
