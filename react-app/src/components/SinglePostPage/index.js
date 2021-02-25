import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useParams} from "react-router-dom"
import {fetchComments} from '../../store/comments'


function SinglePostPage(){
    const dispatch = useDispatch()
    const comments = useSelector((state) => state.comments)
    const user = useSelector((state) => state.session.user)
    const posts = useSelector((state) => state.posts)
    let {postId} = useParams()
    postId = parseInt(postId, 10)
    console.log("post Id", postId, typeof postId)

    useEffect(() => {
        dispatch(fetchComments(postId))
    }, [dispatch])

    let post

    if(posts){
        if(posts.length){
            console.log("Trying to find a post")
            const found = posts.find(post => post.id === postId)
            if(found){
                console.log("found a post")
                post = found
            }
        }
    }

    let commentsArr = []

    if(comments){
        if(comments.length){
            commentsArr = comments.filter((comment) =>{
                return comment.postId === postId
            })
        }
    }

    let profilePhoto
    if(user){
        console.log("Found a profile photo")
        profilePhoto = user.profilePhotoUrl
    }

    if(post && user){
        console.log("Testing the outputs", post, commentsArr, profilePhoto)
    }


return (
    <div>
        {profilePhoto && 
            <div>
                {profilePhoto}
            </div>
        }
    </div>
)
}
   

export default SinglePostPage