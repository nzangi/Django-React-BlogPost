import React from 'react'
import './Navbar.css'
import blogpost_img from '../assests/blogpost.jpeg'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <div className='left-nav'>
        <h1>BlogsPost</h1>
        <img  src={blogpost_img} alt='blogpost image'/>
        
      </div>
      <div className='middle-nav'>
        <Link to='/account'>Account</Link>
        <Link to='/newpost'>New Post</Link>

        {/* <a href='#'>Account</a>
        <a href='#'>New Post</a> */}
      </div>
      <div className='right-nav'>
        <a className='signout' href='#'>Sign Out</a>
        <Link to='/login'>Sign In</Link>

      </div>
      
    </nav>
  )
}

export default Navbar