import { React, useContext } from 'react';
import LoginModal from './LoginPrompt.jsx';
import {Route, Routes, Link, useNavigate, useLocation} from "react-router-dom";
import { AuthContext } from './AuthContext.jsx';

const LoginPrompt = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const { user, logout, refreshUser } = useContext(AuthContext);

  const handleClick = () => {
    navigate('/login', { state: { background: location } });
  }

  return (
    <div className=''>
      <span onClick={handleClick} className='login-link'>Login</span>
      <span> to access acount settings</span>
      {state?.background && (
        <Routes>
          <Route path="/login" element={<LoginModal onLoginSuccess={refreshUser} />} />
        </Routes>
      )}
    </div>
  )
}

export default LoginPrompt
