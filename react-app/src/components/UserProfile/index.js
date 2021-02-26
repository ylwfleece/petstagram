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
    

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        const onClick = (event) => {
            console.log(event.target)
        }
    },[Modal])


    const userImageLinks = userPosts.map(eachPicture => {
        return eachPicture.imageLinks;
    });
    const userImageIdMap = userPosts.map(eachPicture => {
        return eachPicture.userId;
    });

    const userImageId = userImageIdMap[0];
    const myImageLink = userImageLinks[0];
    console.log(myImageLink);
    const myImages = userImageLinks;

    // images.map(image => <div><Modal><img src={image.url}/> </Modal></div>)

    return (
        <>
        <div className='center-me'>
            <div className='post-container'>
                {!userImageLinks && <h3>You have no posts yet!</h3>}
                {userImageLinks && userImageLinks.map(image => {
                    if (sessionUserId === userImageId) {
                        let theImageINeed;
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
                                            {console.log(image)}
                                        <img src={image} className='each-post'>{console.log(myImages)}</img>
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