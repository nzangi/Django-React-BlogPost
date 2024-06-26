import React, { useEffect, useState, useContext } from 'react'
import Blog from '../Blog/Blog'
import axios from 'axios'
import './Blogs.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'


const Blogs = () => {
  const [allPosts, setAllPost] = useState([])
  const [error, setError] = useState('')
  const { setIsLoggedIn } = useContext(AuthContext);



  const fetchAllPost = async () => {

    try {
      const response = await axios.get(`http://127.0.0.1:8000/blog/`)
      //  title, content, date_posted, author, image
      // console.log('Response data:', response.data.data); // Log the response data
      setAllPost(response.data.data)
      setIsLoggedIn(true)
    } catch (error) {
      setError('Could not handle post loading')
      console.log('Error is :', error);

    }

  }

  useEffect(() => {
    fetchAllPost()
  }, [])

  return (
    <div className='blogs'>
      <div>
        <h1>All Posts</h1>
        {error && <p>{error}</p>}
        {
          allPosts.map((post, index) => {
            return (
              <Link className='link' to={`/post/${post.id}`} key={index}>
                <Blog key={index} id={post.id} image={post.image} author={post.author} date_posted={post.date_posted} title={post.title} content={post.content} />
              </Link>
            )

          })
        }
      </div>
      
    </div>
  )
}

export default Blogs