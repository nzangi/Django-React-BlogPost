import React, { useEffect, useState } from 'react'
import './Navbar.css'
import blogpost_img from '../assests/blogpost.jpeg'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'

const Navbar = () => {
  const [isLoggedIn,setIsLoggedIn] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()


  useEffect(()=>{
    const loggedStatus = localStorage.getItem('isLoggedIn')
    if(loggedStatus){
      setIsLoggedIn(true)
    }
  },[])

  const handleSignOutUser = async () =>{
    try {
      const response = await axios.post(`http://127.0.0.1:8000/users/logout/`)
      setIsLoggedIn(false)
      navigate('/login')

    } catch (error) {
      setError('Could not handle post loading')
      console.log('Error is :', error);

    }
  }


  return (
    <nav>
      <div className='left-nav'>
        <h1>BlogsPost</h1>
        <img  src={blogpost_img} alt='blogpost image'/>
        
      </div>
      <div className='middle-nav'>
        {isLoggedIn ?
          (
            <>
            <Link to='/account'>Account</Link>
            <Link to='/newpost'>New Post</Link>
            </>
          ):null
        }
        
        {/* <a href='#'>Account</a>
        <a href='#'>New Post</a> */}
        {error && <p>{error}</p>}
      </div>
      <div className='right-nav'>
        {isLoggedIn ?
          (
            //needs abutton here for post
            <a className='signout' href='#' onClick={handleSignOutUser}>Sign Out</a>

          ):(
            <Link to='/login'>Sign In</Link>

          )
        }

      </div>
      
    </nav>
  )
}

export default Navbar