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
import kpo from './media/kpo.png'

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

    <div id="lekarz">

        <img src={lekarz1} alt="Jan Kowalski" />
        <p>dr Jan Kowalski</p>
    </div>

    <div id="lekarz">

        <img src={lekarz2} alt="Anna Nowak" />
        <p>dr Anna Nowak</p>
    </div>

    <div id="lekarz">

        <img src={lekarz3} alt="Piotr Wiśniewski" />
        <p>dr Piotr Wiśniewski</p>
    </div>

    <div id="lekarz">

        <img src={lekarz4} alt="Katarzyna Mazur" />
        <p>dr Katarzyna Mazur</p>
    </div>

    <div id="lekarz">

        <img src={lekarz5} alt="Tomasz Zieliński" />
        <p>dr Tomasz Zieliński</p>
    </div>
</div>




    <div id='scianatekstu'>

    <h1>ProHealth - Twoja zaufana przychodnia w Rzeszowie</h1>

    <p>
    ProHealth to nowoczesna przychodnia medyczna w Rzeszowie, oferująca
    kompleksową opiekę zdrowotną dla dzieci i dorosłych. Zapewniamy szeroki
    zakres usług medycznych, nowoczesne zaplecze diagnostyczne oraz
    doświadczony zespół lekarzy i specjalistów. Naszą misją jest troska
    o zdrowie Pacjentów oraz zapewnienie szybkiej, rzetelnej i komfortowej
    opieki w przyjaznej atmosferze.
    </p>

    <h2>Szeroka oferta usług medycznych</h2>

    <p>
    W przychodni ProHealth oferujemy kompleksowe świadczenia zdrowotne,
    obejmujące zarówno profilaktykę, diagnostykę, jak i leczenie.
    W naszej ofercie znajdują się m.in.:
    </p>

    <ul>
        <li>konsultacje lekarza rodzinnego i lekarzy specjalistów</li>
        <li>badania diagnostyczne i laboratoryjne</li>
        <li>badania krwi - morfologia, lipidogram, badania tarczycy, poziom glukozy</li>
        <li>badania moczu i kału</li>
        <li>konsultacje profilaktyczne i kontrolne</li>
    </ul>

    <p>
        Dzięki szerokiej ofercie usług Pacjenci mogą liczyć na kompleksową
        opiekę medyczną w jednym miejscu. Każdy Pacjent traktowany jest
        indywidualnie, z pełnym zaangażowaniem i dbałością o komfort wizyty.
    </p>

    <h2>Badania i diagnostyka - profesjonalizm i wygoda</h2>

    <p>
        Badania diagnostyczne stanowią kluczowy element skutecznej opieki
        zdrowotnej. W ProHealth zapewniamy szybki dostęp do badań oraz sprawną
        obsługę na każdym etapie wizyty. Korzystamy z nowoczesnego sprzętu
        diagnostycznego, a wyniki badań dostępne są w krótkim czasie.
        Wszystkie procedury wykonywane są w komfortowych i bezpiecznych warunkach.
    </p>

    <h2>Przychodnia ProHealth w Rzeszowie</h2>

    <p>
        ProHealth to nowoczesna przychodnia w Rzeszowie, zaprojektowana
        z myślą o komforcie Pacjentów. Dogodna lokalizacja oraz elastyczne
        godziny przyjęć pozwalają łatwo dopasować wizytę do codziennych obowiązków.
    </p>

    <h2>Dlaczego warto wybrać ProHealth?</h2>

    <ul>
        <li>kompleksowa opieka medyczna w jednym miejscu</li>
        <li>nowoczesne zaplecze diagnostyczne</li>
        <li>szybkie terminy wizyt i badań</li>
        <li>komfortowe warunki leczenia i diagnostyki</li>
        <li>indywidualne podejście do każdego Pacjenta</li>
    </ul>
    <p>
        Stawiamy na jakość, rzetelność i bezpieczeństwo. Wybierając ProHealth,
        wybierasz profesjonalną opiekę medyczną, zaufanie i komfort na każdym
        etapie leczenia.
    </p>




    </div>

    <div id='kpo'>
        <img src={kpo} alt="KPO" />
    </div>


</div>
)
}
