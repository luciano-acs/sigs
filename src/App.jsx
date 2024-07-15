import React, { useEffect, useState } from 'react';
import Footer from './components/Footer.jsx';
import Menu from './components/Menu.jsx';
import Nav from './components/Nav.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Informe from './pages/Informe.jsx';
import Personal from './pages/Personal.jsx';
import Seguimiento from './pages/Seguimiento.jsx';
import Principal from './pages/Principal.jsx';
import ModalLogin from './components/ModalLogin.jsx';
import { Route, Routes } from 'react-router-dom';
import AltaPersonal from './pages/AltaPersonal.jsx';
import ModificacionPersonal from './pages/ModificacionPersonal.jsx';
import ModalRegister from './components/ModalRegister.jsx';
import { MenuProvider } from './context/MenuContext.jsx';

function App() {

  const [modalLogin, setModalLogin] = useState(false);
  const [modalRegister, setModalRegister] = useState(false);

  const showOnModalLogin = () => {
    setModalLogin(true);
  }

  const showOnModalRegister = () => {
    setModalRegister(true);
  }

  const showOffModalLogin = () => {
    setModalLogin(false);
  }

  const showOffModalRegister = () => {
    setModalRegister(false);
  }

  return (
    <div>
      <MenuProvider>
        <Nav showOnModalLogin={showOnModalLogin} showOnModalRegister={showOnModalRegister}/>
        <Menu />
        <Routes>
          <Route path="/vigicontrol/" element={<Principal />} />
          <Route path="/vigicontrol/dashboard" element={<Dashboard />} />
          <Route path="/vigicontrol/informe" element={<Informe />} />
          <Route path="/vigicontrol/seguimiento" element={<Seguimiento />} />
          <Route path="/vigicontrol/personal" element={<Personal />} />
          <Route path="/vigicontrol/personal/:altas" element={<AltaPersonal />} />
          <Route path="/vigicontrol/update" element={<ModificacionPersonal />} />
        </Routes>
        <Footer />
        {modalLogin && <ModalLogin showOffModalLogin={showOffModalLogin} />}
        {modalRegister && <ModalRegister showOffModalRegister={showOffModalRegister} />}
      </MenuProvider>
    </div>
  )
}

export default App
