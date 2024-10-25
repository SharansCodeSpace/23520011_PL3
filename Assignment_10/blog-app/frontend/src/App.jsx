import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import AllBlogs from './components/AllBlogs';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/dashboard" element={<HomePage />} />
          <Route path="/" element={<AllBlogs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
