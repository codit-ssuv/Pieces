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


ReactDOM.render(
  <React.StrictMode>
        <MemoryUpload/>
  </React.StrictMode>,
  document.getElementById('root')
);
