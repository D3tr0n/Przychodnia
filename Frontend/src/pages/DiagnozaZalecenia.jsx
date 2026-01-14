import React, { useEffect, useState } from "react";

export default function DiagnozaZalecenia() {
    const [kartoteka, setKartoteka] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        
        fetch("http://localhost:5246/api/kartoteka/moje-badania", {
            headers: { "Authorization": `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => setKartoteka(data))
        .catch(err => console.error("Błąd:", err));
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h2>Moja Historia Medyczna</h2>
            <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th>Data</th>
                        <th>Temat</th>
                        <th>Opis</th>
                    </tr>
                </thead>
                <tbody>
                    {kartoteka.map((wpis, index) => (
                        <tr key={index}>
                            <td>{wpis.createdAt ? new Date(wpis.createdAt).toLocaleDateString() : "Brak daty"}</td>
                            <td>{wpis.temat}</td>
                            <td>{wpis.opis}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}