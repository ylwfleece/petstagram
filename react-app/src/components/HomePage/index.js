import React from 'react'
import { useSelector } from 'react-redux'
import './HomePage.css'
import SideBar from './SideBar'

function HomePage() {
    const user = useSelector(state => state.session.user)

    return (user &&
        <div className='homepage'>
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
            <SideBar />
        </div>
    )
}

export default HomePage
