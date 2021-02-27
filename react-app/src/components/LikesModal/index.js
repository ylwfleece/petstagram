import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommentLikes, getPostLikes, getAllLikes } from "../../store/likes";
import Modal from "react-modal";

const CommentLikeModal = () => {
  const dispatch = useDispatch();
  const sessionUserId = useSelector((state) => state.session.user.id);
  const sessionUserName = useSelector((state) => state.session.user.username);
  const sessionProfilePhoto = useSelector(
    (state) => state.session.user.profilePhotoUrl
  );
  //   const comment = useSelector((state) => state.comments[20]);
  const allComments = useSelector((state) => state.comments);
  const likes = useSelector((state) => state.likes.likes);
  const commentLikes = useSelector((state) => state.likes.comment_likes);

  //   if (comment) {
  //     console.log(comment.id);
  //   }
  //   useEffect(() => {
  //     if (allComments.length) {
  //       console.log(allComments.length);
  //       dispatch(getCommentLikes(allComments[20].id));
  //     }
  //   }, [dispatch]);

  useEffect(() => {
    dispatch(getAllLikes());
  }, [dispatch]);

  let commentsLikeArr = [];

  if (likes) {
    if (likes.length) {
      commentsLikeArr = likes.filter((like) => {
        return like.commentId === allComments[20].id;
      });
    }
  }
  console.log("CommentsLikeArr", commentsLikeArr);
  let likesMap;
  if (commentsLikeArr.length) {
    likesMap = commentsLikeArr.map((like) => {
      return [like.username, like.profilePhoto];
    });
  }
  console.log("likesMap", likesMap);
  return (
    <>
      <div>
        {likesMap &&
          likesMap.map((like) => (
            <div key={like.id}>
              <p>{like[0]}</p>
              {/* <p>{like[1]}</p> */}
              <img src={like[1]} alt="photoUrl" />
            </div>
          ))}
      </div>
    </>
  );
};
export default CommentLikeModal;
