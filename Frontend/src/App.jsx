import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import logo from './assets/prohealth.png' 

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

     <div id='gora'>


      <div id='logo'>
        <img src={logo} alt="Logo Przychodni" />
      </div>

      <div id='zakladki'>
        <a href="#">Strona Główna </a>
        <a href="#">O Nas </a>
        <a href="#">Usługi </a>
        <a href="#">Kontakt</a>
      </div>
    </div>


































    
    </>
  )
}

export default App
