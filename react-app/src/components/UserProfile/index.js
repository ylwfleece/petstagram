import React, { useEffect, useState } from "react";
import { Redirect, useHistory, useParams, Link } from 'react-router-dom';
import { FavoriteBorder, MailOutline, ChatBubbleOutline } from '@material-ui/icons'
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
    const [getCreatedAt, setGetCreatedAt] = useState("")
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
        setGetCreatedAt(e.target.name)
    };

    // console.log(getCreatedAt)

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

    let postLikeObj = {};
    // if (likes) {
    //     posts.forEach((post) => {
    //         postLikeObj[post.id] = false;
    //         likes.forEach((like) => {
    //             if (like.userId == user.id && like.postId == post.id) {
    //                  postLikeObj[post.id] = true;
    //             }
    //         });
    //     });
    // }


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
                                            name={post.createdAt}
                                            />
                                            <div id={post.createdAt}></div>
                                    <Modal 

                                        isOpen={modalIsOpen}
                                        onRequestClose={closeModal}
                                        style={customStyles}
                                        contentLabel="userPictureModal"
                                        >
                                            <div className='comments-modal'>
                                                <img src={targetPhoto} className='modal-picture'></img>
                                                <div className='username-field'>
                                                    <Link to={`/users/${post.userId}/posts`}>
                                                        <img src={sessionProfilePhoto} className='profile-photo'/>
                                                    </Link>
                                                    <Link to={`/users/${post.userId}/posts`}>
                                                        <h4 className='username-text'>{sessionUserName}</h4>
                                                    </Link>
                                                </div>
                                                <div className='caption-field'>
                                                    <Link to={`/users/${post.userId}/posts`}>
                                                        <img src={sessionProfilePhoto} className='profile-photo'/>
                                                    </Link>
                                                    <Link to={`/users/${post.userId}/posts`}>
                                                        <h4 className='username-text-before-caption'>{sessionUserName}</h4>
                                                    </Link>
                                                    <p className='caption-text'>{targetCaption}</p>
                                                <div >
                                                    {postComments && postComments.map((eachComment) => {
                                                        if (eachComment.postId == postId) {
                                                            return (
                                                                <div className='user-responses'>
                                                                    <Link to={`/users/${post.userId}/posts`}>
                                                                        <img src={eachComment.photo} className='profile-photo'/>
                                                                    </Link>
                                                                    <Link to={`/users/${post.userId}/posts`}>
                                                                        <h4 className='other-users-who-commented'>{eachComment.username}</h4>
                                                                    </Link>
                                                                    <p className='username-comment'>{eachComment.content}</p>
                                                                </ div>
                                                            )
                                                        } 
                                                    })}
                                                </div>
                                            </div>
                            
                                                <div className='like-message-field'>
                                                    <div className='favorite-icon'>
                                                        {postLikeObj[post.id] ? (
                                                            <FavoriteBorder
                                                            className="liked"
                                                            // onClick={postLikeToggle}
                                                            id={post.id}
                                                            />
                                                            ) : (
                                                            <FavoriteBorder
                                                            // onClick={postLikeToggle}
                                                            id={post.id}
                                                            />
                                                        )}
                                                    </div>
                                                    <div className='main-icon'>
                                                        <MailOutline />
                                                    </div>
                                                    <div className='chat-bubble-icon'>
                                                        <ChatBubbleOutline />
                                                    </div>
                                                    <p className='display-time'>{getCreatedAt}</p>
                                                </div>
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