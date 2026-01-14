import './CSS/PanelLekarza.css'
import { useState, useEffect } from 'react'

export default function PanelLekarza() {
    const [doctorData, setDoctorData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDoctorData = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch("http://localhost:5246/api/account/doctor-profile", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (res.ok) {
                    const data = await res.json();
                    setDoctorData(data);
                } else {
                    console.error("Błąd pobierania danych");
                }
            } catch (err) {
                console.error("Błąd połączenia:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctorData();
    }, []);

    if (loading) return <div className="loading">Ładowanie danych...</div>;
    if (!doctorData) return <div className="error">Nie udało się załadować profilu.</div>;

    return (
    <div id="panel-container">
        <div id="dane-grid">
            <div className="kafelek">
                <h2>Imię</h2>
                <h3>{doctorData.firstName}</h3>
            </div>

            <div className="kafelek">
                <h2>Nazwisko</h2>
                <h3>{doctorData.lastName}</h3>
            </div>

            <div className="kafelek">
                <h2>E-mail (Login)</h2>
                <h3>{doctorData.email}</h3>
            </div>

            <div className="kafelek">
                <h2>Specjalizacja</h2>
                <h3>{doctorData.specialization}</h3>
            </div>
        </div>
        
        <div className="button-area">
            <button className="logout-btn" onClick={() => { localStorage.removeItem('token'); window.location.href='/'; }}>
                Wyloguj się
            </button>
        </div>
    </div>
)
}