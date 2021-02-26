import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Modal from 'react-modal';
import './userProfile.css';


const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      
    }
  };

Modal.setAppElement('body');

const UserProfile = () => {
    const dispatch = useDispatch();
    const sessionUserId = useSelector(state => state.session.user.id);
    const sessionUserName = useSelector(state => state.session.user.username);
    const sessionProfilePhoto = useSelector(state => state.session.user.profilePhotoUrl);
    const userPosts = useSelector(state => state.posts);
    const captionMap = userPosts.map(post => {
        return post.caption
    })

    const helperFunction = (captionMap) => {

    }

    const [modalIsOpen, setIsOpen] = useState(false);
    const [targetPhoto, setTargetPhoto] = useState([])
  

    const openModal = (image) => {
        console.log(image.target.alt.caption)
        
        setTargetPhoto(image.target.src)
        setIsOpen(true);
    };
    
    const closeModal = () => {
        setIsOpen(false);
    };

    const userImageLinks = userPosts.map(eachPicture => {
        return eachPicture.imageLinks;
    });
    const userImageIdMap = userPosts.map(eachPicture => {
        return eachPicture.userId;
    });

    const userImageId = userImageIdMap[0];

    return (
        <>
        <div className='center-me'>
            <div className='post-container'>
                {!userImageLinks && <h3>You have no posts yet!</h3>}
                {userImageLinks && userImageLinks.map(image => {
                    if (sessionUserId === userImageId) {
                        return (
                            <>
                                <div className='each-post'>
                                    <img src={image} alt={userPosts} className='each-picture' onClick={openModal}></img>
                                    <Modal 
                                        isOpen={modalIsOpen}
                                        onRequestClose={closeModal}
                                        style={customStyles}
                                        contentLabel="userPictureModal"
                                        >
                                            <div className='comments-modal'>
                                                <img src={targetPhoto} className='modal-picture'></img>
                                                <div className='username-field'>
                                                    <img src={sessionProfilePhoto} className='profile-photo'/>
                                                    <h4 className='username-text'>{sessionUserName}</h4>
                                                </div>
                                                <p className='caption-field'>{captionMap[0]}</p>
                                                <p className='like-message-field'>I am likes/messages</p>
                                                <p className='add-comment-field'>I am comments</p>
                                            </div>
                                    </Modal>
                                </div>
                            </>
                        )
                    }   
                })}

            </div>
        </div>
        </>
    );
}

export default UserProfile;