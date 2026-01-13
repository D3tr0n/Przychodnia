import './CSS/Login.css'
import lekarze from './media/loginlekarze.jpg'
import { useState } from 'react'

export default function Rejestracja() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [pesel, setPesel] = useState('')

  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}


    if (!firstName) newErrors.firstName = "Pole imię jest wymagane."
    if (!lastName) newErrors.lastName = "Pole nazwisko jest wymagane."
    if (!phoneNumber) newErrors.phoneNumber = "Pole nr.telefonu jest wymagane."
    if (!pesel) newErrors.pesel = "Pole PESEL jest wymagane."
    if (pesel && pesel.length !== 11) newErrors.pesel = "PESEL musi mieć dokładnie 11 znaków."



    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(username)) {
      newErrors.username = "Nieprawidłowy format e-mail."
    }

    if (password !== confirmPassword) {
      newErrors.password = "Hasła nie są takie same."
    }

    if (password.length < 6) {
      newErrors.passwordLength = "Hasło musi mieć co najmniej 6 znaków."
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validate()) return;

      try {
    const res = await fetch("http://localhost:5246/api/account/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,  
        email: username,
        password,
        firstName,
        lastName,
        pesel,
        phoneNumber
      })
    });

    if (!res.ok) {
      const errData = await res.json();
      alert("Błąd: " + (errData.message || JSON.stringify(errData)));
      return;
    }

    const data = await res.json();
    alert("Konto utworzone! Token: " + data.token);


    localStorage.setItem("token", data.token);

  } catch (err) {
    console.error(err);
    alert("Błąd połączenia z API!");
  }
};

  return (
    <div>
      <div id="panellogowanie">
        <div id="lewo">
          <img src={lekarze} alt="Zdjęcie lekarzy" />
        </div>

        <div id="prawo">
          <h2>Rejestracja</h2>
          <br />

          <div id="formularz">
            <h4>E-mail </h4> 
            <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
            {errors.username && <p id="error">{errors.username}</p>}

            <br />

            <h4>Hasło</h4> 
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
            <br />
            <h4>Potwierdź hasło</h4> 
            <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>

            {errors.password && <p id="error">{errors.password}</p>}

            {errors.passwordLength && <p id="error">{errors.passwordLength}</p>}

            <br />

            <h4>Imię</h4> 
            <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)}/><br />
            {errors.firstName && <p id="error">{errors.firstName}</p>}
            
            <h4>Nazwisko</h4> 
            <input type="text" value={lastName} onChange={e => setLastName(e.target.value)}/><br />
            {errors.lastName && <p id="error">{errors.lastName}</p>}

            <h4>Nr.telefonu</h4> 
            <input type="number" value={phoneNumber} maxLength={6} onChange={e => setPhoneNumber(e.target.value)}/><br />
            {errors.phoneNumber && <p id="error">{errors.phoneNumber}</p>}

            <h4>Pesel</h4> 
            <input type="password" maxLength={11} value={pesel} onChange={e => setPesel(e.target.value)}/><br />
            {errors.pesel && <p id="error">{errors.pesel}</p>}

            <button type="submit" onClick={handleRegister}>Zarejestruj</button>
          </div>
        </div>
      </div>
    </div>
  )
}
