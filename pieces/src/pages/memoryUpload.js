import React, { useState } from 'react';
import '../styles/memoryUpload.css';

const MemoryUpload = () => {
  const [nickname, setNickname] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 폼 제출 처리 로직 추가
    console.log({ nickname, title, image, content, tags, location, date, isPublic, password });
  };

  return (
    <div className="container">
      <h1>추억 올리기</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label className="label">닉네임</label>
        <input
          className="input"
          type="text"
          placeholder="닉네임을 입력해 주세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />

        <label className="label">제목</label>
        <input
          className="input"
          type="text"
          placeholder="제목을 입력해 주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="label">이미지</label>
        <input
          className="input"
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <label className="label">본문</label>
        <textarea
          className="input"
          placeholder="본문 내용을 입력해 주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <label className="label">태그</label>
        <input
          className="input"
          type="text"
          placeholder="태그를 입력해 주세요"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <label className="label">장소</label>
        <input
          className="input"
          type="text"
          placeholder="장소를 입력해 주세요"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <label className="label">추억의 순간</label>
        <input
          className="input"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label className="label">추억 공개 선택</label>
        <label>
          <input
            type="checkbox"
            checked={isPublic}
            onChange={() => setIsPublic(!isPublic)}
          />
          공개
        </label>

        <label className="label">비밀번호</label>
        <input
          className="input"
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="button" type="submit">올리기</button>
      </form>
    </div>
  );
};

export default MemoryUpload;
