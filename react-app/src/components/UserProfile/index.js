import React, { useState } from "react";
import { Redirect, useHistory } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import CommentModal  from '../Modal/comment-modal'
import './userProfile.css'

const UserProfile = () => {
    const dispatch = useDispatch();
    const sessionUserId = useSelector(state => state.session.user.id);
    const userPosts = useSelector(state => state.posts);
    const [ modalOpen, setModalOpen] = useState(false)

    const showModal = () => {
        setModalOpen(true)
    };

    const hideModal = () => {
        setModalOpen(false);
    };
    
    
    const userImageLinks = userPosts.map(eachPicture => {
        return eachPicture.imageLinks
    });
    const userImageIdMap = userPosts.map(eachPicture => {
        return eachPicture.userId
    });

    const userImageId = userImageIdMap[0];
    


    return (
        <>
        <div className='center-me'>
            <div className='post-container'>
                {!userImageLinks && <h3>You have no posts yet!</h3>}
                {userImageLinks && userImageLinks.map(images => {
                    if (sessionUserId === userImageId) {
                        return (
                            <>
                                <div className='each-post'>
                                    <img src={images} className='each-picture'></img>
                                </div>
                            </>
                        )
                    }   
                })}
            </div>
            </div>
        </>
    )
}

export default UserProfile;