import React from "react";
import { useSelector } from "react-redux";

function CommentsPage() {
  const comments = useSelector((state) => state.comments);
 
  return (
    <>
      {comments && (
        <div className="page-container">
          {comments.map((IndividualComment) => {
            return (
              <div className="form-container">{IndividualComment.content}</div>
            );
          })}
        </div>
      )}
    </>
  );


}

export default CommentsPage;
