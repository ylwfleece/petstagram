import React, { useState } from "react";
import { Redirect, useHistory } from 'react-router-dom';
// import './SignUpForm.css'
import petstagramlogo from '../NavBar/petstagramlogo.png'
import {useDispatch} from 'react-redux'
// import {createPost} from '../../store/posts'

const SearchResults = ({ authenticated, setAuthenticated }) => {
//   const [caption, setCaption] = useState("");
//   const [photoFile, setPhotoFile] = useState("");
//   const dispatch = useDispatch();
//   const history = useHistory();

//   const onPost = async (e) => {
//     e.preventDefault();
//     const post = dispatch(createPost(caption, photoFile));
//     history.push('/')
//   };

//   const updateCaption = (e) => {
//     setCaption(e.target.value);
//   };

//   const updatePhotoFile = (e) => {
//     setPhotoFile(e.target.files[0]);
//   }




  return (
    <div className='page-container'>
      <div>
        in search results: 
      </div>
    </div>
  );
};

export default SearchResults;
