import React from 'react';
import '../styles/header.css';
import logo from '../assets/logo.svg';
import makeGroupIcon from '../assets/makeGroup.svg';
import searchBar from '../assets/search.svg';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <img src={logo} alt="조각집 로고" />
            </div>
            <div className="search-bar">
                <img src={searchBar} alt="검색 아이콘" className="search-icon" />
            
            </div>
            <div className="filter">
                <span>필터</span>
                <select>
                    <option value="option1">옵션 1</option>
                    <option value="option2">옵션 2</option>
                    <option value="option3">옵션 3</option>
                </select>
            </div>
            <button className="cta-button">
                <img src={makeGroupIcon} alt="그룹 만들기 아이콘" /> 
            </button>
        </header>
    );
};

export default Header;
