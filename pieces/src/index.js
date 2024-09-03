import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Public from './pages/public';
import "./styles/public.css";
import Private from './pages/private';
import "./styles/private.css";


ReactDOM.render(
  <React.StrictMode>
        <Public />
  </React.StrictMode>,
  document.getElementById('root')
);
