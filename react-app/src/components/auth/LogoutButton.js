import React from "react";
import { logout } from "../../services/auth";
import {useDispatch} from 'react-redux'
import {logoutUser} from '../../store/session'

const LogoutButton = ({setAuthenticated}) => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
    dispatch(logoutUser())
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
