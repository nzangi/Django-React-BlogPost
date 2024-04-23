import React, { useContext, useEffect, useState } from 'react'
import './NewPost.css'
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NewPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState("");
  const [author, setAuthor] = useState();

  const navigate = useNavigate();

  const { setIsLoggedIn } = useContext(AuthContext);



  const token = localStorage.getItem("userLoginResponseToken");
  const postAuthor = localStorage.getItem("userLoginUsername");

  useEffect(()=>{
    if(token){
      setIsLoggedIn(true)
    }else{
      setIsLoggedIn(false)
  
    }
  },[])
  

  const handleNewPost = async (e) =>{
    e.preventDefault();
    if(!title.trim() || !content.trim() ){
      setError("Title or content cannot be empty");
      return;
    }
    try {
      const response = await axios.post(`http://127.0.0.1:8000/blog/post/`,{
        title,content
      },{
        headers:{
          Authorization: `Token ${token}`
        }
      })

      setContent("");
      setTitle("")
      navigate("/posts")
      
    } catch (error) {
      setError(error.response.data)
    }
  }

  return (
    <div className='new-post'>
      {error && <p className='error-message'>{error}</p>}
      <form className='newpost-form' onSubmit={handleNewPost}>
        <h2>New Post </h2>
        <input
          type='text'
          placeholder='Enter the post title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder='Enter the post content'
          value={content}
          onChange={(e) =>setContent(e.target.value)}
        />
        <button>Post</button>
      </form>
    </div>
  )
}

export default NewPost