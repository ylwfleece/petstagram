import React, { useEffect} from "react";
// import './SignUpForm.css'

import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// import {createPost} from '../../store/posts'
import { addFollow, unfollow } from '../../store/follows';
import { getPostsForUser } from "../../store/posts";
import SideBar from '../HomePage/SideBar'
import './SearchResults.css'

const SearchResults = ({ authenticated, setAuthenticated }) => {

  const dispatch = useDispatch();

  const searchResults = useSelector(state => state.search);
  const follows = useSelector(state => state.follows);
  const followIds = follows.map(follow => follow.id);

  const followUser = async (e) => {
    dispatch(addFollow(e.target.id))
    dispatch(getPostsForUser())
  }
  const unfollowUser = async (e) => {
    dispatch(unfollow(e.target.id))
    dispatch(getPostsForUser())
  }

  return (
    <div className='homepage'>

      <div className='page-container homepage-container'>
        {/* <div>
        search results:
      </div> */}
        <div className='homepage-feed'>
          {searchResults && searchResults.map(user => (
            <div key={user.id} className="search-result container">
              <div className='post-user-info' style={{ borderBottom: 'none', justifyContent: 'space-between' }}>
                <div className='flex-container'>
                  <div className='rounded-img-container search-results-pictures' >
                    <Link to={`/users/${user.id}/posts`}>
                      <img alt="profile_photo search-results-pictures" src={user.profilePhotoUrl} className='search-results-pictures'></img>
                    </Link>
                  </div>
                  <div className='flex-container' style={{ alignItems: 'center' }}>
                    <Link to={`/users/${user.id}/posts`}>
                      <h5 className='normalize-text redirect-profile' style={{ color: 'rgb(38, 38, 38)', fontWeight: '600' }}>
                        {user.username}
                      </h5>
                    </Link>
                  </div>
                </div>
                <div className='flex-container' style={{ alignItems: 'center' }}>
                  <div className='flex-container follow-button-container'>
                    {followIds.includes(user.id) ?
                      <button
                        className='unfollow-button'
                        id={user.id}
                        onClick={unfollowUser}>
                        Unfollow
                  </button> :
                      <button
                        className='blue-submit-button follow-button'
                        id={user.id}
                        onClick={followUser}>
                        Follow
                  </button>
                    }
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div >
  );
};

export default SearchResults;
