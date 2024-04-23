import React, { useEffect, useState } from 'react'
import './Comments.css'
import { formatDistanceToNow,subDays } from 'date-fns';
import { Link } from 'react-router-dom';

const Comments = (props) => {
  const [isPostAuthor,setIsPostAuthor] = useState(false)
  const postAuthor = localStorage.getItem("userLoginUsername");


  useEffect(()=>{
    if (props.comment_author === postAuthor){
      setIsPostAuthor(true)
    }
  },[props.author])


  return (
    <div className='comments'>
        <div className='comments-profile'>
            <div className='comments-details'>
              {/* This should link to Account. To be implemented later */}
              <p className='author'>{props.comment_author  }</p>
              <p className='date'> {formatDistanceToNow((new Date(props.commented_date)), { addSuffix: true })}</p>
            </div>
        </div>
        <div className='comments-details'>
            <h6>{props.comment_text}</h6>
        </div>

        <div className='edit-delete'>
        {
          isPostAuthor ? (
            <>
                <Link className='edit-button' to={`/post/editcomment/${props.postId}/${props.id}`}>Edit</Link>
                <Link className='delete-button' to={`/post/deletecomment/${props.id}`}>Delete</Link>
            </>
              
          ) : null
        }
        </div>

    </div>
  )
}

export default Comments