import React from "react";
import { Switch, Route } from "react-router-dom";
import {PostList} from "./PostList";
import PostDetails from "./PostDetails";
import UserPosts from "./UserPosts";

const ApplicationViews = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <PostList />
      </Route>

      <Route path="/post/user/:id"><UserPosts /></Route>
      <Route path="/posts/:id"><PostDetails /></Route>

    </Switch>
  );
};

export default ApplicationViews;