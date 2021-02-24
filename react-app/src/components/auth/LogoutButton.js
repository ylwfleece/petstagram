import React from "react";
import { logout } from "../../services/auth";
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../store/session';
import { removePostsOnLogout } from '../../store/posts';

const LogoutButton = ({ setAuthenticated }) => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
    dispatch(logoutUser())
    dispatch(removePostsOnLogout())
  };

  return <button onClick={onLogout} className='dropdown-item-redirect'>Log Out</button>;
};

export default LogoutButton;
