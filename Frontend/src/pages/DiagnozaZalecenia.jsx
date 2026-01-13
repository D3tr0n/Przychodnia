import './CSS/DiagnozaZalecenia.css'
import React, { useEffect, useState } from "react";

export default function DiagnozaZalecenia() {
    const [kartoteka, setKartoteka] = useState([]);


    useEffect(() => {
    fetch("/api/kartoteka").then(res => res.json()).then(data => setKartoteka(data)).catch(err => console.error(err));},    
    []);



return (
    <div>

    <table>
        <tr>
            <th>Data</th>
            <th>Temat</th>
            <th>Opis</th>
        </tr>
        {kartoteka.map((kartoteka, index) => (
        <tr key={index}>
            <td>{kartoteka.data}</td>
            <td>{kartoteka.temat}</td>
            <td>{kartoteka.opis}</td>  
        </tr>
        ))}


    </table>







    </div>
)
}
