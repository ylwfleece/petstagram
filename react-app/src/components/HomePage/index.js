import React from 'react'
import { useSelector } from 'react-redux'
import './HomePage.css'

function HomePage() {
    const user = useSelector(state => state.session.user)


    return (user &&
        <div id='homepage'>
            <div className='page-container homepage-container' style={{ marginTop: '0' }}>
                <div className='homepage-feed'>
                    <div className='container feed-posts'>
                        <div className='posts-user-info'>
                            <div className='rounded-img-container'>
                                {/* <img src={user.profilePhotoUrl} alt='profilepic' /> */}
                            </div>
                        </div>
                        <h1>Hello</h1>
                    </div>
                </div>
            </div>
            <div className='sidebar'>
                <div className='user-display flex-left-container'>
                    <div className='rounded-img-container'>
                        <img src={user.profilePhotoUrl} alt='profilepic' />
                    </div>
                    <div>
                        <h5 className='normalize-text' style={{ color: 'rgb(38, 38, 38)', fontWeight: '600' }}>{user.username}</h5>
                        <p className='normalize-text'>{user.email}</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default HomePage
