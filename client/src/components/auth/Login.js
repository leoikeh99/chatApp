import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import authContext from "../../context/auth/authContext";
import $ from "jquery";

const Login = (props) => {
  const AuthContext = useContext(authContext);
  const { error, isAuthenticated, login, clearError } = AuthContext;

  const [active, setActive] = useState(null);
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.querySelector("body").addEventListener("click", () => {
      setActive(null);
    });

    if (isAuthenticated) {
      props.history.push("/");
    }
  }, [isAuthenticated, props.history]);

  // useEffect(() => {
  //   if (error) {
  //     setTimeout(() => {
  //       clearError();
  //     }, 4000);
  //   }
  // }, [error]);

  const submit = (e) => {
    e.preventDefault();
    login({
      email,
      password,
    });
  };

  return (
    <section className="auth">
      {/* {error && <div className="error">{error}</div>} */}
      <div className="top">
        <div className="space">
          <h1 className="sac">Chatter</h1>
          <Link to="/register">Register</Link>
        </div>
      </div>

      <div className="container">
        <div className="sub">
          <h2>Login</h2>
          <form action="" onSubmit={submit}>
            <label htmlFor="">Email</label>
            <input
              type="email"
              onClick={() => setActive("username")}
              className={active === "username" ? "active" : ""}
              onChange={(e) => setUsername(e.target.value.trim())}
              required
            />

            <label htmlFor="">Password</label>
            <input
              type="password"
              onClick={() => setActive("password")}
              className={active === "password" ? "active" : ""}
              onChange={(e) => setPassword(e.target.value.trim())}
              required
            />

            <input type="submit" value="Sign up" />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
