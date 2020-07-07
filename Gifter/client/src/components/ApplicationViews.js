import React, { useContext } from "react";
import {PostList} from "./PostList";
import PostDetails from "./PostDetails";
import UserPosts from "./UserPosts";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";

const ApplicationViews = () => {
  const { isLoggedIn } = useContext(UserProfileContext);

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

      <Route path="/post/user/:id"> {isLoggedIn ? <UserPosts /> : <Redirect to="/login" />}</Route>
      <Route path="/posts/:id"> {isLoggedIn ? <PostDetails />: <Redirect to="/login" />}</Route>

    </Switch>
    </main>
  );
};

export default ApplicationViews;