import './CSS/Login.css'
import lekarze from './media/loginlekarze.jpg'

export default function Login() {
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

            <h4>Login </h4> <input type="text"/>

            <br></br>

            <h4>Hasło</h4> <input type="password"/><br></br>

            <button type="submit">Zaloguj</button>

          </div>

        </div>

      </div>
      
    </div>
  )
}
