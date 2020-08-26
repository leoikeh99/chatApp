import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import authContext from "../../context/auth/authContext";
import * as EmailValidator from "email-validator";

const Register = (props) => {
  const AuthContext = useContext(authContext);
  const { error, isAuthenticated, register } = AuthContext;

  const [active, setActive] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    document.querySelector("body").addEventListener("click", () => {
      setActive(null);
    });

    if (isAuthenticated) {
      props.history.push("/");
    }
  }, [isAuthenticated, props.history]);

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
        console.log("passwords do not match");
      }
    } else {
      console.log("email invalid");
    }
  };

  return (
    <section className="auth">
      <div className="top">
        <div className="space">
          <h1 className="sac">Chatter</h1>
          <Link to="/login">Login</Link>
        </div>
      </div>

      <div className="container">
        <div className="sub">
          <h2>Sign up</h2>

          <form action="" onSubmit={submit}>
            <label htmlFor="">Username</label>
            <input
              type="text"
              onClick={() => setActive("username")}
              className={active === "username" ? "active" : ""}
              onChange={(e) => setUsername(e.target.value.trim())}
              required
            />

            <label htmlFor="">Email Address</label>
            <input
              type="text"
              onClick={() => setActive("email")}
              className={active === "email" ? "active" : ""}
              onChange={(e) => setEmail(e.target.value.trim())}
              required
            />

            <label htmlFor="">Password</label>
            <input
              type="password"
              onClick={() => setActive("password")}
              className={active === "password" ? "active" : ""}
              onChange={(e) => setPassword(e.target.value.trim())}
              required
              minLength="6"
            />

            <label htmlFor="">Confirm Password</label>
            <input
              type="password"
              onClick={() => setActive("confirm_password")}
              className={active === "confirm_password" ? "active" : ""}
              onChange={(e) => setConfirmPassword(e.target.value.trim())}
              required
            />

            <input type="submit" value="Sign up" />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
