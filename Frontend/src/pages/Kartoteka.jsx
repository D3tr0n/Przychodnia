import './CSS/Kartoteka.css'
import React, { useState } from "react";

export default function Kartoteka() {
    const [temat, setTemat] = useState("");
    const [imie, setImie] = useState("");
    const [nazwisko, setNazwisko] = useState("");
    const [email, setEmail] = useState("");
    const [opis, setOpis] = useState("");

    const zapisz = () => {
    const newEntry = { temat, imie, nazwisko, email, opis };

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
        setImie("");
        setNazwisko("");
        setEmail("");
        setOpis("");
    })
    .catch(err => console.error(err));
};

return (
    <div id='kartoteka-form'>
    <div id='kartoteka'>
    
            <h3>Temat: <input type="text" id='temat' value={temat} onChange={(e) => setTemat(e.target.value)} />
            Imię pacjenta: <input type="text" id='imie' value={imie} onChange={(e) => setImie(e.target.value)} />
            Nazwisko pacjenta: <input type="text" id='nazwisko' value={nazwisko} onChange={(e) => setNazwisko(e.target.value)} />
            E-mail pacjenta: <input type="text" id='email' value={email} onChange={(e) => setEmail(e.target.value)} /></h3>
        <h4>Opis:</h4>
        <textarea id='opis' value={opis} onChange={(e) => setOpis(e.target.value)} />
        </div>

        <div id='przyciski'>
        <button type="button" onClick={zapisz} id='zapisz'>Zapisz</button>
        <button type="reset" id='wyczysc' onClick={() => { setTemat(""); setImie(""); setNazwisko(""); setEmail(""); setOpis(""); }}>Wyczyść</button>
        </div>
    </div>
)
}
