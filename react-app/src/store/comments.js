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

export const fetchComments = (id) => {
  return async (dispatch) => {
    const response = await fetch(`/api/comments/${id}`);
    const responseJSON = await response.json();
    console.log("RESPONSE DATA", responseJSON);
    dispatch(fetchAllComments(responseJSON.comments));
  };
};
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
    default:
      return state;
  }
}

export default commentsReducer;
