import React from 'react'
import './Comments.css'
import { formatDistanceToNow,subDays } from 'date-fns';

const Comments = (props) => {
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
    </div>
  )
}

export default Comments