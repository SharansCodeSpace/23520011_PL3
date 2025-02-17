import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import './App.css'

function App() {
  return (
    <>
      <UserAuthContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          </Routes>
        </Router>
      </UserAuthContextProvider>
    </>
  )
}

export default App
