import React, { useState } from 'react';

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
                    <label>그룹명</label>
                    <input 
                        type="text" 
                        value={groupName} 
                        onChange={(e) => setGroupName(e.target.value)} 
                        required 
                    />
                </div>
                <div className="image-upload">
                    <label>대표 이미지</label>
                    <div className='file-container'>
                        <input 
                            type="text" 
                            value={groupImage ? groupImage.name : ''} 
                            readOnly 
                            placeholder="파일을 선택해 주세요" 
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
                    <label>그룹 소개</label>
                    <textarea 
                        value={groupDescription} 
                        onChange={(e) => setGroupDescription(e.target.value)} 
                        required 
                        id="group-intro" 
                    />
                </div>
                <div>
                    <label>그룹 공개 선택</label>
                    <label>
                        공개
                        <input 
                            type="checkbox" 
                            checked={isPublic} 
                            onChange={() => setIsPublic(!isPublic)} 
                        />
                    </label>
                </div>
                <div>
                    <label>비밀번호</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="비밀번호를 입력해 주세요"
                    />
                </div>
                <button type="submit">만들기</button>
            </form>
        </div>
    );
};

export default MakeGroup;
