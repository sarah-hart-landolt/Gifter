// import React, { useRef, useContext } from "react"
// import { PostContext } from "../providers/PostProvider"

// export const SearchBar = () => {
//     const { getAllPosts, searchPosts } = useContext(PostContext)

//     const search = useRef()

//     const newSearch = () => {
//         if (search.current.value === "") {
//             getAllPosts();
//         } else {
//             searchPosts(search.current.value);
//         }
//     }
//     return (
//         <fieldset>
//             <div className="form-group">
//                 <input
//                     type="text"
//                     id="searchTerms"
//                     Ref={search}
//                     required
//                     autoFocus
//                     className="form-control"
//                     placeholder="Search Posts"
//                     onChange={ evt => {
//                         newSearch()

//                     }
//                         }
                    
//                 />
//             </div>
//         </fieldset>
//     )
// }