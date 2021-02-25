const SET_FOLLOWS = "posts/setFollows";
// const REMOVE_POSTS = "posts/removePosts";
// const CREATE_POST = "posts/createPost";

const setFollows = (follows) => {
  return {
    type: SET_FOLLOWS,
    payload: follows,
  };
};


export const getFollowsForUser = () => async (dispatch) => {
  const res = await fetch(`/api/search/follows`);
  const follows = await res.json();
  dispatch(setFollows(follows));
  return follows;
};


const initialState = [];

const followsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_FOLLOWS:
      newState = [...state];
      newState = action.payload;
      return newState;
    // case REMOVE_POSTS:
    //   newState = [...state]
    //   newState = null;
    //   return newState;
    // case CREATE_POST:
    //   newState = [...state]
    //   if(newState){
    //       newState.push(action.payload); 
    //       return newState; 
    //   }
    //   else{
    //       newState = [action.payload];
    //       return newState;
    //   }
    default:
      return state;
  }
};

export default followsReducer;
