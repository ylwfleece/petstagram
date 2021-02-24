const SET_POSTS = "posts/setPosts"

const setPosts = (posts) => {
    return {
      type: SET_POSTS,
      payload: posts
    };
  };

export const getPostsForUser = (userId) => async (dispatch) => {
    const posts = await fetch(`/api/posts/${userId}`);
    dispatch(setPosts(posts));
    return posts;
  };

const initialState = { posts: null };

const postsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_POSTS:
      newState = Object.assign({}, state);
      newState.posts = action.payload;
      return newState;
    case REMOVE_POSTS:
      newState = Object.assign({}, state);
      newState.posts = null;
      return newState;
    default:
      return state;
  }
};

export default postsReducer;