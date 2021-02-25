import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux'
import ProfileButton from './ProfileButton'
import { Home, FavoriteBorder, Search, MailOutline, Explore } from '@material-ui/icons'
import petstagramlogo2 from './petstagramlogo2.png'
import './NavBar.css'

const NavBar = ({ setAuthenticated }) => {
  const user = useSelector(state => state.session.user)

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
          <input type='search' placeholder='Search'></input>
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
          <div style={{ padding: '0 12px' }}>
            <ProfileButton user={user} setAuthenticated={setAuthenticated} />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
