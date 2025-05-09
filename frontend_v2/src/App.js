import NavBar from './components/NavBar';
import MainSpace from './components/MainSpace';
import PuzzleNav from './components/PuzzleNav';
import {Route, Routes, useLocation} from "react-router-dom";
import {useState, useEffect} from 'react';

function App() {
  const puzzleConfigs = {
    "2×2×2": {
      name: "2×2×2", 
      dimensions: { x: 2, y: 2, z: 2 },
      camera: null, 
      view: null,
      position: null, 
      saveCamera: null, 
      saveView: null,
      savePosition: null
    },
    "2×4×4": {
      name: "2×4×4", 
      dimensions: { x: 2, y: 4, z: 4 },
      camera: null, 
      view: null,
      position: null,
      saveCamera: null, 
      saveView: null,
      savePosition: null
    },
    "3×3×3": {
      name: "3×3×3", 
      dimensions: { x: 3, y: 3, z: 3 },
      camera: null, 
      view: null,
      position: null,
      saveCamera: null, 
      saveView: null,
      savePosition: null
    },
    "4×4×4": {
      name: "4×4×4", 
      dimensions: { x: 4, y: 4, z: 4 },
      camera: null, 
      view: null, 
      position: null,
      saveCamera: null, 
      saveView: null,
      savePosition: null
    }
  }

  if (!localStorage.getItem("puzzles")) {
    localStorage.setItem("puzzles", JSON.stringify(puzzleConfigs));
  }

  const [currentPuzzleName, setCurrentPuzzleName] = useState(() => {
    if (!localStorage.getItem("currentPuzzle")) {
      localStorage.setItem("currentPuzzle", "3×3×3");
      return "3×3×3";
    } else {
      return localStorage.getItem("currentPuzzle");
    }
  });

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
      <div className='page-content'>
        <MainSpace currentPuzzleName={currentPuzzleName}/>
        {/*<Routes>
          <Route path="/puzzles" element={<PuzzleNav />}/>
        </Routes>*/}
        {puzzleNav ? <PuzzleNav setCurrentPuzzleName={setCurrentPuzzleName}/> : null }
      </div>
    </div>
  );
}

export default App;
