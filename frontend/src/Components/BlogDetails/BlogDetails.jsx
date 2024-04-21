import React, { useEffect, useState,useContext} from "react";
import "./BlogDetails.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Comments from "../Comments/Comments";
import { formatDistanceToNow } from 'date-fns';
import { AuthContext } from "../../Context/AuthContext";


const BlogDetails = () => {
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const {setIsLoggedIn} = useContext(AuthContext);


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
      setIsLoggedIn(true);

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
    e.preventDefault();
    try {
      //post comment
      await axios.post(`http://127.0.0.1:8000/comments/post/${postId}/post_to_comment/`,{comment_text:newComment},{
        headers: {
          Authorization: `Token ${token}`,
        }
      });
      setNewComment("");

      // refresh comments
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
      <div className="post-details">
        <div className="post-detail">
          <p>{post.author}</p>
          <p>{formatDistanceToNow(new Date(post.date_posted),{ addSuffix: true })}</p>
        </div>
        <h6>{post.title}</h6>
        <p>{post.content}</p>
      </div>
      

      <form className="form" onSubmit={handleCommentSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Comment on the post"
        />
        <button type="submit">Comment</button>
      </form>
      
      <h3>Post Comments</h3>

      {comments.map((comment, index) => {
        return <Comments key={index} comment_text={comment.comment_text} comment_author={comment.comment_author} commented_date={comment.commented_date}/>;
      })}

      
    </div>
  );
};

export default BlogDetails;
