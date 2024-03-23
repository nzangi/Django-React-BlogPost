import React, { useEffect, useState } from 'react'
import './Navbar.css'
import blogpost_img from '../assests/blogpost.jpeg'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [navbarUserIsLoggedIn, setNavbarUserIsLoggedIn] = useState(false);

  useEffect(() => {
      const navbarUserAuthLogInToken = localStorage.getItem('userLoginResponseToken');
      setNavbarUserIsLoggedIn(navbarUserAuthLogInToken ? true : false);  
    }, [navbarUserIsLoggedIn]);

    
  return (
    <nav>
      <div className='left-nav'>
        <h1>BlogsPost</h1>
        <img src={blogpost_img} alt='blogpost image' />
      </div>

      <div className='middle-nav'>
        {navbarUserIsLoggedIn ?
          (
            <>
              <Link to='/account'>Account</Link>
              <Link to='/newpost'>New Post</Link>
            </>
          ) : null
        };
      </div>

      <div className='right-nav'>
        {navbarUserIsLoggedIn ?
          (
            <Link to='/logout'>Sign Out</Link>

          ) : (
            <Link to='/login'>Sign In</Link>

          )
        };
      </div>
    </nav>
  )
}

export default Navbar