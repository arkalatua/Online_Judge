import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RegisterPage from './components/main_components/RegisterPage.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/main_components/HomePage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  </BrowserRouter>
  </StrictMode>,
)