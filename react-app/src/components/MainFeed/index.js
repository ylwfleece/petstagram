import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom"
import { fetchComments, deleteComment } from '../../store/comments'
import { FavoriteBorder, MailOutline, ChatBubbleOutline, Favorite } from '@material-ui/icons'
import DeleteIcon from '@material-ui/icons/Delete'
import { deletePost } from '../../store/posts'
import './MainPage.css'
import TimeAgo from 'react-timeago'
import SideBar from '../HomePage/SideBar'
import {
    createCommentLikes,
    createPostLikes,
    getAllLikes,
    deletePostLikes,
    deleteCommentLikes,
} from "../../store/likes";

function MainFeed() {
    const dispatch = useDispatch()
    const comments = useSelector((state) => state.comments)
    const user = useSelector((state) => state.session.user)
    const likes = useSelector((state) => state.likes)
    const posts = useSelector((state) => state.posts)
    let commentsArr = []

    if (posts && comments) {
        commentsArr = posts.map((post) => {
            let unfiltered = comments.filter(comment => comment.postId == post.id)
            return unfiltered.slice(0, 3)
        })
        console.log(commentsArr)
    }

    let postLikeObj = {};
    if (likes) {
        posts.forEach((post) => {
            postLikeObj[post.id] = false;
            likes.forEach((like) => {
                if (like.userId == user.id && like.postId == post.id) {
                    postLikeObj[post.id] = true;
                }
            });
        });
    }

    const postLikeToggle = (e) => {
        let id = parseInt(e.target.id, 10);
        if (!isNaN(id)) {
            if (postLikeObj[id]) {
                dispatch(deletePostLikes(id));
            } else {
                dispatch(createPostLikes(id));
            }
        }
    };


    let commentLikeObj = {};
    if (likes) {
        if (likes.length) {
            commentsArr.forEach((commentList) => {
                commentList.forEach(comment => {
                    commentLikeObj[comment.id] = false;
                    console.log(comment.id)
                    likes.forEach((like) => {
                        if (like.userId == user.id && like.commentId == comment.id) {
                            commentLikeObj[comment.id] = true;
                        }
                    });
                })
            });
        }
    }
    const commentLikeToggle = (e) => {
        let id = parseInt(e.target.id, 10);
        if (!isNaN(id)) {
            if (commentLikeObj[id]) {
                dispatch(deleteCommentLikes(id));
            } else {
                dispatch(createCommentLikes(id));
            }
        }
    };

    const onDeletePost = (e) => {
        console.log(e.currentTarget.id)
        let id = parseInt(e.currentTarget.id, 10)
        console.log(id)
        if (!isNaN(id)) {
            dispatch(deletePost(id))
        }
    }

    // const onDeleteComment = (e) => {
    //   console.log(e.target.id)
    //   console.log(e.currentTarget.id)
    //   let id = parseInt(e.currentTarget.id, 10)
    //   console.log(id)
    //   if (!isNaN(id)) {
    //     dispatch(deleteComment(id))
    //   //   history.push('/')
    //   }
    // }

    return (<>
        {posts &&
            <div className='homepage'>
                <div className='page-container homepage-container' style={{ marginTop: '0' }}>
                    <div className='homepage-feed'>
                        {posts.map((post, index) =>
                            <div key={post.id} className='container posts' style={{ paddingTop: '0', marginBottom: '5vh' }}>
                                <div className='post-user-info'>
                                    <div className='rounded-img-container comments-profile-pictures' style={{ alignSelf: 'flex-start' }}>
                                        <Link to={`/users/${post.userId}/posts`}>
                                            <img src={post.photo} alt='profilepicposter' className='comments-profile-pictures redirect-profile' />
                                        </Link>
                                    </div>
                                    <div className='username-comments-container'>
                                        <Link to={`/users/${post.userId}/posts`}>
                                            <h5 className='post-username redirect-profile'>{post.username}</h5>
                                        </Link>
                                    </div>
                                </div>
                                <div className='post-image-container'>
                                    <img src={post.imageLinks} alt='postphoto' />
                                </div>
                                <div className='flex-left-container' style={{ width: '100%', height: '40px' }}>
                                    <div className='icons-container'>
                                        {postLikeObj[post.id] ? (
                                            <Favorite
                                                className="liked"
                                                onClick={postLikeToggle}
                                                id={post.id}
                                            />
                                        ) : (
                                                <FavoriteBorder
                                                    onClick={postLikeToggle}
                                                    id={post.id}
                                                />
                                            )}
                                        {console.log(post.id, user.id)}

                                    </div>
                                    <div className='icons-container'>
                                        <MailOutline />
                                    </div>
                                    <div className='icons-container'>
                                        <ChatBubbleOutline />
                                    </div>
                                    <div className='icons-container'>
                                        {post.userId == user.id &&
                                            <DeleteIcon id={post.id} onClick={onDeletePost} />
                                        }
                                    </div>
                                </div>
                                <div className='caption-section'>
                                    <div className='username-comments-container'>
                                        <Link to={`/users/${post.userId}/posts`}>
                                            <h5 className='post-username redirect-profile'>{post.username}</h5>
                                        </Link>
                                    </div>
                                    <div className='post-caption-container'>
                                        <p className='normalize-text caption'>{post.caption}</p>
                                    </div>
                                </div>
                                <div className='normalize-text flex-left-container' style={{ width: '100%', paddingLeft: '12px' }} >
                                    <TimeAgo date={post.createdAt} />
                                </div>
                                {commentsArr.length > 0 &&
                                    <div className='caption-section' style={{ flexDirection: 'column' }}>
                                        {
                                            commentsArr[index].map(
                                                comment =>
                                                    <div className='comments' key={comment.id} style={{ width: '100%' }}>
                                                        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                                                            <div className='rounded-img-container comments-profile-pictures'>
                                                                <Link to={`/users/${comment.userId}/posts`}>
                                                                    <img src={comment.photo} alt='commenter-profile' className='comments-profile-pictures' />
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className='flex-container' style={{ width: '496px' }}>
                                                                <div className='username-comments-container' >
                                                                    <Link to={`/users/${comment.userId}/posts`}>
                                                                        <h5 className='post-username redirect-profile' style={{ paddingLeft: '0' }}>{comment.username}</h5>
                                                                    </Link>
                                                                    <p className='normalize-text'>{comment.content}</p>
                                                                </div>
                                                            </div>
                                                            <div className='flex-container'>
                                                                <div className='normalize-text time-display'>
                                                                    <TimeAgo date={new Date(comment.createdAt)} />
                                                                    <p className='normalize-text' style={{ margin: '0 12px', fontSize: '10px', color: 'rgb(142, 142, 142)' }}>
                                                                        {`# likes`}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='icons-container' style={{ margin: '0 12px 0 24px', alignSelf: 'center' }}>
                                                            {commentLikeObj[comment.id] ? (
                                                                <Favorite
                                                                    className="liked"
                                                                    onClick={commentLikeToggle}
                                                                    id={comment.id}
                                                                />
                                                            ) : (
                                                                    <FavoriteBorder
                                                                        onClick={commentLikeToggle}
                                                                        id={comment.id}
                                                                    />
                                                                )}

                                                        </div>
                                                    </div>
                                            )
                                        }
                                    </div>
                                }
                                <Link to={`/posts/${post.id}`}>
                                    <h5 className='post-username redirect-profile'>See More</h5>
                                </Link>

                            </div>
                        )}
                    </div>
                </div>
                <SideBar />
            </div>
        }
    </>)
}

export default MainFeed
