import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RegisterPage from './components/main_components/RegisterPage.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/main_components/HomePage.jsx';
import LoginPage from './components/main_components/LoginPage.jsx';
import ProblemPage from './components/main_components/ProblemPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/problems" element={<ProblemPage />} />
    </Routes>
  </BrowserRouter>
  </StrictMode>,
)