import React, { useState } from "react";
import {  useParams, Link } from 'react-router-dom';
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
    // console.log(userUrlId.id)
    
    const openModal = (e) => {
        setTargetPhoto(e.target.src);
        setTargetCaption(e.target.alt);
        setPostId(e.target.id);
        setIsOpen(true);
        setGetCreatedAt(e.target.name)
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    // const filteredPosts = userPosts.filter(post => {
    //     return post.userId === sessionUserId;
    // });

    let filteredPosts = [];
    userPosts.forEach(post => {
        if (post.userId == userUrlId.id) {
            filteredPosts.push(post)
            console.log(filteredPosts)
        }
    })

    const userImageLinks = filteredPosts.map(post => {
        return post.imageLinks;
    });

    const userImageIdMap = filteredPosts.map(post => {
        return post.userId;
    });

    const userImageId = userImageIdMap[0];

    const handleCommentClick = (e) => {
        e.preventDefault();
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

    return (
        <div className='center-me'>
            <div className='post-container'>
                {!userImageLinks && <h3>You have no posts yet!</h3>}
                {filteredPosts && filteredPosts.map(post => {
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
                                    <Modal 
                                        isOpen={modalIsOpen}
                                        onRequestClose={closeModal}
                                        style={customStyles}
                                        contentLabel="userPictureModal"
                                        >
                                            <div className='comments-modal'>
                                                <img src={targetPhoto} alt="post" className='modal-picture' />
                                                <div className='username-field'>
                                                    <Link to={`/users/${post.userId}/posts`}>
                                                        <img src={post.photo} alt="profile" className='profile-photo'/>
                                                    </Link>
                                                    <Link to={`/users/${post.userId}/posts`}>
                                                        <h4 className='username-text'>{post.username}</h4>
                                                    </Link>
                                                </div>
                                                <div className='caption-field'>
                                                    <Link to={`/users/${post.userId}/posts`}>
                                                        <img src={post.photo} alt="profile" className='profile-photo'/>
                                                    </Link>
                                                    <Link to={`/users/${post.userId}/posts`}>
                                                        <h4 className='username-text-before-caption'>{post.username}</h4>
                                                    </Link>
                                                    <p className='caption-text'>{targetCaption}</p>
                                                <div >
                                                    {postComments && postComments.map((eachComment) => {
                                                        if (eachComment.postId == postId) {
                                                            return (
                                                                <div className='user-responses'>
                                                                    <Link to={`/users/${post.userId}/posts`}>
                                                                        <img src={eachComment.photo} alt="profile" className='profile-photo'/>
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
                                                            id={post.id}
                                                            />
                                                            ) : (
                                                            <FavoriteBorder
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
                     
                })}
            </div>
        </div>
    );
}

export default UserProfile;