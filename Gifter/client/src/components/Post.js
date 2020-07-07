import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import {Link} from "react-router-dom"

const Post = ({ post }) => {
  return (
    <Card className="m-4">
      <p className="text-left px-2">Posted by: <Link to={`/post/user/${post.userProfileId}`}>
    <strong>{post.userProfile.name}</strong>
</Link> </p>
      <CardImg top src={post.imageUrl} alt={post.title} />
      <CardBody>
        <p><strong>{post.title}</strong> </p>
        <p>{post.caption}</p>
        <Link to={`/posts/${post.id}`}>
    View Comments
</Link>        
        
      </CardBody>
    </Card>
  );
};

export default Post;