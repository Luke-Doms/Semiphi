import NavBar from './components/NavBar';
import MainSpace from './components/MainSpace';
import PuzzleNav from './components/PuzzleNav';
import {Route, Routes} from "react-router-dom";

function App() {
  return (
    <div className='background'>
      <NavBar />
      <MainSpace />
      <Routes>
        <Route path="/puzzles" element={<PuzzleNav />}/>
      </Routes>
    </div>
  );
}

export default App;
