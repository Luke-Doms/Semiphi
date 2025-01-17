import React from 'react';
import Home from './Home';
import Puzzles from './Puzzles';
import Settings from './Settings';
import Modal from './Modal';
import {Route, Routes, Link, useNavigate, useLocation} from "react-router-dom";
import {useState, useEffect} from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

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
      return res.json();
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
              <svg style={{'cursor': 'pointer'}} xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M427.68 351.43C402 320 383.87 304 383.87 217.35 383.87 138 343.35 109.73 310 96c-4.43-1.82-8.6-6-9.95-10.55C294.2 65.54 277.8 48 256 48s-38.21 17.55-44 37.47c-1.35 4.6-5.52 8.71-9.95 10.53-33.39 13.75-73.87 41.92-73.87 121.35C128.13 304 110 320 84.32 351.43 73.68 364.45 83 384 101.61 384h308.88c18.51 0 27.77-19.61 17.19-32.57zM320 384v16a64 64 0 01-128 0v-16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>
            </div>
            <div className='login-icon' onClick={() => {handleClick()}}>
              {user ?
              <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M304 336v40a40 40 0 01-40 40H104a40 40 0 01-40-40V136a40 40 0 0140-40h152c22.09 0 48 17.91 48 40v40M368 336l80-80-80-80M176 256h256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg> :
              <svg style={{'cursor': 'pointer'}} xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/></svg>}
            </div>
        </div>
        {puzzles ? <Puzzles puzzleDimensions={props.puzzleDimensions}/> : 
              <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/settings" element={<Settings />}/>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
            </Routes>
        }
        <div className='bottombar'>
            <div className='bottom-icons' onClick={() => {sendEmail()}}>
              <span>Contact Us</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><rect x="48" y="96" width="416" height="320" rx="40" ry="40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M112 160l144 112 144-112"/></svg>
            </div>
            <div className='bottom-icons' onClick={() => (window.open('https://github.com/Luke-Doms/Semiphi'))}>
              <span>Github</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M256 32C132.3 32 32 134.9 32 261.7c0 101.5 64.2 187.5 153.2 217.9a17.56 17.56 0 003.8.4c8.3 0 11.5-6.1 11.5-11.4 0-5.5-.2-19.9-.3-39.1a102.4 102.4 0 01-22.6 2.7c-43.1 0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1 1.4-14.1h.1c22.5 2 34.3 23.8 34.3 23.8 11.2 19.6 26.2 25.1 39.6 25.1a63 63 0 0025.6-6c2-14.8 7.8-24.9 14.2-30.7-49.7-5.8-102-25.5-102-113.5 0-25.1 8.7-45.6 23-61.6-2.3-5.8-10-29.2 2.2-60.8a18.64 18.64 0 015-.5c8.1 0 26.4 3.1 56.6 24.1a208.21 208.21 0 01112.2 0c30.2-21 48.5-24.1 56.6-24.1a18.64 18.64 0 015 .5c12.2 31.6 4.5 55 2.2 60.8 14.3 16.1 23 36.6 23 61.6 0 88.2-52.4 107.6-102.3 113.3 8 7.1 15.2 21.1 15.2 42.5 0 30.7-.3 55.5-.3 63 0 5.4 3.1 11.5 11.4 11.5a19.35 19.35 0 004-.4C415.9 449.2 480 363.1 480 261.7 480 134.9 379.7 32 256 32z"/></svg>
            </div>
        </div>
    </div>
  )
}

export default MainSpace
