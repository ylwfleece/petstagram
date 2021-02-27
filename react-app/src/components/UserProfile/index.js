import React, { useEffect, useState } from "react";
import { Redirect, useHistory, useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Modal from 'react-modal';
import { postComment } from '../../store/comments'
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
    console.log(useParams())
    const dispatch = useDispatch();
    const sessionUserId = useSelector(state => state.session.user.id);
    const sessionUserName = useSelector(state => state.session.user.username);
    const sessionProfilePhoto = useSelector(state => state.session.user.profilePhotoUrl);
    const postComments = useSelector(state => state.comments)
    const userPosts = useSelector(state => state.posts);
    
    const [modalIsOpen, setIsOpen] = useState(false);
    const [targetPhoto, setTargetPhoto] = useState([])
    const [targetCaption, setTargetCaption] = useState([])
    const [comment, setComment] = useState("")
    const [postId, setPostId] = useState(0)
    const [getComments, setGetComments] = useState([])
    const [errors, setErrors] = useState([])
  
    const userUrlId = useParams()
    
    const openModal = (e) => {
        // console.log(e.target.id)
        // console.log(e.target.src)
        // console.log(e.target.caption)
        // console.log(e.target.alt)
        setTargetPhoto(e.target.src);
        setTargetCaption(e.target.alt);
        setPostId(e.target.id);
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
    console.log(userImageId)
    console.log(userUrlId.id)
    const handleCommentClick = (e) => {
        e.preventDefault();
        console.log(comment)
        if (comment) {
            setErrors([]);
            setComment("")
            return dispatch(postComment(postId, comment))
            .catch(res => {
                if (res.data && res.data.errors) setErrors(res.data.errors)
            });
        };
        
        return setErrors(["Please leave a comment"])
    };

    return (
        <>
        <div className='center-me'>
            <div className='post-container'>
                {!userImageLinks && <h3>You have no posts yet!</h3>}
                {userPosts && userPosts.map(post => {
                    if (userUrlId.id == userImageId) {
                        return (
                            <>
                                <div className='each-post'>
                                        <img src={post.imageLinks[0]} 
                                            id={post.id}
                                            alt={post.caption} 
                                            className='each-picture' 
                                            onClick={openModal} 
                                        />
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
                                                <div className='caption-field'>
                                                    <img src={sessionProfilePhoto} className='profile-photo'/>
                                                    <h4 className='username-text-before-caption'>{sessionUserName}</h4>
                                                    <p className='caption-text'>{targetCaption}</p>
                                                    <div >
                                                    {postComments && postComments.map((eachComment) => {
                                                        if (eachComment.postId == postId) {
                                                            return (
                                                                <div className='user-responses'>
                                                                    <img src={eachComment.photo} className='profile-photo'/>
                                                                    <h4 className='other-users-who-commented'>{eachComment.username}</h4>
                                                                    <p className='username-comment'>{eachComment.content}</p>
                                                                </ div>
                                                            )
                                                        } 
                                                    })}
                                                    </div>
                                                </div>
                                                <p className='like-message-field'>I am likes/messages</p>
                                                <div className='add-comment-field'>
                                                    <textarea 
                                                        className='comment-text-area' 
                                                        placeholder='Add a comment...'
                                                        value={comment}
                                                        onChange={e => { setComment(e.target.value)}}
                                                    ></textarea>
                                                    <button className='comment-button' onClick={handleCommentClick}>Post</button>
                                                </div>
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