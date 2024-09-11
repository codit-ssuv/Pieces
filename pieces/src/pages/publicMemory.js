import React from 'react';
import '../styles/publicMemory.css';

const memories = [
  {
    title: "예쁘고 소중한 추억이에요",
    date: "2023-09-19 18:00",
    likes: 120,
    comments: 8,
    image: "https://example.com/image1.jpg", // 실제 이미지 URL로 변경
  },
  {
    title: "바다에서 잡은 60cm 달팽이",
    date: "2023-09-19 18:00",
    likes: 120,
    comments: 8,
    image: "https://example.com/image2.jpg", // 실제 이미지 URL로 변경
  },
  // 추가 메모리 데이터...
];

function App() {
  return (
    <div className="app-container">
      <header className="header">
        <h1>조각집 🌼</h1>
        <div className="profile-info">
          <h2>달룽이네 가족</h2>
          <p>추적 8 | 그룹 2명 | 1.5K</p>
          <p>새로운 한 아름으로 소중한 이야기를 달룽이네에 가깝니다.</p>
          <div className="tags">
            <span className="tag">👤 개인 2명 초대하기</span>
            <span className="tag">🌟 그룹 공개 1분 이내에 보기</span>
            <span className="tag">❤️ 잊지 말고 2분 이내에 보기</span>
          </div>
        </div>
      </header>

      <main className="memories">
        <h2>추억 목록</h2>
        <div className="memory-grid">
          {memories.map((memory, index) => (
            <div className="memory-card" key={index}>
              <img src={memory.image} alt={memory.title} />
              <h3>{memory.title}</h3>
              <p>작성일: {memory.date}</p>
              <p>💖 {memory.likes} | 💬 {memory.comments}</p>
            </div>
          ))}
        </div>
        <button className="load-more">더 보기</button>
      </main>
    </div>
  );
}

export default App;
