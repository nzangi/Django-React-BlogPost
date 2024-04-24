import React, { useContext, useEffect, useState } from 'react'
import './DeletePost.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';

const DeletePost = () => {
  const {postId} = useParams();
  const [post,setPost] = useState(null);
  const[error,setError] = useState('');
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();


  const token = localStorage.getItem("userLoginResponseToken");

  const fetchPostToDelete = async () =>{
    try {
      const response = await axios.get(`http://127.0.0.1:8000/blog/update_post/${postId}/`,{
        headers:{
          Authorization: `Token ${token}`
        }
      })
      setPost(response.data);
      setIsLoggedIn(false);
    } catch (error) {
      setError(error.response.data.error)
    }
  }
  useEffect(()=>{
    fetchPostToDelete();
  },[postId])

  const deletePost = async () =>{
    if(!post){
      setError("No Post Found!")
      return
    }
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/delete_post/${postId}/`,{
        headers:{
          Authorization: `Token ${token}`
        }
      })
      
    } catch (error) {
      setError(error.response.data.error)
    }
  }
    
  const handleCancelButton = (e) =>{
    e.preventDefault();
    navigate("/posts")
  }
  const handleDeleteButton = (e) =>{
    e.preventDefault();
    deletePost()
    navigate("/posts")
  }


  return (
    <div className='delete-post'>
      <form className='form-delete'>
        {post && <h6>Are you sure you want to delete {post.title}</h6>}
        <div className='buttons'>
            <button type='submit' onClick={handleCancelButton}>Cancel</button>
            <button type='submit' onClick={handleDeleteButton}>Delete</button>
        </div>
      </form>
    </div>
  )
}

export default DeletePost