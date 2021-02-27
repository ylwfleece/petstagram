const ADD_A_COMMENT = "comments/ADD_A_COMMENT";
const FETCH_ALL_COMMENTS = "comments/FETCH_ALL_COMMENTS";
const DELETE_A_COMMENT = "comments/DELETE_A_COMMENT"

const addComment = (payload) => ({
  type: ADD_A_COMMENT,
  payload,
});

const fetchAllComments = (payload) => ({
  type: FETCH_ALL_COMMENTS,
  payload,
});

const deleteComment = (commentId) => ({
  type: DELETE_A_COMMENT,
  commentId,
})

//actions
// export const postComment = (postId, content) => {
//   return async (dispatch) => {
//       console.log(content)
//     const response = await fetch(`/api/comments/${postId}`, {
//       method: "POST",
//       body: JSON.stringify({content}),
//     });
//     dispatch(addComment(response));
//   };
// };

export const postComment = (postId, content) => async (dispatch) => {
  const formData = new FormData();
  formData.append("content", content);
  let res = await fetch(`/api/comments/${postId}`, {
    method: "POST",
    body: formData,
  });
  const comment = await res.json();
  dispatch(addComment(comment));
  return comment;
};

export const fetchComments = () => {
  return async (dispatch) => {
    const response = await fetch(`/api/comments/`);
    const responseJSON = await response.json();
    console.log("RESPONSE DATA", responseJSON);
    responseJSON.comments.sort((comment1, comment2) => {
      return Date.parse(comment2.createdAt) - Date.parse(comment1.createdAt)
    })
    dispatch(fetchAllComments(responseJSON.comments));
  };
};

export const deleteCommentById = (commentId) => async dispatch => {
  const res = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  })

  if (res.ok) {
    const comment = await res.json()
    dispatch(deleteComment(comment.commentId))
  }
}

//reducer
const initialState = [];

function commentsReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case ADD_A_COMMENT:
      newState = [...state, action.payload];
      return newState;
    case FETCH_ALL_COMMENTS:
      newState = Object.assign({}, state);
      newState = action.payload;
      return newState;
    case DELETE_A_COMMENT:
      newState = [...state]
      delete newState[action.commentId - 1]
    default:
      return state;
  }
}

export default commentsReducer;
