import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../services/auth";
import './LoginForm.css'
import petstagramlogo from '../NavBar/petstagramlogo.png'
import { useDispatch } from 'react-redux'
import { addUser } from '../../store/session'
import { getPostsForUser } from '../../store/posts'

const LoginForm = ({ authenticated, setAuthenticated }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      setAuthenticated(true);
      dispatch(addUser(user));
      dispatch(getPostsForUser());
    } else {
      setErrors(user.errors);
    }
  };

    const onLoginDemo = async (e) => {
    e.preventDefault();
    const user = await login("demo@aa.io", "password");
    if (!user.errors) {
      setAuthenticated(true);
      dispatch(addUser(user));
      dispatch(getPostsForUser());
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
    <div className='page-container'>
      <div>
        <div className='container'>
          <img src={petstagramlogo} alt='logo' style={{ padding: '5px 5rem' }} />
          <form onSubmit={onLogin}>
            <div className='field-inputs'>
              <input
                name="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div className='field-inputs'>
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={updatePassword}
              />
            </div>
            <div className='submit-button-container' style={{ marginTop: '18px' }}>
              <button type="submit" className='blue-submit-button'>Log In</button>
            </div>
          </form>
          <div className='errors-container'>
            {errors.map((error) => (
              <div className='errors'>{error}</div>
            ))}
          </div>
        </div>
        <div>
          <div className='container redirect-container'>
            <p>Don't have an account? <nobr><a href='/sign-up'>Sign up</a></nobr></p>
            <p>Use a demo account? <nobr><a onClick={onLoginDemo} className='demo-link'>Demo</a></nobr></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
