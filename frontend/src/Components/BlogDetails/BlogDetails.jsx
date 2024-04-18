import React, { useEffect, useState } from "react";
import "./BlogDetails.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const BlogDetails = () => {
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const { postId } = useParams();

  const token = localStorage.getItem("userLoginResponseToken");

  useEffect(() => {
    fetchPostComments();
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
      setPost(response.data);
    } catch (error) {
      setError(error.response.data.error);
      // setError('Could not fetch post details');
    }
  };

  const fetchPostComments = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/comments/post/${postId}/all_comments/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      setComments(response.data.comments);
    } catch (error) {
      setError(error.response.data.error);
      // setError('Could not fetch post details');
    }
  };
  const handleCommentSubmit = async (e) => {
    try {
      //post comment
      await axios.post(``);
      setNewComment("");

      // refreshcomments
      const response = await axios.get(
        `http://127.0.0.1:8000/comments/post/${postId}/all_comments/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      setComments(response.data.comments);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  if (error) return <p>{error}</p>;
  if (!post) return <p>Loading ..</p>;
  return (
    <div className="blog-details">
      <h2>{post.title}</h2>
      <p>{post.author}</p>
      <p>{post.date_posted}</p>
      <p>{post.content}</p>

      <h3>Post Comments</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>

      <form action="">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Comment on the post"
        />

        <button type="submit">Comment</button>
      </form>
    </div>
  );
};

export default BlogDetails;
