import React from 'react';
import '../styles/header.css';
import logo from '../assets/logo.svg';
import searchBar from '../assets/search.svg';

const Header = () => {
    return (
        <header className="header">
            <div className="top-row">
                <div className="logo">
                    <img src={logo} alt="조각집 로고" />
                </div>
                <button className="cta-button">
                    그룹 만들기 
                </button>
            </div>
            <div className="bottom-row">
                <div className="search-bar">
                    <img src={searchBar} alt="검색 아이콘" className="search-icon" />
                </div>
                <div className="dropdown">
                    <select>
                        <option value="option1">공감순</option>
                        <option value="option2">옵션 2</option>
                        <option value="option3">옵션 3</option>
                    </select>
                </div>
            </div>
        </header>
    );
};

export default Header;
