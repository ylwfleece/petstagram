import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from 'react-router-dom';
// import './SignUpForm.css'
import petstagramlogo from '../NavBar/petstagramlogo.png'
import { useDispatch, useSelector } from 'react-redux'
// import {createPost} from '../../store/posts'
import { addFollow, unfollow } from '../../store/follows';

const SearchResults = ({ authenticated, setAuthenticated }) => {

  const dispatch = useDispatch();

  const searchResults = useSelector(state => state.search);
  const follows = useSelector(state => state.follows);
  const followIds = follows.map(follow => follow.id);

  const followUser = async (e) => {
    console.log(e.target.id);
    dispatch(addFollow(e.target.id))
  }
  const unfollowUser = async (e) => {
    console.log(e.target.id)
    dispatch(unfollow(e.target.id))
  }

  useEffect(() => {
    console.log('useeffect triggered')
  }, [dispatch])

  return (
    <div className='page-container'>
      <div>
        search results:
      </div>
      {searchResults && searchResults.map(user => (
        <div key={user.id} className="search-result container">
          <p>
            {user.username}
          </p>
          <p>
            {followIds.includes(user.id) ? 
            <button 
              id={user.id}
              onClick={unfollowUser}>
                unfollow
            </button> :
            <button 
              id={user.id}
              onClick={followUser}>
                follow
            </button>
            }
          </p>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
