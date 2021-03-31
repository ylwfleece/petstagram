const SET_USERS = 'users/SET_USERS'

const setUsers = users => ({
    type: SET_USERS,
    payload: users
})

export const getAllUsers = () => async dispatch => {
    const res = await fetch('/api/users/')
    const data = await res.json()
    dispatch(setUsers(data))
    return data
}

const initialState = {};

const usersReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USERS:
            newState = Object.assign({}, state);
            newState = action.payload;
            return newState;
        default:
            return state;
    }
};

export default usersReducer
