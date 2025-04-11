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

function MainSpace(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [puzzles, setPuzzles] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    fetch('/get-user', {
      credentials: "include",
      method: "GET",
    }).then((res) => {
      console.log('hello');
      if (res) {
        return res.json();
      }
    }).then((json) => {
      console.log(json);
      if (json.theme) {
        document.documentElement.style.setProperty('--highlight-color', json.theme.highlight);
        document.documentElement.style.setProperty('--primary-color', json.theme.primary);
        document.documentElement.style.setProperty('--secondary-color', json.theme.secondary);
        document.documentElement.style.setProperty('--text-color', json.theme.text);
      }
      setUser(json);
    })
    .catch((err) => {
      console.warn("get-user request failed:", err.message);
    });
  }, []);

  useEffect(() => {
    if (location.pathname == '/Puzzles') {
      setPuzzles(true);
    } else {
      setTimeout(() => {setPuzzles(false)}, 300);
    }
  }, [location.pathname])

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
            <div className='notification-icon'>
              <IoNotificationsOutline />
            </div>
            <div className='login-icon' onClick={() => {handleClick()}}>
              {user ?
              <IoLogOutOutline />:
              <VscAccount />}
            </div>
        </div>
        {puzzles ? <Puzzles currentPuzzleName={props.currentPuzzleName}/> : 
              <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/settings" element={<Settings />}/>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/Puzzles" element={null} />
            </Routes>
        }
        <div className='bottombar'>
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
  )
}

export default MainSpace
