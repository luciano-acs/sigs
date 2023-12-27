import React, { useState } from 'react';
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

function App() {

  const [user, setUser] = useState('');
  const [modalLogin, setModalLogin] = useState(false);

  const showOnModalLogin = () => {
    setModalLogin(true);
  }

  const showOffModalLogin = () => {
    setModalLogin(false);
  }

  return (
    <div>
      <Nav showOnModalLogin={showOnModalLogin} user={user}/>
      <Menu />
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/informe" element={<Informe />} />
        <Route path="/seguimiento" element={<Seguimiento />} />
        <Route path="/personal" element={<Personal />} />
      </Routes>
      <Footer />
      {modalLogin && <ModalLogin showOffModalLogin={showOffModalLogin} setUser={setUser}/>}
    </div>
  )
}

export default App
