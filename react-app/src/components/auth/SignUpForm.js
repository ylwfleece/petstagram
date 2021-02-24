import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { signUp } from '../../services/auth';
import './SignUpForm.css'
import petstagramlogo from '../NavBar/petstagramlogo.png'

const SignUpForm = ({ authenticated, setAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [profilePhotoFile, setProfilePhotoFile] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(username, email, password, profilePhotoFile);
      if (!user.errors) {
        setAuthenticated(true);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateProfilePhotoFile = (e) => {
    setProfilePhotoFile(e.target.files[0]);
  }

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className='page-container'>
      <div>
        <div className='form-container'>
          <img src={petstagramlogo} alt='logo' style={{ padding: '5px 5rem' }} />
          <div className='paragraph-container'>
            <p className='paragraph' style={{ color: 'rgb(155, 155, 155)', fontSize: '18px' }}>Sign up to see pet photos and videos from your friends.</p>
          </div>
          <form onSubmit={onSignUp}>
            <div className='field-inputs'>
              <input
                type="text"
                name="username"
                placeholder='Username'
                onChange={updateUsername}
                value={username}
              ></input>
            </div>
            <div className='field-inputs'>
              <input
                type="text"
                name="email"
                placeholder='Email'
                onChange={updateEmail}
                value={email}
              ></input>
            </div>
            <div className='field-inputs'>
              <input
                type="password"
                name="password"
                placeholder='Password'
                onChange={updatePassword}
                value={password}
              ></input>
            </div>
            <div className='field-inputs'>
              <input
                type="password"
                name="repeat_password"
                placeholder='Confirm password'
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
              ></input>
            </div>
            <div className='submit-button-container' style={{ marginTop: '18px' }}>
              <button type="submit" className='blue-submit-button'>Sign Up</button>
            </div>
            <div>
              <label htmlFor="user_file">Upload Your File</label>
              <input
                type="file"
                name="user_file"
                onChange={updateProfilePhotoFile}
              //  value={profilePhotoUrl}
              />
            </div>
          </form>
          <div className='errors-container'>
            {/* {errors.map((error) => (
              <div className='errors'>{error}</div>
            ))} */}
          </div>
        </div>
        <div className='form-container redirect-container'>
          <p>Have an account? <nobr><a href='/login'>Log in</a></nobr></p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
