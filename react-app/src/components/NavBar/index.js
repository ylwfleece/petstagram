import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import { Home, FavoriteBorder, Search, MailOutline, Explore } from '@material-ui/icons'
import petstagramlogo2 from './petstagramlogo2.png';
import './NavBar.css';
import { searchUsers } from '../../store/search';
import { useState } from 'react';
import { getFollowsForUser } from '../../store/follows';

const NavBar = ({ setAuthenticated }) => {

  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user)

  const [searchTerm, setSearchTerm] = useState('');

  const updateSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const onSearch = async (e) => {
    e.preventDefault();
    const searchResults = dispatch(searchUsers(searchTerm));
    const follows = dispatch(getFollowsForUser());
    history.push('/search-results')
  }

  const iconStyles = { fontSize: '30px', color: 'rgb(38, 38, 38)' }

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
          <div className='icons-container'>
            <NavLink to="/" exact={true} activeClassName="active">
              <Home style={iconStyles} />
            </NavLink>
          </div>
          <div className='icons-container'>
            <MailOutline style={iconStyles} />
          </div>
          <div className='icons-container'>
            <Explore style={iconStyles} />
          </div>
          <div className='icons-container'>
            <FavoriteBorder style={iconStyles} />
          </div>
          <div style={{ padding: '0 12px' }}>
            <ProfileButton user={user} setAuthenticated={setAuthenticated} />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
