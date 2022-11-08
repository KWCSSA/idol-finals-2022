import './App.css';
import "antd/dist/antd.css";

import React from 'react';
import Vote from './Vote';
import Admin from './Admin';
import Display from './Display';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/display" element={<Display />} />
          <Route path="/vote" element={<Vote />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
