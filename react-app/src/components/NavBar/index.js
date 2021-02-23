import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { Home, FavoriteBorder, Search, MailOutline, Explore } from '@material-ui/icons'
import petstagramlogo2 from './petstagramlogo2.png'
import './NavBar.css'

const NavBar = ({ setAuthenticated }) => {
  return (
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
            {/* <NavLink to="/login" exact={true} activeClassName="active"> */}
            <MailOutline style={{ fontSize: '30px', color: 'rgb(38, 38, 38)' }} />
            {/* </NavLink> */}
          </div>
          <div className='explore'>
            {/* <NavLink to="/sign-up" exact={true} activeClassName="active"> */}
            <Explore style={{ fontSize: '30px', color: 'rgb(38, 38, 38)' }} />
            {/* </NavLink> */}
          </div>
          <div className='activity'>
            {/* <NavLink to="/users" exact={true} activeClassName="active"> */}
            <FavoriteBorder style={{ fontSize: '30px', color: 'rgb(38, 38, 38)' }} />
            {/* </NavLink> */}
          </div>
          <div className='logout'>
            <LogoutButton setAuthenticated={setAuthenticated} />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
