import React, { useEffect, useState } from 'react'
import './Navbar.css'
import blogpost_img from '../assests/blogpost.jpeg'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const loggedToken = localStorage.getItem('responseToken')
    setIsLoggedIn(loggedToken ? true : false)

  }, [])


  return (
    <nav>
      <div className='left-nav'>
        <h1>BlogsPost</h1>
        <img src={blogpost_img} alt='blogpost image' />
      </div>
      <div className='middle-nav'>
        {isLoggedIn ?
          (
            <>
              <Link to='/account'>Account</Link>
              <Link to='/newpost'>New Post</Link>
            </>
          ) : null
        }


      </div>
      <div className='right-nav'>
        {isLoggedIn ?
          (
            <Link to='/logout'>Sign Out</Link>

          ) : (
            <Link to='/login'>Sign In</Link>

          )
        }

      </div>

    </nav>
  )
}

export default Navbar