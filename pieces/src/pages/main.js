import React, { useState } from 'react';
import '../styles/main.css';
import Header from '../components/header';

const data = [
  {
    id: 1,
    title: "아름다움",
    description: "새로운 아름다움으로 여기는 달팽이의 가벼운 대화입니다.",
    imageUrl: "https://example.com/image1.jpg",
    date: "D-25",
    category: "공예",
    likes: 2,
    comments: 8,
    views: "1.5K"
  },
  {
    id: 2,
    title: "아름다움",
    description: "새로운 아름다움으로 여기는 달팽이의 가벼운 대화입니다.",
    imageUrl: "https://example.com/image2.jpg",
    date: "D-25",
    category: "공예",
    likes: 2,
    comments: 8,
    views: "1.5K"
  },
  // 추가 데이터...
];

const Card = ({ title, description, imageUrl, date, category, likes, comments, views }) => (
  <div className="card">
    <img src={imageUrl} alt={title} />
    <div className="card-content">
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="card-meta">
        <span>{date}</span>
        <span>{category}</span>
        <span>{likes} Likes</span>
        <span>{comments} Comments</span>
        <span>{views} Views</span>
      </div>
    </div>
  </div>
);

const Main = () => {
    const [searchTerm, setSearchTerm] = useState('');
  
    const filteredData = data.filter(item =>
      item.title.includes(searchTerm) || item.description.includes(searchTerm)
    );
  
    return (
      <div className="main">
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> {/* Header 컴포넌트 사용 */}
        <div className="card-container">
          {filteredData.map(item => (
            <Card key={item.id} {...item} />
          ))}
        </div>
        <button className="load-more">더 보기</button>
      </div>
    );
  };
  


export default Main
