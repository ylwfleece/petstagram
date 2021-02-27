import React, { useState, useRef } from "react";
import { Redirect, useHistory } from 'react-router-dom';
import './PostForm.css'
import petstagramlogo from '../NavBar/petstagramlogo.png'
import { CloudUploadOutlined } from '@material-ui/icons'
import { useDispatch } from 'react-redux'
import { createPost } from '../../store/posts'

const PostForm = ({ authenticated, setAuthenticated }) => {
  const [caption, setCaption] = useState("");
  const [photoFile, setPhotoFile] = useState("");
  const [selectedFile, setSelectedFile] = useState('Upload an Image')
  const dispatch = useDispatch();
  const history = useHistory();
  const fileInput = useRef(null)

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
    if (!e.target.files.length) {
      setSelectedFile('Upload an Image')
    } else {
      setSelectedFile(`${e.target.value.split('\\').pop()}`)
    }
  }


  return (
    <div className='page-container'>
      <div className='container'>
        <div>
          <div className='form-container'>
            <div className='flex-container' style={{ justifyContent: 'center', alignItems: 'center' }}>
              <img src={petstagramlogo} alt='logo' style={{ padding: '5px 5rem' }} />
            </div>
            <div className='paragraph-container flex-container' style={{ width: '100%', padding: '0', marginTop: '0', justifyContent: 'center' }}>
              <div style={{ width: '80%' }}>
                <p className='paragraph' style={{ color: 'rgb(155, 155, 155)', fontSize: '18px', textAlign: 'center' }}>Post a new pet photo to share with your friends.</p>
              </div>
            </div>
            <div className='flex-container' style={{ justifyContent: 'center' }}>
              <form onSubmit={onPost}>
                <div className='flex-container' style={{ justifyContent: 'center' }}>
                  <div className='normalize-text file-input' >
                    <label
                      className='upload-button'
                      onClick={() => fileInput.current.click()}
                    >
                      <div className='flex-container' style={{ justifyContent: 'center', alignItems: 'center', margin: '0', padding: '0 8px' }}>
                        <CloudUploadOutlined style={{ marginRight: '12px' }} />
                        <h5 className='normalize-text' style={{ margin: '0', overflow: 'hidden' }}>{selectedFile}</h5>
                      </div>
                    </label>
                    <input
                      style={{ display: 'none' }}
                      type="file"
                      name="user_file"
                      onChange={updatePhotoFile}
                      ref={fileInput}
                    //  value={profilePhotoUrl}
                    />
                  </div>
                </div>
                <div className='field-inputs'>
                  <input
                    type="text"
                    name="caption"
                    placeholder='Caption'
                    onChange={updateCaption}
                    value={caption}
                  />
                </div>
                <div className='submit-button-container' style={{ marginTop: '18px' }}>
                  <button type="submit" className='blue-submit-button'>Submit Post</button>
                </div>
              </form>
            </div>
            <div className='errors-container'>
              {/* {errors.map((error) => (
              <div className='errors'>{error}</div>
            ))} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
