import { useState, useEffect } from 'react'
import logo from './assets/prohealth.png'
import './App.css'
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

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
import Rejestracja from './pages/Rejestracja'
import GodzinyPracy from './pages/GodzinyPracy'
import ListaWizyt from './pages/ListaWizyt'
import RejestracjaLekarza from './pages/RejestracjaLekarza'

function App() {
    const location = useLocation()
    const navigate = useNavigate()
    
    const [token, setToken] = useState(localStorage.getItem("token"))

    useEffect(() => {
        setToken(localStorage.getItem("token"))
    }, [location])

    let userRole = null;
    if (token) {
        try {
            const decoded = jwtDecode(token);
            userRole = decoded.role;
        } catch (error) {
            console.error("Błąd dekodowania tokena:", error);
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("token")
        setToken(null)
        navigate("/glowna")
    }

    const isPanel = location.pathname.startsWith('/PanelUzytkownika') || 
                    location.pathname.startsWith('/Rezerwacja') || 
                    location.pathname.startsWith('/DiagnozaZalecenia') ||
                    location.pathname.startsWith('/PanelLekarza') ||
                    location.pathname.startsWith('/ListaWizyt') ||
                    location.pathname.startsWith('/GodzinyPracy')

    return (
        <>
            <div id="gora">
                <div id="logo">
                    <img src={logo} alt="logo" id='logo'/>
                </div>

                <div id="zakladki">
                    {isPanel ? (
                        <>
                            {/* DYNAMICZNE LINKI W ZALEŻNOŚCI OD ROLI */}
                            {userRole === "Doctor" ? (
                                <>
                                    <Link to="/PanelLekarza">Moje Dane</Link>
                                    <Link to="/ListaWizyt">Lista Wizyt</Link>
                                    <Link to="/GodzinyPracy">Godziny Pracy</Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/PanelUzytkownika">Moje Dane</Link>
                                    <Link to="/Rezerwacja">Rezerwacja</Link>
                                    <Link to="/ListaWizyt">Moje Wizyty</Link>
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            <Link to="/glowna">Strona Główna</Link>
                            <Link to="/onas">O nas</Link>
                            <Link to="/kontakt">Kontakt</Link>
                        </>
                    )}
                </div>

                <div id="login">
                    {token ? (
                        <button 
                            onClick={handleLogout} 
                            style={{ 
                                background: 'none', 
                                border: 'none', 
                                color: 'inherit', 
                                cursor: 'pointer', 
                                font: 'inherit',
                                textDecoration: 'none' 
                            }}
                        >
                            Wyloguj się
                        </button>
                    ) : (
                        <>
                            <Link to="/login">Zaloguj się</Link>
                            <Link to="/Rejestracja">Rejestracja</Link>
                        </>
                    )}
                </div>
            </div>

            <Routes>
                <Route path="/" element={<Glowna />} />
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
                <Route path="/Rejestracja" element={<Rejestracja />} />
                <Route path="/GodzinyPracy" element={<GodzinyPracy />} />
                <Route path="/ListaWizyt" element={<ListaWizyt />} />
                <Route path="/rejestracjalekarza" element={<RejestracjaLekarza />} />
            </Routes>

            <footer>
                <p>© 2026 ProHealth. Wszystkie prawa zastrzeżone.</p>
            </footer>
        </>
    )
}

export default App