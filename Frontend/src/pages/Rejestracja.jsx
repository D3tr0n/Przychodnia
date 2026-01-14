import './CSS/rejestracja.css'
import lekarze from './media/loginlekarze.jpg'
import { useState } from 'react'
import { Link } from 'react-router-dom';

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
  <div className="registration-container">
    <div id="panellogowanie">

      <div id="srodek">
        <h2>Rejestracja</h2>
        <form id="formularz" onSubmit={handleRegister}>
          
          <div className="input-group">
            <h4>E-mail</h4>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="example@mail.com"/>
            {errors.username && <p className="error-text">{errors.username}</p>}
          </div>

          <div className="input-row">
            <div className="input-group">
              <h4>Hasło</h4>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
            </div>
            <div className="input-group">
              <h4>Potwierdź hasło</h4>
              <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
            </div>
          </div>
          {errors.password && <p className="error-text">{errors.password}</p>}
          {errors.passwordLength && <p className="error-text">{errors.passwordLength}</p>}

          <div className="input-row">
            <div className="input-group">
              <h4>Imię</h4>
              <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)}/>
              {errors.firstName && <p className="error-text">{errors.firstName}</p>}
            </div>
            <div className="input-group">
              <h4>Nazwisko</h4>
              <input type="text" value={lastName} onChange={e => setLastName(e.target.value)}/>
              {errors.lastName && <p className="error-text">{errors.lastName}</p>}
            </div>
          </div>

          <div className="input-group">
            <h4>Nr telefonu</h4>
            <input type="number" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}/>
            {errors.phoneNumber && <p className="error-text">{errors.phoneNumber}</p>}
          </div>

          <div className="input-group">
            <h4>PESEL</h4>
            <input type="password" maxLength={11} value={pesel} onChange={e => setPesel(e.target.value)}/>
            {errors.pesel && <p className="error-text">{errors.pesel}</p>}
          </div>

          <button type="submit">Zarejestruj</button>

          <div className="lekarz-link">
            <span>Jesteś lekarzem? </span>
            <Link to="/rejestracjalekarza">Stwórz konto lekarza</Link>
          </div>
        </form>
      </div>
    </div>
  </div>
);
}
