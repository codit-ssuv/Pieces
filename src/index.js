import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Public from './pages/public';
import "./styles/public.css";
import Private from './pages/private';
import "./styles/private.css";
import MakeGroup from './pages/makeGroup';
import "./styles/makeGroup.css";
import PrivateGroupAccess from './pages/privateGroupAccess';
import MemoryUpload from './pages/memoryUpload';
import PrivateMemory from './pages/privateMemory';
import PublicMemory from './pages/publicMemory';
import Post from './pages/post';


ReactDOM.render(
  <React.StrictMode>
        <Post/>
  </React.StrictMode>,
  document.getElementById('root')
);
