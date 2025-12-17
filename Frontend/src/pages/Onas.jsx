import probki from './media/onasprobki.jpg'
import kardiologialogo from './media/kardiologialogo.png'
import neurologialogo from './media/neurologialogo.png'
import urologialogo from './media/urologialogo.png'
import './CSS/Onas.css'


export default function Onas(){
    return(
        <div>
            <h1> </h1>

            <div id="nasza-misja">

                <div id="nm-lewo">

                    <img src={probki} alt="Zdjęcie z badania próbek"/>

                </div>

                <div id="nm-prawo">

                    <h1>Nasza misja</h1>
                    <hr></hr><br></br>
                    

                    <p>
                        Naszą misją jest zapewnienie dostępu do badań laboratoryjnych najwyższej<br></br>
                        jakości przy maksymalnie krótkim czasie oczekiwania na wyniki.<br></br>
                        Łącząc doświadczenie naszego zespołu i nowoczesne technologie,<br></br> wyznaczamy nowe standardy w obsłudze
                        Pacjentów i klientów instytucjonalnych.
                    </p>

                </div>

            </div>

            <div id="uslugi">

                <br></br>

                <h1>Czym się zajmujemy</h1>

                <div id="elementy">

                    <div class="uslugi-element">

                        <img src={kardiologialogo} alt="Kardiologia Logo"/>

                        <h2>Kardiologia</h2>

                        <h3>
                            Dbamy o zdrowie Twojego serca, pomagając wykryć problemy na wczesnym etapie i dobrać najlepsze leczenie,
                            abyś mógł czuć się bezpiecznie każdego dnia.
                        </h3>

                    </div>

                    <div class="uslugi-element">

                        <img src={neurologialogo} alt="Neurologia Logo"/>

                        <h2>Neurologia</h2>

                        <h3>Pomagamy zrozumieć i leczyć dolegliwości związane z układem nerwowym,
                            aby poprawić komfort Twojego życia i codziennego funkcjonowania.
                        </h3>

                    </div>

                    <div class="uslugi-element">

                        <img src={urologialogo} alt="Urologia Logo"/>

                        <h2>Urologia</h2>

                        <h3>Oferujemy dyskretną i profesjonalną pomoc w problemach układu moczowego,
                            stawiając na komfort, zaufanie i skuteczne leczenie.
                        </h3>

                    </div>

                </div>

            </div>

        </div>
    )
}