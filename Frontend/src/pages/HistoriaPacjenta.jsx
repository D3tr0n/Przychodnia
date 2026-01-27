import React, { useState } from "react";
import "./CSS/DiagnozaZalecenia.css";

const API_URL = "http://localhost:5246";

export default function HistoriaPacjenta() {
    const [pesel, setPesel] = useState("");
    const [kartoteka, setKartoteka] = useState([]);
    const [loading, setLoading] = useState(false);
    const [infoMessage, setInfoMessage] = useState("");

    const szukaj = async () => {
        if (!pesel) return;

        setLoading(true);
        setInfoMessage("");
        setKartoteka([]);

        const token = localStorage.getItem("token");

        try {
            const res = await fetch(
                `${API_URL}/api/Historia/by-pesel?pesel=${pesel}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            if (res.status === 404) {
                setInfoMessage("Nie znaleziono żadnych wpisów dla tego pacjenta (404).");
                setLoading(false);
                return;
            }

            if (!res.ok) {
                throw new Error("Błąd serwera: " + res.status);
            }

            const data = await res.json();
            
            if (data.length === 0) {
                setInfoMessage("Baza jest pusta dla tego numeru PESEL.");
            } else {
                setKartoteka(data);
            }
        } catch (e) {
            console.error("Szczegóły błędu:", e);
            setInfoMessage("Wystąpił błąd podczas pobierania danych.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="diagnoza-container">
            <h2 className="diagnoza-title">Historia pacjenta</h2>

            <div className="search-section">
                <input
                    type="text"
                    placeholder="Wpisz PESEL"
                    maxLength={11}
                    value={pesel}
                    onChange={e => setPesel(e.target.value.replace(/\D/g, ""))}
                />
                <button onClick={szukaj} disabled={loading}>
                    {loading ? "Szukanie..." : "Szukaj"}
                </button>
            </div>

            {loading && <p>Ładowanie...</p>}
            {infoMessage && <p style={{ color: "orange" }}>{infoMessage}</p>}

            {kartoteka.length > 0 && (
                <table className="diagnoza-table">
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Temat</th>
                            <th>Opis</th>
                        </tr>
                    </thead>
                    <tbody>
                        {kartoteka.map((w, i) => (
                            <tr key={i}>
                                <td>{w.createdAt ? new Date(w.createdAt).toLocaleDateString("pl-PL") : "---"}</td>
                                <td><strong>{w.temat}</strong></td>
                                <td>{w.opis}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}