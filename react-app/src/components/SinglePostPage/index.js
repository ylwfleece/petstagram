import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { fetchComments } from '../../store/comments'
import './SinglePostPage.css'

function SinglePostPage() {
    const dispatch = useDispatch()
    const comments = useSelector((state) => state.comments)
    const user = useSelector((state) => state.session.user)
    const posts = useSelector((state) => state.posts)
    let { postId } = useParams()
    postId = parseInt(postId, 10)

    useEffect(() => {
        if (!isNaN(postId)) {
            console.log(postId)
            dispatch(fetchComments(postId))
        }
    }, [dispatch])

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
                <div className='container' style={{ marginTop: '3vh' }}>
                    <div className='rounded-img-container' style={{ alignSelf: 'flex-start', width: '32px', height: '32px' }}>
                        <img src={post.photo} alt='profilepicposter' style={{ width: '32px', height: '32px' }} />
                    </div>
                    <div>
                        <h5>{post.username}</h5>
                    </div>
                    <div>
                        <img src={post.imageLinks} alt='postphoto' />
                    </div>
                    <div>
                        {
                            comments.map(
                                comment =>
                                    <div className='comments-container'>
                                        <div className='comments-content-container'>
                                            <p>{comment.content}</p>
                                        </div>
                                        <div>
                                            <h5>{comment.username}</h5>
                                        </div>
                                        <div>
                                            <img src={comment.photo} alt='commenter-profile' />
                                        </div>
                                    </div>
                            )
                        }
                    </div>
                </div>
            }
        </div>
    )
}


export default SinglePostPage
