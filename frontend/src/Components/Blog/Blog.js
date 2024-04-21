import React, { useEffect, useState } from 'react'
import './Blog.css'
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

const Blog = (props) => {
  const postAuthor = localStorage.getItem("userLoginUsername");
  const [isPostAuthor,setIsPostAuthor] = useState(false)

  

  useEffect(()=>{
    if (props.author === postAuthor){
      setIsPostAuthor(true)
    }
  },[props.author])

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
        <div className='edit-delete'>
        {
          isPostAuthor ? (
            <>
                <Link className='edit-button' to={`/post/editpost/${props.id}`}>Edit</Link>
                <Link className='delete-button' to={`/post/deletepost/${props.id}`}>Delete</Link>
            </>
              
          ) : null
        }
        </div>
        
    </div>
  )
}

export default Blog