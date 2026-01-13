import './CSS/Kartoteka.css'
import React, { useState } from "react";

export default function Kartoteka() {
    const [temat, setTemat] = useState("");
    const [opis, setOpis] = useState("");
    const [imie, setImie] = useState("");
    const [nazwisko, setNazwisko] = useState("");
    const [email, setEmail] = useState("");
    const [telefon, setTelefon] = useState("");



    const [pesel, setPesel] = useState(() => sessionStorage.getItem("pesel") || "");
    const zapisz = () => {
    const newEntry = { temat, opis, pesel, imie, nazwisko, email, telefon };
    

    fetch("/api/kartoteka", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEntry)
    })
    .then(res => {
        if (!res.ok) throw new Error("Błąd przy dodawaniu rekordu");
            return res.json();
    })
    .then(data => {
        alert("Rekord dodany!");
        setTemat("");
        setOpis("");
    })
    .catch(err => console.error(err));
};


    const szukajUzytkownika = () => {
    fetch(`/api/uzytkownik?pesel=${pesel}`)
        .then(res => {
            if (!res.ok) throw new Error("Nie znaleziono użytkownika");
            return res.json();
        })
        .then(data => {
            setImie(data.imie);
            setNazwisko(data.nazwisko);
            setEmail(data.email);
            setTelefon(data.telefon);
        })
        .catch(err => {
            console.error(err);
            setImie("");
            setNazwisko("");
            setEmail("");
            setTelefon("");
            alert("Nie znaleziono użytkownika");
        });
};




return (
<div id='panel'>
    <div id='lewoDane'>
        <h2>Pesel:</h2>
        <input type="text" id="pesel" value={pesel} maxLength={11} onChange={(e) => setPesel(e.target.value)}  /> <button type="submit" onClick={szukajUzytkownika} id='peselznajdz'>Wyszukaj</button>

        <h2>Imię:</h2>
        <input type="text" id="imie" value={imie} disabled />

        <h2>Nazwisko:</h2>
        <input type="text" id="nazwisko" value={nazwisko} disabled />

        <h2>E-mail:</h2>
        <input type="text" id="email" value={email} disabled />

        <h2>Telefon:</h2>
        <input type="text" id="telefon" value={telefon} disabled />
    </div>




    <div id='kartoteka-form'>

        <div id='kartoteka'>

            <h3>Temat: <input type="text" id='temat' value={temat} onChange={(e) => setTemat(e.target.value)} /></h3>
            <h4>Opis:</h4>
            <textarea id='opis' value={opis} onChange={(e) => setOpis(e.target.value)} />
            </div>

            <div id='przyciski'>
            <button type="button" onClick={zapisz} id='zapisz'>Zapisz</button>
            <button type="reset" id='wyczysc' onClick={() => { setTemat(""); setOpis(""); }}>Wyczyść</button>
        </div>
    </div>
</div>
)
}
