import React, { useState } from 'react';
import '../styles/makeGroup.css'
import toggleOn from '../assets/toggleOn.svg';
import toggleOff from '../assets/toggleOff.svg';

const MakeGroup = () => {
    const [groupName, setGroupName] = useState('');
    const [groupImage, setGroupImage] = useState(null);
    const [groupDescription, setGroupDescription] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [password, setPassword] = useState('');

    const handleImageChange = (event) => {
        setGroupImage(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({
            groupName,
            groupImage,
            groupDescription,
            isPublic,
            password
        });
    };

    return (
        <div className="create-group">
            <h2>그룹 만들기</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className='subtitle'>그룹명</label>
                    <input 
                        type="text" 
                        value={groupName} 
                        onChange={(e) => setGroupName(e.target.value)} 
                        required 
                        className='groupName-container'
                    />
                </div>
                <div className="image-upload">
                    <label className='subtitle'>대표 이미지</label>
                    <div className='file-container'>
                        <input 
                            type="text" 
                            value={groupImage ? groupImage.name : ''} 
                            readOnly 
                            placeholder="파일을 선택해 주세요" 
                            className='file-select'
                        />
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageChange} 
                            style={{ display: 'none' }} 
                            id="file-upload" 
                        />
                        <label htmlFor="file-upload" className="upload-button">
                            파일 선택
                        </label>
                    </div>
                </div>
                <div>
                    <label className='subtitle'>그룹 소개</label>
                    <textarea 
                        value={groupDescription} 
                        onChange={(e) => setGroupDescription(e.target.value)} 
                        required 
                        placeholder="그룹을 소개해 주세요"
                        className='groupDescription-container'
                    />
                </div>
                <div>
                    <label className='subtitle'>그룹 공개 선택</label>
                    <label  className='public-container'>
                        공개
                        <div onClick={() => setIsPublic(!isPublic)} style={{ cursor: 'pointer' }}>
                        <img 
                            src={isPublic ? toggleOn : toggleOff} 
                            alt="Toggle Public" 
                            className='toggle'
                        />
                    </div>
                    </label>
                </div>
                <div>
                    <label className='subtitle'>비밀번호</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="비밀번호를 입력해 주세요"
                        className='password-container'
                    />
                </div>
                <button type="submit">만들기</button>
            </form>
        </div>
    );
};

export default MakeGroup;
