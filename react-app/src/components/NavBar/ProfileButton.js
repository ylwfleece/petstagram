import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import LogoutButton from '../auth/LogoutButton'
import { PersonOutline } from '@material-ui/icons'

const ProfileButton = ({ user, setAuthenticated }) => {
    const [showMenu, setShowMenu] = useState(false);

    let sessionButtons = (
        <div className="dropdown-menu popout">
            {/* <li className='dropdown-item'>{user.username}</li>
            <li className='dropdown-item'>{user.email}</li> */}
            <div className='dropdown-item'>
                <Link to={`/users/${user.id}`} >
                    <div className='dropdown-profile-redirect'>
                        <div>
                            <PersonOutline style={{ paddingRight: '0.25rem' }} />
                        </div>
                        <div>
                            {`${user.username}`}
                        </div>
                    </div>
                </Link>
            </div>
            <LogoutButton setAuthenticated={setAuthenticated} />
        </div>
    )

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    if (showMenu) {
        return (
            <>
                <button onClick={openMenu} id='dropdown-menu-button'>
                    <img src={user.profilePhotoUrl} alt='profilepic' />
                </button>
                {showMenu && sessionButtons}
            </>
        )
    } else {
        return (
            <>
                <button onClick={openMenu} id='dropdown-menu-button'>
                    <img src={user.profilePhotoUrl} alt='profilepic' />
                </button>
                {showMenu && sessionButtons}
            </>
        );
    }
}

export default ProfileButton;
