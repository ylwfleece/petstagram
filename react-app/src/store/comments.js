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
export const postComment = (userId, postId) => {
  return async (dispatch) => {
    const response = await fetch(`/api/comments`, {
      method: "POST",
      body: JSON.stringify({ userId, postId }),
    });
    dispatch(addComment(response));
  };
};

export const fetchComments = () => {
  return async (dispatch) => {
    const response = await fetch(`/api/comments/`);
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
