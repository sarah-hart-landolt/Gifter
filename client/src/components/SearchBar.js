import React, { useContext } from 'react'
import { Input, Form, FormControl, Button } from 'reactstrap'
import { PostContext } from '../providers/PostProvider'

const SearchBar = () => {

    const {searchPosts} = useContext(PostContext)

    const handleChange = (e) => {
        searchPosts(e.target.value)
    }

    return (
        <Form inline>
        <Input type='text' onChange={handleChange} placeholder="Search Posts" />
        <Button variant="outline-light">Search</Button>
      </Form>

    )
}

export default SearchBar