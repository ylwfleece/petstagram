
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const addUser = (user) => async (dispatch) => {
//   const { id, username, email, profilePhotoUrl } = user;
  dispatch(setUser(user));
  return user;
};

// export const restoreUser = () => async dispatch => {
//   const res = await fetch('/api/session');
//   dispatch(setUser(res.data.user));
//   return res;
// };

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

// export const signup = (user) => async (dispatch) => {
//   const { username, email, password } = user;
//   const response = await fetch("/api/users", {
//     method: "POST",
//     body: JSON.stringify({
//       username,
//       email,
//       password,
//     }),
//   });
//   dispatch(setUser(response.data.user));
//   return response;
// };

// export const logout = () => async (dispatch) => {
//   const response = await fetch('/api/session', {
//     method: 'DELETE',
//   });
//   dispatch(removeUser());
//   return response;
// };

export default sessionReducer;