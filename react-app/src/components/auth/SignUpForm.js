import React, { useState, useRef } from "react";
import { Redirect } from 'react-router-dom';
import { signUp } from '../../services/auth';
import './SignUpForm.css'
import petstagramlogo from '../NavBar/petstagramlogo.png'
import { useDispatch } from 'react-redux'
import { addUser } from '../../store/session'
import { CloudUploadOutlined } from '@material-ui/icons'

const SignUpForm = ({ authenticated, setAuthenticated }) => {
  const fileInput = useRef(null)
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [profilePhotoFile, setProfilePhotoFile] = useState("");
  const [selectedFile, setSelectedFile] = useState("Upload an Image")
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(username, email, password, profilePhotoFile);
      if (!user.errors) {
        setAuthenticated(true);
        dispatch(addUser(user))
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
    if (!e.target.files.length) {
      setSelectedFile('Upload an Image')
    } else {
      setSelectedFile(`${e.target.value.split('\\').pop()}`)
    }
  }

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className='page-container'>
      <div>
        <div className='container'>
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
            <div className='flex-container' style={{ justifyContent: 'center' }}>
              <div className='normalize-text file-input ' >
                <label
                  className='upload-button'
                  onClick={() => fileInput.current.click()}
                >
                  <div className='flex-container' style={{ justifyContent: 'center', alignItems: 'center', margin: '0' }}>
                    <CloudUploadOutlined style={{ marginRight: '12px' }} />
                    <h5 className='normalize-text' style={{ margin: '0' }}>{selectedFile}</h5>
                  </div>
                </label>
                <input
                  style={{ display: 'none' }}
                  type="file"
                  name="user_file"
                  onChange={updateProfilePhotoFile}
                  ref={fileInput}
                //  value={profilePhotoUrl}
                />
              </div>
            </div>
            <div className='submit-button-container' style={{ marginTop: '18px' }}>
              <button type="submit" className='blue-submit-button'>Sign Up</button>
            </div>
          </form>
          <div className='errors-container'>
            {/* {errors.map((error) => (
              <div className='errors'>{error}</div>
            ))} */}
          </div>
        </div>
        <div className='container redirect-container'>
          <p>Have an account? <nobr><a href='/login'>Log in</a></nobr></p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
