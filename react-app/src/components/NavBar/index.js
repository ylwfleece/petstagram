import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { Home, FavoriteBorder, Search, MailOutline, Explore } from '@material-ui/icons'
import petstagramlogo2 from './petstagramlogo2.png';
import './NavBar.css';
import {searchUsers} from '../../services/search';
import { useState } from 'react';

const NavBar = ({ setAuthenticated }) => {
  const user = useSelector(state => state.session.user)

  const [searchTerm, setSearchTerm] = useState('');

  const updateSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const onSearch = async(e) => {
    e.preventDefault();
    const searchResults = await searchUsers(searchTerm);
    console.log(searchResults)
  }

  return (user &&
    <nav>
      <div className='menu'>
        <div className='logo'>
          <NavLink to="/" exact={true} activeClassName="active">
            <img src={petstagramlogo2} alt='logo' style={{ maxHeight: '50px' }}></img>
          </NavLink>
        </div>
        <div className='search'>
          <Search style={{ textAlign: 'center', color: 'rgb(142, 142, 142)', fontSize: '18px' }} />
          <form onSubmit={onSearch}>
            <div>
              <input onChange={updateSearchTerm} type='search' placeholder='Search by username'></input>
            </div>
            <div>
            <button type="submit">search</button>
            </div>
          </form>
        </div>
        <div className='user-buttons'>
          <div className='home'>
            <NavLink to="/" exact={true} activeClassName="active">
              <Home style={{ fontSize: '30px', color: 'rgb(38, 38, 38)' }} />
            </NavLink>
          </div>
          <div className='messages'>
            <MailOutline style={{ fontSize: '30px', color: 'rgb(38, 38, 38)' }} />
          </div>
          <div className='explore'>
            <Explore style={{ fontSize: '30px', color: 'rgb(38, 38, 38)' }} />
          </div>
          <div className='activity'>
            <FavoriteBorder style={{ fontSize: '30px', color: 'rgb(38, 38, 38)' }} />
          </div>
          <div>
            <ProfileButton user={user} setAuthenticated={setAuthenticated} />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
