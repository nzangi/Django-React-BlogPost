import React from 'react'
import './Blog.css'
import { formatDistanceToNow } from 'date-fns';

const Blog = (props) => {
    // console.log('Blog props:', props); // Log props to ensure they are received correctly
  return (
    <div className='blog'>
        <div className='profile'>
            <div className='profile-image'>
              <img src={`http://127.0.0.1:8000${props.image}`} alt={`${props.author} image`}/>
            </div>
            <div className='profile-details'>
              {/* This should link to Account. To be implemented later */}
              <p>{props.author}</p>
              <p>{formatDistanceToNow(new Date(props.date_posted), { addSuffix: true })}</p>
            </div>
        </div>
        <div className='blog-details'>
            <h6>{props.title}</h6>
            <p>{props.content}</p>
        </div>
        <a>Edit</a>
        <a>Delete</a>
        
    </div>
  )
}

export default Blog