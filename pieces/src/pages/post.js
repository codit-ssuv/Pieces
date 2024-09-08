import React, { useState } from 'react';
import '../styles/post.css'; // CSS 파일을 임포트합니다.

const Post = () => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText) {
      setComments([...comments, commentText]);
      setCommentText('');
    }
  };

  return (
    <div className="post-container">
      <h1>인천 할바다에서 무려 60cm 횟짱을 잡다!</h1>
      <p>#인천 #낚시</p>
      <p>인천 할바다에서 횟짱을 낚았습니다!</p>
      <img
        src="your-image-url.jpg"
        alt="Fishing"
        className="post-image"
      />
      <p>인천 할바다에서 횟짱은 낚았습니다!</p>
      <p>가족들과 함께한 즐거운 시간입니다.</p>

      <h3>댓글 {comments.length}</h3>
      <ul className="comment-list">
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>

      <form onSubmit={handleCommentSubmit} className="comment-form">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="댓글을 입력하세요..."
          className="comment-input"
        />
        <button type="submit" className="submit-button">댓글 등록하기</button>
      </form>
    </div>
  );
};

export default Post;
