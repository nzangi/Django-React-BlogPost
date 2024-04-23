import React, { useContext, useEffect, useState } from "react";
import "./EditComment.css";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";

const EditComment = () => {
  const { commentId } = useParams();
  const { postId } = useParams();

  const [comment, setComment] = useState(null);
  const [error, setError] = useState("");

  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const token = localStorage.getItem("userLoginResponseToken");

  useEffect(() => {
    fetchComment();
  }, [commentId]);

  const fetchComment = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/comments/${commentId}/comment_to_update/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      console.log(setComment(response.data));
      setIsLoggedIn(true);
      setComment(response.data);
    } catch (error) {
      setError(error.response.data.error);
    }
  };
  const handCommentUpdate = async (e) => {
    e.preventDefault();
    if (!comment) {
      return;
    }

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/comments/${commentId}/comment_to_update/`,
        { comment_text: comment.comment_text },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setIsLoggedIn(true);
      navigate(`/post/${postId}`);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="edit-comment">
      {error && <p className="error-message">{error}</p>}
      {comment ? (
        <form className="edit-comment" onSubmit={handCommentUpdate}>
          <h2>Update Comment</h2>
          <textarea
            value={comment.comment_text}
            onChange={(e) => setComment({ ...comment, content_text: e.target.value })}
          />
         
          <button type="submit">Update Comment</button>
        </form>
      ) : (
        <p>Loading Comment</p>
      )}
    </div>
  );
};

export default EditComment;
