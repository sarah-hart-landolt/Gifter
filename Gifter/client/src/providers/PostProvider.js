import React, { useState, useContext } from "react";
import {UserProfileContext} from "../providers/UserProfileProvider"

export const PostContext = React.createContext();

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);
  const {getToken} = useContext(UserProfileContext)
  const apiUrl = "/api/post";

  const getAllPosts = () => {
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json())
        .then(setPosts));

  };

  const addPost = (post) =>
  getToken().then((token) =>
    fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(post)
    }).then(resp => {
      if (resp.ok) {
        return resp.json();
      }
      throw new Error("Unauthorized");
    }));

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
      getToken().then((token) =>
          fetch(`api/post/search?q=${q}&sortDesc=true`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`
            }
          }).then(resp => resp.json())
            .then(setPosts));
  };

  return (
    <PostContext.Provider value={{posts, getPost, getAllPosts, searchPosts, getPostsByUserId, addPost} }>
      {props.children}
    </PostContext.Provider>
  );
};