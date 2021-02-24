const SET_POSTS = "posts/setPosts"
const REMOVE_POSTS = "posts/removePosts"

const setPosts = (posts) => {
    return {
      type: SET_POSTS,
      payload: posts
    };
  };

const removePosts = () => {
    return {
      type: REMOVE_POSTS
    };
  };

export const getPostsForUser = (userId) => async (dispatch) => {
    let posts = await fetch(`/api/posts/${userId}`);
    posts = await posts.json();
    dispatch(setPosts(posts));
    return posts;
  };

export const removePostsOnLogout = () => async (dispatch) => {
    dispatch(removePosts());
    return "removed posts on logout";
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