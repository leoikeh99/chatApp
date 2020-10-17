import React, { useState, useEffect, useContext } from "react";
import authContext from "../../context/auth/authContext";
import NavContext from "../../context/nav/navContext";

const Login = (props) => {
  const navContext = useContext(NavContext);
  const { setNav } = navContext;

  const AuthContext = useContext(authContext);
  const { error, isAuthenticated, login, clearError } = AuthContext;

  const [active, setActive] = useState(null);
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setNav("login");
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    document.querySelector("body").addEventListener("click", () => {
      setActive(null);
    });

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
    // eslint-disable-next-line
  }, [error]);

  const submit = (e) => {
    e.preventDefault();
    login({
      email,
      password,
    });
  };

  return (
    <section className="auth">
      <div className="container">
        <div className="sub">
          <h2>Login</h2>
          <form action="" onSubmit={submit}>
            <label htmlFor="">Email:</label>
            <input
              type="email"
              onClick={() => setActive("username")}
              className={active === "username" ? "active" : ""}
              onChange={(e) => setUsername(e.target.value.trim())}
              required
            />

            <label htmlFor="">Password:</label>
            <input
              type="password"
              onClick={() => setActive("password")}
              className={active === "password" ? "active" : ""}
              onChange={(e) => setPassword(e.target.value.trim())}
              required
            />

            <input type="submit" value="Login" />
            {error && error === "Invalid credentials" ? (
              <div className="error">Invalid username or password</div>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
