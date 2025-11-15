import React from 'react';
import Home from './Home';
import Puzzles from './Puzzles';
import Settings from './Settings';
import Modal from './Modal';
import {Route, Routes, Link, useNavigate, useLocation} from "react-router-dom";
import {useState, useEffect} from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { IoNotificationsOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { IoLogOutOutline } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import { VscGithub } from "react-icons/vsc";
import NotificationModal from "./NotificationModal.jsx";

function MainSpace({ currentPuzzleName }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [puzzles, setPuzzles] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [user, setUser] = useState(null);
  const [ notificationModal, setNotificationModal] = useState(false);

  const refreshUser = () => {
    fetch('/get-user', {
      credentials: "include",
      method: "GET",
    }).then((res) => {
      if (!res.ok) return null;
      return res.json();
    }).then((json) => {
      if (!json || !json.username) {
        setUser(null);
        return;
      }
      if (json.theme) {
        document.documentElement.style.setProperty('--highlight-color', json.theme.highlight);
        document.documentElement.style.setProperty('--primary-color', json.theme.primary);
        document.documentElement.style.setProperty('--secondary-color', json.theme.secondary);
        document.documentElement.style.setProperty('--text-color', json.theme.text);
      }
      setUser(json.username);
    })
    .catch((err) => {
      console.warn("get-user request failed:", err.message);
      setUser(null);
    });
  };

  useEffect(() => {
    refreshUser();
  }, []);

  useEffect(() => {
    if (location.pathname === '/Puzzles') {
      setIsExiting(false);
      setPuzzles(true);
    } else if (puzzles) {
      setIsExiting(true);
      const timer = setTimeout(() => {
        setPuzzles(false);
        setIsExiting(false);
      }, 300); // match your CSS animation duration

      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  const handleClick = () => {
    if (user) {
      setUser(null);
      fetch('/logout', {
        method: "GET", 
        credentials: "same-origin"
      }).then(() => {
        navigate('/');
      });
    } else {
      navigate('/login');
    }
  }

  function sendEmail() {
    window.location = "mailto:luke.doms2@gmail.com";
  }

  return (
    <div className='mainspace'>
        <div className='topbar'>
            <span>semiphi</span>
            <div className='topbar-icons'>
              <div className='notification-icon'>
                <IoNotificationsOutline onClick={() => setNotificationModal(true)} />
                {notificationModal ? <NotificationModal setModal={setNotificationModal}/> : null}
              </div>
              <div className='login-icon' onClick={() => {handleClick()}}>
                {user ?
                <IoLogOutOutline />:
                <VscAccount />}
              </div>
            </div>
        </div>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/settings" element={<Settings />}/>
          <Route path="/login" element={<LoginForm onLoginSuccess={refreshUser} />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/Puzzles" element={<Puzzles currentPuzzleName={currentPuzzleName}/>} />
        </Routes>
        <div className='bottombar'>
          <div className='bottom-icons-container'>
            <div className='bottom-icons' onClick={() => {sendEmail()}}>
              <span>Contact Us</span>
              <IoMailOutline />
            </div>
            <div className='bottom-icons' onClick={() => (window.open('https://github.com/Luke-Doms/Semiphi'))}>
              <span>Github</span>
              <VscGithub />
            </div>
          </div>
        </div>
    </div>
  )
}

export default MainSpace
