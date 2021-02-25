import React, { useState } from "react";
import { Redirect, useHistory } from 'react-router-dom';
// import './SignUpForm.css'
import petstagramlogo from '../NavBar/petstagramlogo.png'
import {useDispatch, useSelector} from 'react-redux'
// import {createPost} from '../../store/posts'

const SearchResults = ({ authenticated, setAuthenticated }) => {

    const searchResults = useSelector(state => state.search);
  return (
    <div className='page-container'>
      <div>
        search results: 
      </div>
      {searchResults && searchResults.map(user => (
          <div key={user.id} className="search-result container">
              {/* <Link to={`/project/${project.id}`}> */}
            <p>
                {user.username}
            </p>
            
              {/* </Link> */}
              {/* <p key={project.costPerShare}>cost per share: ${project.costPerShare} {(!(purchasedProjects.includes(project.id) || watchlistedProjects.includes(project.id))) && <button onClick={(e) => addToWatchlist(e, project.id)}>add to watchlist</button>}</p> 
              <p key={project.id} className="success" hidden={(!success || watchProjectId !== project.id)}>successfully added to watchlist</p>  */}
          </div>
        ))}
    </div>
  );
};

export default SearchResults;
