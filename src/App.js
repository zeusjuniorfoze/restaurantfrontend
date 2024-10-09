//import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import { useSelector } from 'react-redux';
//pages
import Accueil from './pages/user/Accueil'
import Reservations from './pages/user/Reservations';
import Menus from './pages/user/Menus';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';

function App() {

  const isAdminRoute = useSelector((state) => state.auth.isAdminRoute);

  return (
    <div className="App">
      <BrowserRouter basename='/'>
        
        <Routes>
          <Route path='/' element={<Accueil/>}/>
          <Route path='/menus' element={<Menus />}/>
          <Route path='/reservations' element={<Reservations />}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>

      </BrowserRouter>
        
    </div>
  );
}

export default App;
