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
      transform             : 'translate(-50%, -50%)'
    }
  };

Modal.setAppElement('body');

const UserProfile = () => {
    const dispatch = useDispatch();
    const sessionUserId = useSelector(state => state.session.user.id);
    const userPosts = useSelector(state => state.posts);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [targetPhoto, setTargetPhoto] = useState([])


    const openModal = (image) => {
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
                                    <img src={image} className='each-picture' onClick={openModal}></img>
                                    <Modal 
                                        isOpen={modalIsOpen}
                                        onRequestClose={closeModal}
                                        style={customStyles}
                                        contentLabel="userPictureModal"
                                        >
                                        <img src={targetPhoto} className='each-post'></img>
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