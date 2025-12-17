import baner from './media/baner.jpg'
import React from 'react'
import './CSS/Glowna.css'

export default function Glowna() {
return (
<div>
    <div id ="baner">
    <img src={baner} alt="baner" />
    </div>

    <div id='bloki'>
        <p>Regularne badania kontrolne ratują życie 🩺</p>
        <p>Seniorzy 80+ są szczególnie narażeni na zawał ❤️</p>
        <p>Dbaj o swoje zdrowie - umawiaj wizyty online! 💻</p>
        <p>Szczepienia chronią przed groźnymi chorobami 💉</p>
        <p>Mierz ciśnienie – nadciśnienie często nie daje objawów 📊</p>

    </div>
    

    <div id='blok2'>
        <p><strong>Witamy w ProHealth</strong></p>
        <p>
        Nowoczesnej przychodni, gdzie oferujemy zarówno podstawowe, jak i specjalistyczne konsultacje oraz badania dla Pacjentów indywidualnych, 
        podmiotów medycznych i klientów instytucjonalnych.</p> <p>
        ProHealth to nowa jakość opieki zdrowotnej - profesjonalna obsługa i indywidualne podejście do każdego Pacjenta.
        </p>
    </div>










</div>
)
}
