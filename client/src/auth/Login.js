import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [active, setActive] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.querySelector("body").addEventListener("click", () => {
      setActive(null);
    });
  }, []);

  const submit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <section className="auth">
      <div className="top">
        <div className="space">
          <h1 className="sac">Chatter</h1>
          <Link to="/">Register</Link>
        </div>
      </div>

      <div className="container">
        <div className="sub">
          <h2>Login</h2>
          <form action="" onSubmit={submit}>
            <label htmlFor="">Username</label>
            <input
              type="text"
              onClick={() => setActive("username")}
              className={active === "username" ? "active" : ""}
              onChange={(e) => setUsername(e.target.value.trim())}
            />

            <label htmlFor="">Password</label>
            <input
              type="password"
              onClick={() => setActive("password")}
              className={active === "password" ? "active" : ""}
              onChange={(e) => setPassword(e.target.value.trim())}
            />

            <input type="submit" value="Sign up" />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
