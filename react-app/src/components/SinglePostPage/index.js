import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { fetchComments } from '../../store/comments'
import { FavoriteBorder, MailOutline, ChatBubbleOutline } from '@material-ui/icons'
import './SinglePostPage.css'

function SinglePostPage() {
    const dispatch = useDispatch()
    const comments = useSelector((state) => state.comments)
    const user = useSelector((state) => state.session.user)
    const posts = useSelector((state) => state.posts)
    let { postId } = useParams()
    postId = parseInt(postId, 10)

    // useEffect(() => {
    //     if (!isNaN(postId)) {
    //         console.log(postId)
    //         dispatch(fetchComments(postId))
    //     }
    // }, [dispatch])

    let post
    if (posts) {
        if (posts.length) {
            const found = posts.find(post => post.id === postId)
            if (found) {
                post = found
            }
        }
    }

    let commentsArr = []

    if (comments) {
        if (comments.length) {
            commentsArr = comments.filter((comment) => {
                return comment.postId === postId
            })
        }
    }



    return (
        <div>
            {post &&
                <div className='page-container'>
                    <div className='container posts' style={{ paddingTop: '0' }}>
                        <div className='post-user-info'>
                            <div className='rounded-img-container comments-profile-pictures' style={{ alignSelf: 'flex-start' }}>
                                <img src={post.photo} alt='profilepicposter' className='comments-profile-pictures' />
                            </div>
                            <div className='post-username-container'>
                                <h5 className='post-username'>{post.username}</h5>
                            </div>
                        </div>
                        <div className='post-image-container'>
                            <img src={post.imageLinks} alt='postphoto' />
                        </div>
                        <div className='flex-left-container' style={{ width: '100%', height: '40px' }}>
                            <div className='icons-container'>
                                <FavoriteBorder />
                            </div>
                            <div className='icons-container'>
                                <MailOutline />
                            </div>
                            <div className='icons-container'>
                                <ChatBubbleOutline />
                            </div>
                        </div>
                        <div className='caption-section'>
                            <div className='post-username-container'>
                                <h5 className='post-username'>{post.username}</h5>
                            </div>
                            <div className='post-caption-container'>
                                <p className='normalize-text caption'>{post.caption}</p>
                            </div>
                        </div>
                        <div className='caption-section' style={{ flexDirection: 'column' }}>
                            {
                                comments.map(
                                    comment =>
                                        <div className='comments' key={comment.id}>
                                            <div>
                                                <div className='rounded-img-container comments-profile-pictures'>
                                                    <img src={comment.photo} alt='commenter-profile' className='comments-profile-pictures' />
                                                </div>
                                            </div>
                                            <div className='post-username-container'>
                                                <h5 className='post-username'>{comment.username}</h5>
                                            </div>
                                            <div className='post-caption-container'>
                                                <p className='normalize-text'>{comment.content}</p>
                                            </div>
                                        </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}


export default SinglePostPage
