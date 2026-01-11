import './CSS/Login.css'
import lekarze from './media/loginlekarze.jpg'
import { useState } from 'react'


export default function Rejestracja() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5021/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    alert(data.message);
  };

  return (
    <div>
      
      <div id="panellogowanie">

        <div id="lewo">

          <img src={lekarze} alt="Zdjęcie lekarzy" />

        </div>

        <div id="prawo">

          <h2>Rejestracja</h2>

          <br></br>

          <div id="formularz">

            <h4>Login </h4> <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>

            <br></br>

            <h4>Hasło</h4> <input type="password" value={password} onChange={e => setPassword(e.target.value)}/><br></br>

            <button type="submit" onClick={handleRegister}>Zarejestruj</button>

          </div>

        </div>

      </div>
      
    </div>
  )
}
