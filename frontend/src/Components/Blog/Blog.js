import React from 'react'
import './Blog.css'

const Blog = (props) => {
    console.log('Blog props:', props); // Log props to ensure they are received correctly
  return (
    <div className='blog'>
        <div className='profile'>
            <img src={props.image}/>
            <p>{props.author}</p>
            <p>{props.date_posted}</p>
        </div>
        <div className='body-details'>
            <h4>{props.title}</h4>
            <p>{props.content}</p>
        </div>
        
    </div>
  )
}

export default Blog