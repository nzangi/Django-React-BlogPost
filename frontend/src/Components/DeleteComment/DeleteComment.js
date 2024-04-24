import React, { useContext, useEffect, useState } from 'react'
import './DeleteComment.css'
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';

const DeleteComment = () => {
  const {postId} = useParams();
  const { commentId } = useParams();

  const [comment,setComment] = useState(null);
  const[error,setError] = useState('');
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();


  const token = localStorage.getItem("userLoginResponseToken");

  const fetchCommentToDelete = async () =>{
    try {
      const response = await axios.get(`http://127.0.0.1:8000/comments/${commentId}/comment_to_update/`,{
        headers:{
          Authorization: `Token ${token}`
        }
      })
      setComment(response.data);
      setIsLoggedIn(true);
    } catch (error) {
      setError(error.response.data.error)
    }
  }

  useEffect(()=>{
    fetchCommentToDelete();
  },[commentId])

  const deletePost = async () =>{
    if(!comment){
      setError("No Comment Found!")
      return
    }
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/comments/${commentId}/comment_to_delete/`,{
        headers:{
          Authorization: `Token ${token}`
        }
      })
      
    } catch (error) {
      setError(error.response.data.error);
    }
  }
    
  const handleCancelButton = (e) =>{
    e.preventDefault();
    navigate(`/post/${postId}`)
  }
  const handleDeleteButton = (e) =>{
    e.preventDefault();
    deletePost()
    navigate(`/post/${postId}`)
  }

  return (
    <div>
      <div className='delete-post'>
      <form>
        {comment && <h6>Are you sure you want to delete {comment.comment_text}</h6>}
        <div className='buttons'>
            <button type='submit' onClick={handleCancelButton}>Cancel</button>
            <button type='submit' onClick={handleDeleteButton}>Delete</button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default DeleteComment