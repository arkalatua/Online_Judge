import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RegisterPage from './components/main_components/RegisterPage.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/main_components/HomePage.jsx';
import LoginPage from './components/main_components/LoginPage.jsx';
import ProblemPage from './components/main_components/CreateProblem.jsx';
import { store } from './store/store.js';
import { Provider } from 'react-redux';
import ProblemsPage from './components/main_components/ProblemsPage.jsx';
import NewProblemAdded from './components/main_components/NewProblemAdded.jsx';
import UserProblems from './components/main_components/UserProblems.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>

          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/createProblem" element={<ProblemPage />} />
          <Route path="/problems" element={<ProblemsPage />} />
          <Route path="/newProblemAdded" element={<NewProblemAdded />} />
          <Route path="/allProblems" element={<ProblemsPage />} />
          <Route path="/userProblems" element={<UserProblems />} />

        </Routes>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)