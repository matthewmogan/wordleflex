import './App.css';
import { Route, Routes, Link, NavLink, useLocation } from 'react-router-dom';
import Gameboard from '../Gameboard/Gameboard'
import Instructions from '../Instructions/Instructions'

function App() {
  return (
    <>
    <nav>
      <ul>
        <li>
          <NavLink 
            to="/game"
          >WordleFlex
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/instructions"
x          >Instructions
          </NavLink>
        </li>
      </ul>
    </nav>
    <Routes>
      <Route path ="/game" element={<Gameboard/>}/>
      <Route path ="/instructions" element ={<Instructions/>}/>
    </Routes>
    </>
  );
}

export default App;
