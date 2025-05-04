import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Import } from './Import';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route index element={<App/>}/>
      <Route path="import" element={<Import/>}/> 
    </Routes>
  </BrowserRouter>
);
