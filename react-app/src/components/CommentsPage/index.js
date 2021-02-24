import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchComments, postComment } from "../../store/comments";

function CommentsPage() {
  const comments = useSelector((state) => state.comments.comments);
  //   const user? = state.session.user?
  //const post? = state.post.post?
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComments());
    //ideally I would want to pass in the postid into fetchComments to
    //grab the comments associated to this particular post, but that is
    //up in the air atm
  }, [dispatch]);

  return <>{comments && <div>{comments.content}</div>}</>;

  // return (
  //   <>
  //     <div>"hello"</div>
  //   </>
  // );
  //also include the useSelector for post to display the post on this page as
  // well
}

export default CommentsPage;
