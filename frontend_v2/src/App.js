import NavBar from './components/NavBar';
import MainSpace from './components/MainSpace';
import PuzzleNav from './components/PuzzleNav';
import {Route, Routes, useLocation} from "react-router-dom";
import {useState, useEffect} from 'react';

function App() {
  const puzzleConfigs = {
    "2x2x2": {
      name: "2x2x2", 
      dimensions: { x: 2, y: 2, z: 2 },
      camera: null, 
      view: null,
      position: null, 
      saveCamera: null, 
      saveView: null,
      savePosition: null
    },
    "2x4x4": {
      name: "2x4x4", 
      dimensions: { x: 2, y: 4, z: 4 },
      camera: null, 
      view: null,
      position: null,
      saveCamera: null, 
      saveView: null,
      savePosition: null
    },
    "3x3x3": {
      name: "3x3x3", 
      dimensions: { x: 3, y: 3, z: 3 },
      camera: null, 
      view: null,
      position: null,
      saveCamera: null, 
      saveView: null,
      savePosition: null
    },
    "4x4x4": {
      name: "4x4x4", 
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
      localStorage.setItem("currentPuzzle", "3x3x3");
      return "3x3x3";
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
      <MainSpace currentPuzzleName={currentPuzzleName}/>
      {/*<Routes>
        <Route path="/puzzles" element={<PuzzleNav />}/>
      </Routes>*/}
      {puzzleNav ? <PuzzleNav setCurrentPuzzleName={setCurrentPuzzleName}/> : null }
    </div>
  );
}

export default App;
