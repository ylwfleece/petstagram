import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { signUp } from '../../services/auth';

const SignUpForm = ({authenticated, setAuthenticated}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [profilePhotoFile, setProfilePhotoFile] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    console.log('-----profile photo file: ', profilePhotoFile)
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
    console.log(e.target.files[0])
    setProfilePhotoFile(e.target.files[0]);
  }

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <form encType="multipart/form-data" onSubmit={onSignUp}>
      <div>
        <label>User Name</label>
        <input
          type="text"
          name="username"
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type="text"
          name="email"
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type="password"
          name="repeat_password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <div>
        <label for="user_file">Upload Your File</label>
        <input 
         type="file" 
         name="user_file" 
         onChange={updateProfilePhotoFile} 
        //  value={profilePhotoUrl} 
        />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
