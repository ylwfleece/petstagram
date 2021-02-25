const SET_COMMENT_LIKES = "likes/setCommentLikes";
const SET_POST_LIKES = "likes/setPostLikes";
const SET_COMMENT_LIKES = "likes/makeCommentLikes";
const MAKE_POST_LIKES = "likes/makePostLikes";

const setCommentLikes = (likes) => {
  return {
    type: SET_COMMENT_LIKES,
    payload: likes,
  };
};
const setPostLikes = (likes) => {
  return {
    type: SET_POST_LIKES,
    payload: likes,
  };
};
const makeCommentLikes = (likes) => {
  return {
    type: MAKE_COMMENT_LIKES,
    payload: likes,
  };
};
const makeCommentLikes = (likes) => {
  return {
    type: MAKE_POST_LIKES,
    payload: likes,
  };
};

export const getCommentLikes = (id) => async (dispatch) => {
  let likes = await fetch(`/api/likes/comments/${id}`);
  likes = await likes.json();
  dispatch(setCommentLikes(likes));
  return likes;
};
export const getPostLikes = (id) => async (dispatch) => {
  let likes = await fetch(`/api/likes/posts/${id}`);
  likes = await likes.json();
  dispatch(setPostLikes(likes));
  return likes;
};
export const createPostLikes = (id) => async (dispatch) => {
  let likes = await fetch(`/api/likes/posts/${id}`);
  likes = await likes.json();
  dispatch(makePostLikes(likes));
  return likes;
};
export const createCommentLikes = (id) => async (dispatch) => {
  let likes = await fetch(`/api/likes/comments/${id}`);
  likes = await likes.json();
  dispatch(makeCommentLikes(likes));
  return likes;
};

const initialState = [];

const likesReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_COMMENT_LIKES:
      newState = [...state];
      newState = action.payload;
      return newState;
    case SET_POST_LIKES:
      newState = [...state];
      newState = action.payload;
      return newState;

    case MAKE_COMMENT_LIKES:
      if (newState) {
        newState.push(action.payload);
        return newState;
      } else {
        newState = [action.payload];
        return newState;
      }
    case MAKE_POST_LIKES:
      if (newState) {
        newState.push(action.payload);
        return newState;
      } else {
        newState = [action.payload];
        return newState;
      }
    default:
      return statel;
  }
};

export default likesReducer;
