import './CSS/Login.css'
import lekarze from './media/loginlekarze.jpg'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5246/api/account/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) {
        alert('Niepoprawny login lub hasło!');
        return;
      }

      const data = await res.json();
const token = data.token;
localStorage.setItem('token', token);

    const decoded = jwtDecode(token);

    // DEBUG - Sprawdzamy dokładnie co siedzi w środku
    console.log("1. Cały obiekt z tokena:", decoded);
    console.log("2. Wartość pola role:", decoded.role);
    console.log("3. Typ pola role:", typeof decoded.role);

    // Uproszczona logika bez dodatkowych zmiennych
    const userRole = decoded.role;

    if (userRole === "Patient") {
        console.log("Sukces! Wykryto Patient. Nawiguję...");
        navigate('/PanelUzytkownika');
    } else if (userRole === "Doctor") {
        console.log("Sukces! Wykryto Doctor. Nawiguję...");
        navigate('/PanelLekarza');
    } else {
        console.error("BŁĄD: Rola w tokenie to '" + userRole + "', ale nie pasuje do żadnego IF-a.");
        navigate('/');
    }

    } catch (error) {
      console.error(error);
      alert('Błąd połączenia z API!');
    }
  };

  return (
    <div>
      <div id="panellogowanie">
        <div id="lewo">
          <img src={lekarze} alt="Zdjęcie lekarzy" />
        </div>

        <div id="prawo">
          <h2>Logowanie</h2>
          <br />

          <div id="formularz">
            <h4>Login </h4>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <br />

            <h4>Hasło</h4>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <br />

            <button type="submit" onClick={handleLogin}>Zaloguj</button>
          </div>
        </div>
      </div>
    </div>
  )
}
