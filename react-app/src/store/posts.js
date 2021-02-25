const SET_POSTS = "posts/setPosts";
const REMOVE_POSTS = "posts/removePosts";
const CREATE_POST = "posts/createPost";

const setPosts = (posts) => {
  return {
    type: SET_POSTS,
    payload: posts,
  };
};

const removePosts = () => {
  return {
    type: REMOVE_POSTS,
  };
};

const createOnePost = (post) => {
  return {
    type: CREATE_POST,
    payload: post,
  };
};

export const getPostsForUser = () => async (dispatch) => {
  let posts = await fetch(`/api/posts/`);
  posts = await posts.json();
  dispatch(setPosts(posts));
  return posts;
};

export const removePostsOnLogout = () => async (dispatch) => {
  dispatch(removePosts());
  return "removed posts on logout";
};

export const createPost = (caption, photoFile) => async (dispatch) => {
  const formData = new FormData();
  formData.append("caption", caption);
  if (photoFile) {
    formData.append("feed_photo_file", photoFile);
  } else {
    return "Failed to attach a photo";
  }
  let res = await fetch(`/api/posts/`, {
    method: "POST",
    body: formData,
  });
  const post = await res.json();
  dispatch(createOnePost(post));
  return post;
};

const initialState = [];

const postsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_POSTS:
      newState = [...state];
      newState = action.payload;
      return newState;
    case REMOVE_POSTS:
      newState = [...state]
      newState = null;
      return newState;
    case CREATE_POST:
      newState = [...state]
      if(newState){
          newState.push(action.payload); 
          return newState; 
      }
      else{
          newState = [action.payload];
          return newState;
      }
    default:
      return state;
  }
};

export default postsReducer;
