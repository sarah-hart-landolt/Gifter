import React, { useState, useEffect } from "react";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);


  const getAllPosts = () => {
    return fetch("api/post")
      .then((res) => res.json()).then(setPosts);
  };

  const addPost = (post) => {
    return fetch("api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
  };

  const getPost = (id) => {
    return fetch(`/api/post/${id}`).then((res) => res.json());
};

const getPostsByUserId = (userProfileId) => {
  return fetch(`/api/post/user/${userProfileId}`).then((res) => res.json());
};

  const searchPosts = (q) => {
    if (!q) {
      getAllPosts()
          return}
          
      return fetch(`api/post/search?q=${q}&sortDesc=true`)
          .then((res) => res.json())
          .then(setPosts)
  };

  return (
    <PostContext.Provider value={{posts, getPost, getAllPosts, searchPosts, getPostsByUserId, addPost} }>
      {props.children}
    </PostContext.Provider>
  );
};