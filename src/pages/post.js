import React, { useState } from 'react';
import '../styles/post.css';
import fishingImage from '../assets/fishing_image.svg';

const Post = () => {
const [comments, setComments] = useState([]);
const [nickname, setNickname] = useState('');
const [commentText, setCommentText] = useState('');
const [password, setPassword] = useState('');
const [isModalOpen, setIsModalOpen] = useState(false);

const handleCommentSubmit = (e) => {
e.preventDefault();
if (nickname && commentText && password) {
setComments([...comments, { nickname, commentText }]);
setNickname('');
setCommentText('');
setPassword('');
setIsModalOpen(false); // 모달 닫기
}
};

return (
  <div className="post-container">
    <h1>인천 앞바다에서 무려 60cm 월척을 낚다!</h1>
    <p>#인천 #낚시</p>
    <p>인천 앞바다. 24.01.19 18:00</p>
    <img src={fishingImage} alt="Fishing" className="post-image" />
    <p>인천 앞바다에서 월척을 낚았습니다!<br />
      가족들과 기억에 오래도록 남을 멋진 하루였어요</p>
    
    <h3>댓글 {comments.length}</h3>
    <ul className="comment-list">
      {comments.map((comment, index) => (
        <li key={index}><strong>{comment.nickname}:</strong> {comment.commentText}</li>
      ))}
    </ul>

    <button onClick={() => setIsModalOpen(true)} className="open-modal-button">댓글 등록하기</button>

    {isModalOpen && (
      <div className="modal">
        <div className="modal-content">
          <h2>댓글 등록</h2>
          <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임을 입력해 주세요..."
              className="comment-input"
            />
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="댓글을 입력해 주세요..."
              className="comment-textarea"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해 주세요..."
              className="comment-input"
            />
            <button type="submit" className="submit-button">등록하기</button>
          </form>
        </div>
      </div>
    )}
  </div>
);


};

export default Post;