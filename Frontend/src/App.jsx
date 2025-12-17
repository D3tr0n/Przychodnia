import { useState } from 'react'
import logo from './assets/prohealth.png'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <div id="gora">


        <div id="logo">
          <img src={logo} alt="logo" id='logo'/>
          </div>



      <div id='zakladki'>

      <a href="App.jsx">Strona Główna</a>
      <a href="pages/Onas.jsx">O nas</a>
      <a href="pages/">Kontakt</a>
      <a href="pages/">Wizyta</a>

      </div>

      <div id='login'>
        <a href="pages/login.jsx">Zaloguj się</a>
      </div>

    </div>


    </>
  )
}

export default App
