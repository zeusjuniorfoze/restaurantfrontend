import {useNavigate, Navigate,BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
// pages
import Accueil from './pages/user/Accueil';
import Reservations from './pages/user/Reservations';
import Menus from './pages/user/Menus';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';

import MenusAdmin from './components/admin/Menus';
import ReservationAdmin from './components/admin/ReservationAdmin';
import DashboardAdmin from './components/admin/DashboardAdmin';
import PrivateRoute from './reducers/PrivateRoute'; 

function App() {
  const isAdminRoute = useSelector((state) => state.auth.isAdminRoute);

  return (
    <div className="App">
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<Accueil />} />
          <Route path='/menus' element={<Menus />} />
          <Route path='/reservations' element={<Reservations />} />
          <Route path='/login' element={<Login />} />
          {/* Route protégée pour le tableau de bord */}
          <Route path='/dashboard' element={<DashboardAdmin />}/>
          <Route path="/dashboardmenus" element={<MenusAdmin />} />
          <Route path="/dashboardreservation" element={<ReservationAdmin />} /> 
    
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
