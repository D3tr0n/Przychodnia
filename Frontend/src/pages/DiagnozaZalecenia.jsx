import React, { useEffect, useState } from "react";
import "./CSS/DiagnozaZalecenia.css";

export default function DiagnozaZalecenia() {
    const [kartoteka, setKartoteka] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        fetch("http://localhost:5246/api/kartoteka/moje-badania", {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error("Błąd autoryzacji");
                return res.json();
            })
            .then((data) => {
                console.log("Dane do tabeli:", data);
                setKartoteka(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Błąd:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="diagnoza-loading">Ładowanie danych...</div>;
    }

    return (
        <div className="diagnoza-container">
            <h2 className="diagnoza-title">Moja Historia Medyczna</h2>

            {kartoteka.length === 0 ? (
                <p className="diagnoza-empty">
                    Brak wpisów w historii medycznej.
                </p>
            ) : (
                <table className="diagnoza-table">
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Temat</th>
                            <th>Opis / Zalecenia</th>
                        </tr>
                    </thead>
                    <tbody>
                        {kartoteka.map((wpis, index) => (
                            <tr key={wpis.id || index}>
                                <td className="diagnoza-date">
                                    {wpis.createdAt
                                        ? new Date(wpis.createdAt).toLocaleDateString("pl-PL")
                                        : "---"}
                                </td>
                                <td className="diagnoza-topic">
                                    {wpis.temat}
                                </td>
                                <td className="diagnoza-description">
                                    {wpis.opis}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
