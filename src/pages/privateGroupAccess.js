import React, { useState } from 'react';
import "../styles/privateGroupAccess.css";

const PrivateGroupAccess = () => {
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 비밀번호 처리 로직 추가
    console.log('비밀번호:', password);
  };

  return (
    <div className="container">
      <h1 className="title">비공개 그룹</h1>
      <p className="description">비공개 그룹에 접근하기 위해 관련 확인이 필요합니다.</p>
      <form onSubmit={handleSubmit} className="form">
        <label className="label">
          비밀번호를 입력해 주세요
          <input
            type="password"
            value={password}
            onChange={handleChange}
            placeholder="비밀번호를 입력해 주세요"
            className="input"
            required
          />
        </label>
        <button type="submit" className="button">
          제출하기
        </button>
      </form>
    </div>
  );
};

export default PrivateGroupAccess;
