import React, { useContext } from 'react';
import { AuthContext } from './AuthContext.jsx';
import Home from './Home';
import Puzzles from './Puzzles';
import Settings from './Settings';
import Modal from './Modal';
import {Route, Routes, Link, useNavigate, useLocation} from "react-router-dom";
import {useState, useEffect} from 'react';
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal.jsx';
import { IoNotificationsOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { IoLogOutOutline } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import { VscGithub } from "react-icons/vsc";
import NavModal from "./NavModal.jsx";
import useMediaQuery from "./MediaQuery.js";
import NotificationModal from "./NotificationModal.jsx";
import Logo from '../assets/Logo.svg';

function MainSpace({ currentPuzzleName }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, refreshUser } = useContext(AuthContext);
  const [puzzles, setPuzzles] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [ modal, setModal] = useState(false);
  const state = location.state;
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    if (!isMobile) {
      setMenuOpen(false);
    }
  }, [isMobile])

  function handleLogin() {
      if (user) {
        logout().then(() => navigate('/'));
      } else {
        navigate('/login', { state: { background: location } });
      }
  }

  useEffect(() => {
    if (location.pathname === '/Puzzles') {
      setIsExiting(false);
      setPuzzles(true);
    } else if (puzzles) {
      setIsExiting(true);
      const timer = setTimeout(() => {
        setPuzzles(false);
        setIsExiting(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  const handleNotifications = () => {
    navigate('/notifications', { state: { background: location} });
  }

  function sendEmail() {
    window.location = "mailto:luke.doms2@gmail.com";
  }

  return (
    <div className='mainspace'>
        <div className='topbar'>
            {navOpen && (
              <NavModal onClose={() => setNavOpen(false)}/>
            )}
            {isMobile ? (
              <svg
                width="59.648"
                height="35.880"
                viewBox="0 -1225.1 3295.4 1982.4"
                style={{ width: '40px', height: 'auto', marginLeft: '10px' }}
                aria-hidden="true"
                fill="red"
              >
                <defs>
                  <path
                    id="MJX-7-TEX-N-22CA"
                    d="M146 472Q146 479 152 485T166 492Q171 492 189 475T279 386L386 279L495 386Q598 492 608 492Q615 492 628 479V21Q615 8 608 8Q599 8 495 115L386 221L279 115Q204 40 188 24T166 8Q159 8 153 14T146 28Q146 37 253 144L359 250L253 357Q146 464 146 472ZM588 77V424L499 337L415 250L588 77Z"
                  />
                  <path
                    id="MJX-7-TEX-I-1D711"
                    d="M92 210Q92 176 106 149T142 108T185 85T220 72L235 70L237 71L250 112Q268 170 283 211T322 299T370 375T429 423T502 442Q547 442 582 410T618 302Q618 224 575 152T457 35T299 -10Q273 -10 273 -12L266 -48Q260 -83 252 -125T241 -179Q236 -203 215 -212Q204 -218 190 -218Q159 -215 159 -185Q159 -175 214 -2L209 0Q204 2 195 5T173 14T147 28T120 46T94 71T71 103T56 142T50 190Q50 238 76 311T149 431H162Q183 431 183 423Q183 417 175 409Q134 361 114 300T92 210ZM574 278Q574 320 550 344T486 369Q437 369 394 329T323 218Q309 184 295 109L286 64Q304 62 306 62Q423 62 498 131T574 278Z"
                  />
                </defs>
                <g className='logo' stroke="none" fill="red" strokeWidth="0" transform="scale(1,-1)">
                  <g>
                    <g transform="scale(2.49)">
                      <g>
                        <g>
                          <g>
                            <use href="#MJX-7-TEX-N-22CA" />
                          </g>
                          <g transform="translate(811,-150) scale(0.707)">
                            <g>
                              <use href="#MJX-7-TEX-I-1D711" />
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            ) : (
              <span onClick={()=>navigate('/')}>semiphi</span>
            )}
            <div className='topbar-left'>
              <div className='topbar-icons'>
                <div className='notification-icon' onClick={() => handleNotifications()}>
                  <IoNotificationsOutline />
                </div>
                <div className='login-icon' onClick={() => {handleLogin()}}>
                  {user ?
                  <IoLogOutOutline />:
                  <VscAccount />}
                </div>
              </div>
              {isMobile && (
                <div>
                  <button className='modal-hamburger' onClick={() => setNavOpen(true)}>
                    ☰
                  </button>
                </div>
              )}
            </div>
        </div>
        <Routes location={state?.background || location}>
          <Route path="/" element={<Home />}/>
          <Route path="/settings" element={<Settings />}/>
          <Route path="/Puzzles" element={<Puzzles currentPuzzleName={currentPuzzleName}/>} />
        </Routes>

        
        {/*state?.background && (
          <Routes>
            <Route path="/login" element={<LoginModal onLoginSuccess={refreshUser} />} />
            <Route path="/register" element={<RegisterModal onRegisterSuccess={refreshUser}/>} />
            <Route path="/notifications" element={<NotificationModal />} />
          </Routes>
        )*/}
        {state?.background && (
          <Routes>
            <Route path="/login" element={
              <LoginModal
                onLoginSuccess={refreshUser}
                onClose={() => navigate(state.background)}
                onSwitchToRegister={() => navigate('/register', { state: { background: state.background } })}
              />}
            />
            <Route path="/register" element={
              <RegisterModal
                onRegisterSuccess={refreshUser}
                onClose={() => navigate(state.background)}
                onSwitchToLogin={() => navigate('/login', { state: { background: state.background } })}
              />}
            />
            <Route path="/notifications" element={
              <NotificationModal onClose={() => navigate(state.background)} />}
            />
          </Routes>
        )}

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
