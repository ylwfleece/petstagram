const ADD_A_COMMENT = "comments/ADD_A_COMMENT";
const FETCH_ALL_COMMENTS = "comments/FETCH_ALL_COMMENTS";

const addComment = (payload) => ({
  type: ADD_A_COMMENT,
  payload,
});

const fetchAllComments = (payload) => ({
  type: FETCH_ALL_COMMENTS,
  payload,
});

export const editComment = (commentId, comment) => async (dispatch) => {
  console.log("commentId: ", commentId, "comment: ", comment)
  let res = await fetch(`/api/comments/edit/${commentId}`, {
    method: "POST",
    body: comment,
  });
  dispatch(fetchComments());
  return 'edited comment';
}

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

export const deleteComment = (commentId) => async (dispatch) => {
  const res = await fetch(`/api/comments/delete/${commentId}`);
  dispatch(fetchComments());
  return 'deleted comment ' + commentId; 
}

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
    default:
      return state;
  }
}

export default commentsReducer;
