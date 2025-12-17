import { useState } from 'react'
import logo from './assets/prohealth.png'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'

import Onas from './pages/Onas'
import Kontakt from './pages/Kontakt'
import Wizyta from './pages/Wizyta'
import Login from './pages/Login'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <div id="gora">


        <div id="logo">
          <img src={logo} alt="logo" id='logo'/>
          </div>



        <div id="zakladki">
          <Link to="/onas">O nas</Link>
          <Link to="/kontakt">Kontakt</Link>
          <Link to="/wizyta">Wizyta</Link>
        </div>

  
      



      <div id="login">
    <Link to="/login">Zaloguj się</Link>
      </div>
    </div>

      <Routes>
        <Route path="/onas" element={<Onas />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="/wizyta" element={<Wizyta />} />
        <Route path="/login" element={<Login />} />
      </Routes>

    </>
  )
}

export default App
