import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import commentsReducer from "./comments";
import sessionReducer from "./session";
import postsReducer from "./posts";
import searchReducer from "./search";
import followsReducer from "./follows";
import likesReducer from "./likes";
import usersReducer from './users'

const rootReducer = combineReducers({
  comments: commentsReducer,
  session: sessionReducer,
  posts: postsReducer,
  search: searchReducer,
  follows: followsReducer,
  likes: likesReducer,
  users: usersReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
