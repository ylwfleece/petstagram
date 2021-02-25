import React, { useState } from "react";
import { Redirect, useHistory } from 'react-router-dom';
// import './SignUpForm.css'
import petstagramlogo from '../NavBar/petstagramlogo.png'
import {useDispatch} from 'react-redux'
import {createPost} from '../../store/posts'

const PostForm = ({ authenticated, setAuthenticated }) => {
  const [caption, setCaption] = useState("");
  const [photoFile, setPhotoFile] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const onPost = async (e) => {
    e.preventDefault();
    const post = dispatch(createPost(caption, photoFile));
    history.push('/')
  };

  const updateCaption = (e) => {
    setCaption(e.target.value);
  };

  const updatePhotoFile = (e) => {
    setPhotoFile(e.target.files[0]);
  }


  return (
    <div className='page-container'>
      <div>
        <div className='form-container'>
          <img src={petstagramlogo} alt='logo' style={{ padding: '5px 5rem' }} />
          <div className='paragraph-container'>
            <p className='paragraph' style={{ color: 'rgb(155, 155, 155)', fontSize: '18px' }}>Sign up to see pet photos and videos from your friends.</p>
          </div>
          <form onSubmit={onPost}>
            <div className='field-inputs'>
              <input
                type="text"
                name="caption"
                placeholder='Caption'
                onChange={updateCaption}
                value={caption}
              ></input>
            </div>
            <div>
              <label htmlFor="user_file">Upload Your File</label>
              <input
                type="file"
                name="user_file"
                onChange={updatePhotoFile}
              //  value={profilePhotoUrl}
              />
            </div>
            <div className='submit-button-container' style={{ marginTop: '18px' }}>
              <button type="submit" className='blue-submit-button'>Submit Post</button>
            </div>
            
          </form>
          <div className='errors-container'>
            {/* {errors.map((error) => (
              <div className='errors'>{error}</div>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
