import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const SideBar = () => {
    const user = useSelector(state => state.session.user)
    return (user &&
        <div className='sidebar'>
            <div className='user-display flex-left-container'>
                <div className='rounded-img-container'>
                    <Link to={`/users/${user.id}`}>
                        <img src={user.profilePhotoUrl} alt='profilepic' />
                    </Link>
                </div>
                <div>
                    <Link to={`/users/${user.id}`}>
                        <h5 className='normalize-text redirect-profile' style={{ color: 'rgb(38, 38, 38)', fontWeight: '600' }}>{user.username}</h5>
                    </Link>
                    <div>

                        <p className='normalize-text'>{user.email}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBar
