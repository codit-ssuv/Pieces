import React, { useState } from 'react';
import '../styles/public.css';
import Header from '../components/header';
import Image1 from '../assets/image1.svg';
import Image2 from '../assets/image2.svg';
import FlowerIcon from '../assets/flower.svg';

const data = [
  {
    id: 1,
    imageUrl: Image1,
    date: "D+265",
    category: "공개",
    title: "에델바이스",
    description: "서로 한 마음으로 응원하고 아끼는 달봉이네 가족입니다.",
    badges: 2,
    memories: 8,
    likes: "1.5K"
  },
  {
    id: 2,
    imageUrl: Image2,
    date: "D+265",
    category: "공개",
    title: "달봉이네 가족",
    description: "서로 한 마음으로 응원하고 아끼는 달봉이네 가족입니다.",
    badges : 2,
    memories: 8,
    likes: "1.5K"
  },
  
];

const Card = ({ title, description, imageUrl, date, category, badges, memories, likes }) => (
  <div className="card">
    <img src={imageUrl} alt={title} />
    <div className="card-content">
      <div className="card-meta">
        <span className="card-date">{date}</span>
        <div className="divider"></div>
        <span className="card-category">{category}</span>
      </div>
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
      <div className="card-meta2">
        <div>
          <span>획득 배지</span>
          <div className='badges'>{badges}</div>
        </div>
        <div>
          <span>추억</span>
          <div className='memories'>{memories}</div>
        </div>
        <div>
          <span>그룹 공감</span>
          <div className="likes-container">
            <img src={FlowerIcon} alt="flower icon" className="flower-icon" />
            <div className="likes">{likes}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);



const Public = () => {
    const [searchTerm, setSearchTerm] = useState('');
  
    const filteredData = data.filter(item =>
      item.title.includes(searchTerm) || item.description.includes(searchTerm)
    );
  
    return (
      <div className="main">
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> 
        <div className="card-container">
          {filteredData.map(item => (
            <Card key={item.id} {...item} />
          ))}
        </div>
        <button className="load-more">더보기</button>
      </div>
    );
  };
  


export default Public
