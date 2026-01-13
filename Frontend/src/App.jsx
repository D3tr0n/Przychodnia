import { useState } from 'react'
import logo from './assets/prohealth.png'
import './App.css'
import { Routes, Route, Link, useLocation } from 'react-router-dom'

import Glowna from './pages/Glowna'
import Onas from './pages/Onas'
import Kontakt from './pages/Kontakt'
import Wizyta from './pages/Wizyta'
import Login from './pages/Login'
import PanelUzytkownika from './pages/PanelUzytkownika'
import Rezerwacja from './pages/Rezerwacja'
import PanelLekarza from './pages/PanelLekarza'
import DiagnozaZalecenia from './pages/DiagnozaZalecenia'
import Kartoteka from './pages/Kartoteka'


function App() {
    const location = useLocation()
    const isPanel = location.pathname.startsWith('/PanelUzytkownika') || location.pathname.startsWith('/Rezerwacja') || location.pathname.startsWith('/DiagnozaZalecenia')


  return (
    <>

      <div id="gora">


        <div id="logo">
          <img src={logo} alt="logo" id='logo'/>
          </div>



        <div id="zakladki">
          {isPanel ? (
            <>

              <Link to="/PanelUzytkownika">Moje Dane</Link>
              <Link to="/Rezerwacja">Rezerwacja</Link>
              <Link to="/DiagnozaZalecenia">Diagnoza i Zalecenia</Link>
            
              

            </>
          ) : (
            <>

              <Link to="/glowna">Strona Główna</Link>
              <Link to="/onas">O nas</Link>
              <Link to="/kontakt">Kontakt</Link>
              <Link to="/wizyta">Wizyta</Link>
              <Link to="/PanelUzytkownika">Panel Użytkownika</Link>
              <Link to="/PanelLekarza">Panel Lekarza</Link>
              <Link to="/Kartoteka">Kartoteka</Link>


            </>
          )}
        </div>

        <div id="login">

          {isPanel ? <Link to="/glowna">Wyloguj się</Link> : 
          <Link to="/login">Zaloguj się</Link>}


        </div>
      </div>




























      <Routes>
        <Route path="/glowna" element={<Glowna />} />
        <Route path="/onas" element={<Onas />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="/wizyta" element={<Wizyta />} />
        <Route path="/login" element={<Login />} />
        <Route path="/PanelUzytkownika" element={<PanelUzytkownika />} />
        <Route path="/Rezerwacja" element={<Rezerwacja />} />
        <Route path="/PanelLekarza" element={<PanelLekarza />} />
        <Route path="/DiagnozaZalecenia" element={<DiagnozaZalecenia />} />
        <Route path="/Kartoteka" element={<Kartoteka />} />
      </Routes>

    <footer>
        <p>© 2026 ProHealth. Wszystkie prawa zastrzeżone.</p>
      </footer>




    </>
  )
}

export default App
