import React, { useEffect, useContext, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { PostContext } from "../providers/PostProvider";
import { useParams } from "react-router-dom";
import Post from "./Post";

const UserPosts = () => {
  
  const { getPostsByUserId } = useContext(PostContext);
  const [userPosts, setUserPosts] = useState();
  const { id } = useParams();

  useEffect(() => {
    getPostsByUserId(id).then(setUserPosts);
  }, []);

  if (!userPosts) {
    return null;
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-lg-6">
        <div class="cards-column">
        {userPosts.map((userPost) => (
            <Post key={userPost.id} post={userPost} />
          ))}
        </div>
        </div>
      </div>
    </div>
  );
};

export default UserPosts;