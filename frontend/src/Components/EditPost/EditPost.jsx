import React, { useState, useContext, useEffect } from "react";
import "./EditPost.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

const EditPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const token = localStorage.getItem("userLoginResponseToken");

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/blog/update_post/${postId}/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      console.log(setPost(response.data));
      setIsLoggedIn(true);
      setPost(response.data);
    } catch (error) {
      setError(error.response.data.error);
    }
  };



  const handlePostUpdate = async (e) => {
    e.preventDefault();
    if (!post) {
      return;
    }

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/blog/update_post/${postId}/`,
        { title: post.title,content: post.content },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setIsLoggedIn(true);


      navigate("/posts");
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="edit-post">
      {error && <p className="error-message">{error}</p>}
      {post ? (
        <form onSubmit={handlePostUpdate} className="editpost-form">
          <h2>Update Your Post</h2>
          <input
            type="text"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
          <textarea
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
          />
          <button type="submit">Update Post</button>
        </form>
      ) : (
        <p>Loading Post</p>
      )}
    </div>
  );
};

export default EditPost;
