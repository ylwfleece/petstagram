import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
// import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import CommentsPage from "./components/CommentsPage";
import SinglePostPage from "./components/SinglePostPage";
import UsersList from "./components/UsersList";
import User from "./components/User";
import UserProfile from "./components/UserProfile";
import SearchResults from "./components/SearchResults";
import PostForm from "./components/PostForm";
import CommentLikeModal from "./components/LikesModal";
import MainFeed from "./components/MainFeed";
import { authenticate } from "./services/auth";
import { useDispatch } from "react-redux";
import { getPostsForUser } from "./store/posts";
import { addUser } from "./store/session";
import { fetchComments } from "./store/comments";
import { getAllCommentLikes, getAllPostLikes } from "./store/likes";
import { getFollowsForUser } from "./store/follows";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
        dispatch(addUser(user));
        dispatch(getPostsForUser());
        dispatch(fetchComments());
        dispatch(getAllCommentLikes());
        dispatch(getAllPostLikes())
        dispatch(getFollowsForUser());
      }
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <div className="content">
        <Switch>
          <Route path="/login" exact={true}>
            <LoginForm
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
            />
          </Route>
          <Route path="/sign-up" exact={true}>
            <SignUpForm
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
            />
          </Route>
          <ProtectedRoute
            path="/users"
            exact={true}
            authenticated={authenticated}
          >
            <NavBar setAuthenticated={setAuthenticated} />
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute
            path="/users/:userId"
            exact={true}
            authenticated={authenticated}
          >
            <NavBar setAuthenticated={setAuthenticated} />
            <User />
          </ProtectedRoute>
          <ProtectedRoute
            path="/users/:id/posts"
            exact={true}
            authenticated={authenticated}
          >
            <NavBar setAuthenticated={setAuthenticated} />
            <UserProfile />
          </ProtectedRoute>
          <ProtectedRoute
            path="/posts/new"
            exact={true}
            authenticated={authenticated}
          >
            <NavBar setAuthenticated={setAuthenticated} />
            <PostForm />
          </ProtectedRoute>
          <ProtectedRoute
            path="/posts/:postId"
            exact={true}
            authenticated={authenticated}
          >
            <NavBar setAuthenticated={setAuthenticated} />
            <SinglePostPage />
          </ProtectedRoute>
          <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
            <NavBar setAuthenticated={setAuthenticated} />
            <MainFeed />
          </ProtectedRoute>
          <ProtectedRoute
            path="/search-results"
            exact={true}
            authenticated={authenticated}
          >
            <NavBar setAuthenticated={setAuthenticated} />
            <SearchResults />
          </ProtectedRoute>
          <ProtectedRoute
            path="/likes/comments/:id"
            exact={true}
            authenticated={authenticated}
          >
            <NavBar setAuthenticated={setAuthenticated} />
            <CommentLikeModal />
          </ProtectedRoute>
          <Route path="/comments">
            <CommentsPage />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
