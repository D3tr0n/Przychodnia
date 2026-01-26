import probki from './media/onasprobki.jpg'
import kardiologialogo from './media/kardiologialogo.png'
import neurologialogo from './media/neurologialogo.png'
import urologialogo from './media/urologialogo.png'
import morfologialogo from './media/morfologialogo.png'
import radiologialogo from './media/radiologialogo.png'
import pulmonologialogo from './media/pulmonologialogo.png'
import doktorlogo from './media/doktorlogo.png'
import diagnozalogo from './media/diagnozalogo.png'
import leczenielogo from './media/leczenielogo.png'
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

                        <img src={morfologialogo} alt="Morfologia Logo"/>

                        <h2>Morfologia</h2>

                        <h3>
                            Wykonujemy podstawowe badania krwi,
                            które pomagają szybko ocenić stan Twojego zdrowia
                            i wcześnie wykryć ewentualne nieprawidłowości.
                        </h3>

                    </div>

                    <div class="uslugi-element">

                        <img src={radiologialogo} alt="Radiologia Logo"/>

                        <h2>Radiologia</h2>

                        <h3>
                            Zapewniamy nowoczesną diagnostykę obrazową,
                            dzięki której lekarz może postawić trafną diagnozę i zaplanować skuteczne leczenie.
                        </h3>

                    </div>

                    <div class="uslugi-element">

                        <img src={pulmonologialogo} alt="Pulmonologia Logo"/>

                        <h2>Pulmonologia</h2>

                        <h3>
                            Pomagamy zadbać o zdrowe oddychanie, diagnozując i lecząc choroby płuc oraz dróg oddechowych,
                            abyś mógł swobodnie oddychać i czuć się lepiej każdego dnia.
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

            <div id="statystyki">

                <div class="s-element">

                    <h2>35+</h2>
                    <h4>Międzynarodowych nagród</h4>

                </div>


                <div class="s-element">

                    <h2>125+</h2>
                    <h4>Wyspecjalizowanych doktorów</h4>

                </div>

                <div class="s-element">

                    <h2>5k+</h2>
                    <h4>Zadowolonych pacjentów</h4>

                </div>

                <div class="s-element">

                    <h2>8k+</h2>
                    <h4>Udanych operacji</h4>

                </div>

            </div>

            <div id="dzialanie">

                <h1>Sprawdź jak działamy</h1>

                <div id="dzielementy">

                    <div class="dzelement">

                    <img src={doktorlogo} alt="Doktor Logo" />

                    <h2>Rozmowa z pacjentem</h2>

                    <h3>Zaczynamy od uważnego wysłuchania Twoich potrzeb i obaw,
                        aby lepiej zrozumieć problem i zapewnić Ci poczucie bezpieczeństwa.
                    </h3 >

                </div>

                <div class="dzelement">

                    <img src={diagnozalogo} alt="Diagnoza Logo" />

                    <h2>Diagnoza</h2>

                    <h3>Na podstawie rozmowy i badań dokładnie określamy przyczynę dolegliwości,
                        aby zaproponować najlepsze rozwiązanie.
                    </h3 >

                </div>

                <div class="dzelement">

                    <img src={leczenielogo} alt="Leczenie Logo" />

                    <h2>Leczenie</h2>

                    <h3>Dobieramy indywidualny plan leczenia, 
                    skupiając się na skuteczności, komforcie i szybkim powrocie do zdrowia.</h3 >

                </div>

                </div>

            </div>

        </div>
    )
}