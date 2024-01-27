import Home from './components/Home';
import Puzzles from './components/Puzzles';
import Settings from './components/Settings';
import NavBar from './components/NavBar';
import {Route, Routes} from "react-router-dom";

function App() {
  return (
    <div className='background'>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/puzzles" element={<Puzzles />}/>
        <Route path="/settings" element={<Settings />}/>
      </Routes>
    </div>
  );
}

export default App;
