import './CSS/Login.css'
import lekarze from './media/loginlekarze.jpg'
import { useState } from 'react'


export default function Login() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Wpisz login i hasło")
      return
    }

    try {
      const res = await fetch('http://localhost:5021/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username, password})
      })

      if (res.ok) {
        const data = await res.json()
        localStorage.setItem('token', data.token) // zapis tokena
        alert('Zalogowano!')
      } else {
        alert('Błędny login lub hasło')
      }
    } catch (error) {
      console.error(error)
      alert('Błąd połączenia z serwerem')
    }
  }

  return (
    <div>
      
      <div id="panellogowanie">

        <div id="lewo">

          <img src={lekarze} alt="Zdjęcie lekarzy" />

        </div>

        <div id="prawo">

          <h2>Logowanie</h2>

          <br></br>

          <div id="formularz">

            <h4>Login </h4> <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>

            <br></br>

            <h4>Hasło</h4> <input type="password" value={password} onChange={e => setPassword(e.target.value)}/><br></br>

            <button type="submit" onClick={handleLogin}>Zaloguj</button>

          </div>

        </div>

      </div>
      
    </div>
  )
}
