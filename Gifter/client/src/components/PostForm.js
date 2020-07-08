import React, { useContext, useRef, useEffect, useState } from "react";
import { PostContext } from "../providers/PostProvider";

const PostForm = (props) => {
const { addPost } = useContext(PostContext);


  const title = useRef()
  const imageUrl = useRef()
  const caption = useRef()

  const constructNewPost = () => {
    const newPostObj= {
            title: title.current.value,
            imageUrl: imageUrl.current.value,
            caption: caption.current.value,
    }
        addPost(newPostObj).then(props.toggle);
    }

    
  return (
    <form className="postForm"   onSubmit={
        evt => {
            
            evt.preventDefault() // Prevent browser from submitting the form
            // create the animal function goes here
            constructNewPost()
        }
         
    }>
        <fieldset>
            <div className="form-group">
                <label htmlFor="postTitle">Post Title: </label>
                <input
                    type="text"
                    id="postTitle"
                    ref={title}
                    required
                    autoFocus
                    className="form-control"
                    placeholder="Post Title"
                />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="imageUrl">Image Url: </label>
                <input
                    type="text"
                    id="imgUrl"
                    ref={imageUrl}
                    required
                    autoFocus
                    className="form-control"
                    placeholder="img Url"
                />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="caption">caption: </label>
                <input
                    type="text"
                    id="caption"
                    ref={caption}
                    autoFocus
                    className="form-control"
                    placeholder="caption"
                />
            </div>
        </fieldset>
        <button type="submit"
          
            className="btn btn-primary">
            Create Post
        </button>
    </form>
)
};

export default PostForm;