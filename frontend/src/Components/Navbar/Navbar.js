  import React, {useContext } from 'react'
  import './Navbar.css'
  import blogpost_img from '../assests/blogpost.jpeg'
  import { Link } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'

  const Navbar = () => {
    const {isLoggedIn} = useContext(AuthContext);

    return (
      <nav>
        <div className='left-nav'>
        <Link to={`/posts`}><h1>BlogsPost</h1></Link>
          <Link to={`/posts`}><img src={blogpost_img} alt='blogpost image' /></Link>
        </div>

        <div className='middle-nav'>
          {isLoggedIn ?
            (
              <>
                <Link to='/account'>Account</Link>
                <Link to='/newpost'>New Post</Link>
              </>
            ) : null
          };
        </div>

        <div className='right-nav'>
          {isLoggedIn ?
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