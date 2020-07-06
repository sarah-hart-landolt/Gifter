import React, { useContext, useRef, useEffect } from "react";
import { PostContext } from "../providers/PostProvider";
import { UserProfileContext } from "../providers/UserProfileProvider";

const PostForm = (props) => {
  const { addPost } = useContext(PostContext);
//   const { userProfiles } = useContext(UserProfileContext);
const { userProfiles, getAllUserProfiles } = useContext(UserProfileContext);

useEffect(() => {
    getAllUserProfiles();
  }, []);

  const title = useRef()
  const imageUrl = useRef()
  const caption = useRef()
  const userProfile= useRef()

  const constructNewPost = () => {
    const UserProfileId = parseInt(userProfile.current.value)
    const newPostObj= {
            title: title.current.value,
            imageUrl: imageUrl.current.value,
            caption: caption.current.value,
            userProfileId: UserProfileId,
            dateCreated: new Date()
    }
        addPost(newPostObj).then(props.toggler);
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
        <fieldset>
            <div className="form-group">
                <label htmlFor="userProfileId">User Profile: </label>
                <select
                    defaultValue=""
                    name="userProfileId"
                    ref={userProfile}
                    id="userProfileId"
                    className="form-control"
                >
                    <option value="0">Select a User</option>
                    {userProfiles.map(up => (
                        <option key={up.id} value={up.id}>
                            {up.name}
                        </option>
                    ))}
                </select>
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