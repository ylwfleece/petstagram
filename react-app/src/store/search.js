const SET_RESULTS = "posts/setResults";
// const REMOVE_POSTS = "posts/removePosts";
// const CREATE_POST = "posts/createPost";

const setResults = (results) => {
    return {
        type: SET_RESULTS,
        payload: results,
    };
};

export const searchUsers = (searchTerm) => async (dispatch) => {
    const response = await fetch(`/api/search/${searchTerm}`);
    const results = await response.json();
    dispatch(setResults(results))
    return results;
}

const initialState = [];

const searchReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_RESULTS:
            // newState = [...state];
            newState = action.payload;
            return newState;
        // case REMOVE_POSTS:
        //     newState = [...state]
        //     newState = null;
        //     return newState;
        // case CREATE_POST:
        //     newState = [...state]
        //     if (newState) {
        //         newState.push(action.payload);
        //         return newState;
        //     }
        //     else {
        //         newState = [action.payload];
        //         return newState;
        //     }
        default:
            return state;
    }
};

export default searchReducer;