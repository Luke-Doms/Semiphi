import NavBar from './components/NavBar';
import MainSpace from './components/MainSpace';
import PuzzleNav from './components/PuzzleNav';
import {Route, Routes, useLocation} from "react-router-dom";
import {useState, useEffect} from 'react';

function App() {
  const location = useLocation();
  const [puzzleNav, setPuzzleNav] = useState(false);
  useEffect(() => {
    if (location.pathname == '/Puzzles') {
    setPuzzleNav(true);
    } else {
      if (document.getElementById('puzzleNav')) {
        document.getElementById('puzzleNav').style.width=0;
        setTimeout(() => {setPuzzleNav(false)}, 500);
      }
    }
  }, [location.pathname]);
  
  return (
    <div className='background'>
      <NavBar />
      <MainSpace />
      {/*<Routes>
        <Route path="/puzzles" element={<PuzzleNav />}/>
      </Routes>*/}
      {puzzleNav ? <PuzzleNav /> : null }
    </div>
  );
}

export default App;
