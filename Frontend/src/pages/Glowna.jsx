import baner from './media/baner.jpg'
import React from 'react'
import './CSS/Glowna.css'
import wnetrze from './media/wnetrze.jpg'
import ekg from './media/ekg.jpeg'
import lekarz1 from './media/lekarz1.jpg'
import lekarz2 from './media/lekarz2.jpg'
import lekarz3 from './media/lekarz3.jpg'
import lekarz4 from './media/lekarz4.png'
import lekarz5 from './media/lekarz5.png'


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

    <div id='zdjecie1'>
        <div id='zlewo'><img src={wnetrze} alt="wnetrze" /></div>
        <div id='zprawo'>Nasza przychodnia oferuje nowoczesne i komfortowe warunki dla Pacjentów, zapewniając przyjazną atmosferę oraz dostęp do najnowszych technologii medycznych.</div>

    </div>


    <div id='zdjecie2'>
        <div id='zlewo2'>W 2025r. nasza przychodnia wyposarzyła się w najwocześniejszy aparat EKG. Dzięki, któremu jesteśmy w stanie przeprowadzić szybkie i precyzyjne badania serca.</div>
        <div id='zprawo2'><img src={ekg} alt="ekg" /></div>
    </div>

    <h1>Nasi lekarze</h1>
    <div id="lekarze">

    <div className="lekarz">

        <img src={lekarz1} alt="Jan Kowalski" />
        <p>dr Jan Kowalski</p>
    </div>

    <div className="lekarz">

        <img src={lekarz2} alt="Anna Nowak" />
        <p>dr Anna Nowak</p>
    </div>

    <div className="lekarz">

        <img src={lekarz3} alt="Piotr Wiśniewski" />
        <p>dr Piotr Wiśniewski</p>
    </div>

    <div className="lekarz">

        <img src={lekarz4} alt="Katarzyna Mazur" />
        <p>dr Katarzyna Mazur</p>
    </div>

    <div className="lekarz">

        <img src={lekarz5} alt="Tomasz Zieliński" />
        <p>dr Tomasz Zieliński</p>
    </div>
</div>

    <div>

    </div>



</div>
)
}
