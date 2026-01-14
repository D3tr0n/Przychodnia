import './CSS/Kartoteka.css'
import React, { useState } from "react";

const API_URL = "http://localhost:5246"; 

export default function Kartoteka() {
    const [temat, setTemat] = useState("");
    const [opis, setOpis] = useState("");
    const [imie, setImie] = useState("");
    const [nazwisko, setNazwisko] = useState("");
    const [email, setEmail] = useState("");
    const [telefon, setTelefon] = useState("");
    const [pesel, setPesel] = useState(() => sessionStorage.getItem("pesel") || "");

    const getAuthHeaders = () => {
        const token = localStorage.getItem("token");
        return {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };
    };

    const zapisz = () => {
        if (!pesel || !temat) {
            alert("PESEL i Temat są wymagane!");
            return;
        }

        const newEntry = { temat, opis, pesel };

        fetch(`${API_URL}/api/kartoteka`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(newEntry)
        })
        .then(res => {
            if (res.status === 401) throw new Error("Brak autoryzacji (zaloguj się ponownie)");
            if (!res.ok) throw new Error("Błąd przy dodawaniu rekordu do bazy");
            return res.json();
        })
        .then(data => {
            alert("Rekord zapisany pomyślnie w bazie!");
            setTemat("");
            setOpis("");
        })
        .catch(err => {
            console.error(err);
            alert("Błąd: " + err.message);
        });
    };

    const szukajUzytkownika = () => {
        if (!pesel) {
            alert("Wpisz PESEL!");
            return;
        }

        fetch(`${API_URL}/api/patient/by-pesel?pesel=${pesel}`, {
            headers: getAuthHeaders()
        })
        .then(res => {
            if (res.status === 401) throw new Error("Brak autoryzacji");
            if (!res.ok) throw new Error("Nie znaleziono pacjenta o tym numerze PESEL");
            return res.json();
        })
        .then(data => {
            setImie(data.firstName || "");
            setNazwisko(data.lastName || "");
            setTelefon(data.phoneNumber || "");
            alert("Znaleziono pacjenta!");
        })
        .catch(err => {
            console.error(err);
            alert(err.message);
            setImie("");
            setNazwisko("");
            setTelefon("");
        });
    };

    const wyczyscWszystko = () => {
        setTemat("");
        setOpis("");
        setImie("");
        setNazwisko("");
        setTelefon("");
        setEmail("");
    };

    return (
        <div id='panel'>
            <div id='lewoDane'>
                <h2>Pesel:</h2>
                <input 
                    type="text" 
                    value={pesel} 
                    maxLength={11} 
                    onChange={(e) => setPesel(e.target.value)} 
                /> 
                <button type="button" onClick={szukajUzytkownika} id='peselznajdz'>
                    Wyszukaj
                </button>

                <h2>Imię:</h2>
                <input type="text" value={imie} disabled />

                <h2>Nazwisko:</h2>
                <input type="text" value={nazwisko} disabled />

                <h2>Telefon:</h2>
                <input type="text" value={telefon} disabled />
            </div>

            <div id='kartoteka-form'>
                <div id='kartoteka'>
                    <h3>Temat: 
                        <input 
                            type="text" 
                            value={temat} 
                            onChange={(e) => setTemat(e.target.value)} 
                        />
                    </h3>
                    <h4>Opis:</h4>
                    <textarea 
                        value={opis} 
                        id='opis'
                        onChange={(e) => setOpis(e.target.value)} 
                    />
                </div>

                <div id='przyciski'>
                    <button type="button" onClick={zapisz} id='zapisz'>Zapisz</button>
                    <button type="button" id='wyczysc' onClick={wyczyscWszystko}>Wyczyść</button>
                </div>
            </div>
        </div>
    );
}