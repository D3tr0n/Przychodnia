import './CSS/Login.css'
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
      const userRole = decoded.role;

      if (userRole === "Patient") {
        navigate('/PanelUzytkownika');
      } else if (userRole === "Doctor") {
        navigate('/PanelLekarza');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      alert('Błąd połączenia z API!');
    }
  };

  return (
    <div className="login-wrapper">
      <div id="panellogowanie">
        <form id="formularz" onSubmit={handleLogin}>
          <div className="input-group">
            <h4>Login</h4>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <h4>Hasło</h4>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Zaloguj</button>
          
          <div className="lekarz-link">
            Nie masz konta? <a href="/Rejestracja">Zarejestruj się</a>
          </div>
        </form>
      </div>
    </div>
  )
}