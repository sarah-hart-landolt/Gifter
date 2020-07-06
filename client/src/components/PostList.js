import React, { useContext, useEffect, useState, useRef } from "react";
import { PostContext } from "../providers/PostProvider";
import Post from "./Post";
import PostForm from "./PostForm";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap"
import { SearchBar } from "./SearchBar";


export const PostList = () => {
  const { posts, getAllPosts, searchPosts, searchAllPosts, setSearchPosts } = useContext(PostContext);
  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)


  useEffect(() => {
    getAllPosts();
  }, []);

  useEffect(() => {
    getAllPosts();
  }, [posts]);
  

  return (
<>

    <div className="container">
    <Button onClick={toggle}>New Post</Button>

      <div className="row justify-content-center">

        <div class="cards-column">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
    <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                New Post
                </ModalHeader>
                <ModalBody>
                    <PostForm toggler={toggle} />
                </ModalBody>
            </Modal>
</>
  );
}
