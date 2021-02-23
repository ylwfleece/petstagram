import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../services/auth";
import './LoginForm.css'
import petstagramlogo from '../NavBar/petstagramlogo.png'

const LoginForm = ({ authenticated, setAuthenticated }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      setAuthenticated(true);
    } else {
      setErrors(user.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className='login-page-container'>
      <div className='login-form-container'>
        <img src={petstagramlogo} alt='logo' style={{ margin: '5px 5rem' }} />
        <form onSubmit={onLogin}>
          <div>
            {errors.map((error) => (
              <div>{error}</div>
            ))}
          </div>
          <div>
            <input
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
          </div>
          <div className='login-button'>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
